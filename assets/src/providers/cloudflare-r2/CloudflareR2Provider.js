/**
 * Cloudflare R2 Provider
 *
 * JavaScript implementation of the Cloudflare R2 provider.
 * Provides object storage and edge worker deployment capabilities.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { AbstractAWSProvider } from '../aws/AbstractAWSProvider';
import { EdgeService } from '../services/edgeService';

// Import from parent plugin's SDK (exposed as window.AetherProviderSDK)
// Access SDK lazily to avoid issues if SDK hasn't loaded yet
function getSDK() {
	if ( typeof window === 'undefined' || ! window.AetherProviderSDK ) {
		return null;
	}
	return window.AetherProviderSDK;
}

function getConfigFieldBuilder() {
	const SDK = getSDK();
	return SDK?.ConfigFieldBuilder || null;
}

function getDeploymentTypes() {
	const SDK = getSDK();
	return SDK?.DEPLOYMENT_TYPES || {};
}

/**
 * CloudflareR2Provider class
 *
 * Provides Cloudflare R2 object storage with zero egress fees.
 * Extends AbstractAWSProvider to inherit S3-compatible storage functionality.
 */
export class CloudflareR2Provider extends AbstractAWSProvider {
	/**
	 * Provider ID constant.
	 *
	 * @type {string}
	 */
	static ID = 'cloudflare-r2';

	/**
	 * Get supported deployment types.
	 *
	 * Cloudflare R2 supports static sites and blueprint bundles through S3-compatible storage.
	 * Inherits from AbstractAWSProvider but can be overridden here if needed.
	 *
	 * @return {Array<string>} Supported deployment types
	 */
	getSupportedDeploymentTypes() {
		const types = getDeploymentTypes();
		return [
			types.STATIC_SITE,
			types.BLUEPRINT_BUNDLE,
		];
	}

	/**
	 * Whether this provider requires a worker to be deployed.
	 *
	 * @type {boolean}
	 */
	requiresWorker = true;

	/**
	 * Worker type for deployment.
	 *
	 * @type {string}
	 */
	workerType = 'r2';

	/**
	 * Edge service instance.
	 *
	 * @type {EdgeService|null}
	 */
	edgeService = null;

	/**
	 * Storage service instance.
	 *
	 * @type {Object|null}
	 */
	storageService = null;

	/**
	 * Get the unique provider identifier.
	 *
	 * @return {string} Provider ID
	 */
	getId() {
		return this.registeredId || CloudflareR2Provider.ID;
	}

	/**
	 * Get the human-readable provider name.
	 *
	 * @return {string} Provider name
	 */
	getName() {
		return __( 'Cloudflare R2', 'aether' );
	}

	/**
	 * Get the provider type.
	 *
	 * @return {string} Provider type
	 */
	getType() {
		return 'cloud-storage';
	}

	/**
	 * Get the provider description.
	 *
	 * @return {string} Provider description
	 */
	getDescription() {
		return __(
			'Cloudflare R2 object storage with zero egress fees. Includes edge worker deployment for WordPress Playground compatibility.',
			'aether'
		);
	}

	/**
	 * Get the provider icon.
	 *
	 * @return {string} Provider icon
	 */
	getIcon() {
		return '☁️';
	}

	/**
	 * Get provider-specific configuration fields.
	 *
	 * Includes common S3 fields from AbstractAWSProvider plus R2-specific fields.
	 *
	 * Note: The deployment_types field is automatically added by AbstractProvider.getConfigFields()
	 *
	 * @return {Array<Object>} Array of field definitions
	 */
	getProviderSpecificConfigFields() {
		// Get base S3 fields from AbstractAWSProvider (already built)
		const baseFields = super.getProviderSpecificConfigFields();

		// Add R2-specific fields
		const builder = getConfigFieldBuilder();
		if ( ! builder ) {
			throw new Error(
				'ConfigFieldBuilder is not available. Make sure AetherProviderSDK is loaded.'
			);
		}
		const r2Fields = builder.buildAll( [
			builder.text( 'cloudflare_account_id' )
				.label( __( 'Cloudflare Account ID', 'aether' ) )
				.description(
					__(
						'Your Cloudflare account ID (found in R2 dashboard)',
						'aether'
					)
				)
				.required()
				.pattern(
					'^[a-f0-9]{32}$',
					__(
						'Account ID must be a 32-character hexadecimal string',
						'aether'
					)
				)
				.sensitive(),

			builder.url( 'worker_endpoint' )
				.label( __( 'Worker Endpoint URL', 'aether' ) )
				.description(
					__(
						'Deployed Cloudflare Worker endpoint for upload proxy (auto-populated after deployment)',
						'aether'
					)
				),

			builder.url( 'custom_domain' )
				.label( __( 'Custom Domain (Optional)', 'aether' ) )
				.description(
					__(
						'Custom domain for R2 bucket access (e.g., https://cdn.example.com)',
						'aether'
					)
				),

			builder.checkbox( 'public_access' )
				.label( __( 'Enable Public Access', 'aether' ) )
				.description(
					__(
						'Allow public read access to bucket contents',
						'aether'
					)
				)
				.default( false ),
		] );

		// Combine base fields and R2-specific fields
		// Put cloudflare_account_id first, then base fields, then other R2 fields
		return [
			r2Fields[ 0 ], // cloudflare_account_id
			...baseFields, // access_key_id, secret_access_key, bucket_name, region, endpoint
			...r2Fields.slice( 1 ), // worker_endpoint, custom_domain, public_access
		];
	}

	/**
	 * Get provider status.
	 *
	 * @return {Promise<Object>} Status object
	 */
	async getStatus() {
		const status = await super.getStatus();

		// Add deployment status for edge capability
		const config = await this.getConfig();
		status.deployed = Boolean( config.worker_endpoint );

		return status;
	}

	/**
	 * Get edge service instance (lazy-loaded).
	 *
	 * @protected
	 * @return {Promise<EdgeService|null>} Edge service instance
	 */
	async getEdgeService() {
		if ( this.edgeService ) {
			return this.edgeService;
		}

		const config = await this.getConfig();

		if ( ! config.cloudflare_account_id || ! config.access_key_id ) {
			return null;
		}

		this.edgeService = new EdgeService(
			config.cloudflare_account_id,
			config.access_key_id, // API token
			config
		);

		return this.edgeService;
	}

	/**
	 * Get the storage endpoint URL.
	 *
	 * Returns the Worker endpoint for R2 (browser-based access).
	 *
	 * @return {Promise<string>} Storage endpoint URL
	 */
	async getStorageEndpoint() {
		const config = await this.getConfig();
		return config.worker_endpoint || '';
	}

	/**
	 * Get storage service configuration.
	 *
	 * Returns config with workerEndpoint, bucketName, and R2-specific settings.
	 *
	 * @return {Promise<Object>} Storage service configuration object
	 */
	async getStorageServiceConfig() {
		const config = await this.getConfig();
		return {
			worker_endpoint: config.worker_endpoint || '',
			bucket_name: config.bucket_name || '',
			custom_domain: config.custom_domain || '',
			public_access: config.public_access || false,
			...config,
		};
	}

	/**
	 * Test connection to R2 storage.
	 *
	 * Tests connection via Worker endpoint.
	 *
	 * @return {Promise<Object>} Connection test result
	 */
	async testConnection() {
		const storage = await this.getStorageService();
		if ( ! storage ) {
			return {
				success: false,
				error: __(
					'Storage service not available. Please configure worker_endpoint and bucket_name.',
					'aether'
				),
			};
		}

		return await storage.testConnection();
	}

	/**
	 * Get public URL for an object.
	 *
	 * Constructs R2 public URL using custom domain or default R2 domain.
	 *
	 * @param {string} key Object key/path.
	 * @return {string} Public URL
	 */
	getPublicUrl( key ) {
		const config = this.config;
		if ( config.custom_domain ) {
			return `${ config.custom_domain }/${ key }`;
		}

		// Default R2 public URL format (if publicAccess is enabled)
		// Note: This is a placeholder - actual URL construction may vary
		if ( config.public_url ) {
			return `${ config.public_url }/${ key }`;
		}

		// Fallback: use worker endpoint for serving files
		if ( config.worker_endpoint ) {
			return `${ config.worker_endpoint }/${ key }`;
		}

		return '';
	}
}

export default CloudflareR2Provider;
