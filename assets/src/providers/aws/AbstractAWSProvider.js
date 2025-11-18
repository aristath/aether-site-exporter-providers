/**
 * Abstract AWS Provider Base Class
 *
 * Base class for all AWS S3-compatible storage providers (Cloudflare R2, AWS S3, DigitalOcean Spaces, etc.).
 * Provides common S3-compatible storage operations and functionality.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { StorageService } from '../services/storageService';

/**
 * Wait for SDK to be available
 * Returns a promise that resolves when AbstractProvider is available
 */
function waitForSDK() {
	return new Promise( ( resolve, reject ) => {
		// Check if SDK is already available
		if (
			window.AetherProviderSDK &&
			window.AetherProviderSDK.AbstractProvider
		) {
			resolve( window.AetherProviderSDK.AbstractProvider );
			return;
		}

		// Poll for SDK availability
		let attempts = 0;
		const maxAttempts = 50; // 5 seconds max wait (50 * 100ms)
		const interval = setInterval( () => {
			attempts++;
			if (
				window.AetherProviderSDK &&
				window.AetherProviderSDK.AbstractProvider
			) {
				clearInterval( interval );
				resolve( window.AetherProviderSDK.AbstractProvider );
			} else if ( attempts >= maxAttempts ) {
				clearInterval( interval );
				reject(
					new Error(
						'AetherProviderSDK.AbstractProvider is not available after waiting. ' +
						'Make sure the parent plugin (aether-site-exporter) is active and the SDK is loaded.'
					)
				);
			}
		}, 100 );
	} );
}

// Import from parent plugin's SDK (exposed as window.AetherProviderSDK)
// Access SDK lazily to avoid issues if SDK hasn't loaded yet
function getSDK() {
	if ( typeof window === 'undefined' || ! window.AetherProviderSDK ) {
		return null;
	}
	return window.AetherProviderSDK;
}

function getAbstractProvider() {
	const SDK = getSDK();
	if ( SDK && SDK.AbstractProvider && typeof SDK.AbstractProvider === 'function' ) {
		return SDK.AbstractProvider;
	}
	// Return a placeholder class - this prevents "superclass is not a constructor" error
	// The placeholder will throw if instantiated, but allows the class to be defined
	return class {
		constructor() {
			throw new Error(
				'AetherProviderSDK.AbstractProvider is not available. ' +
				'Make sure the parent plugin (aether-site-exporter) is active and the SDK has loaded.'
			);
		}
	};
}

function getConfigFieldBuilder() {
	const SDK = getSDK();
	return SDK?.ConfigFieldBuilder || null;
}

function getDeploymentTypes() {
	const SDK = getSDK();
	return SDK?.DEPLOYMENT_TYPES || {};
}

// Get these at module load time with fallbacks
const SDK = getSDK();
const ConfigFieldBuilder = getConfigFieldBuilder();
const DEPLOYMENT_TYPES = getDeploymentTypes();

/**
 * AbstractAWSProvider class
 *
 * Abstract base class for AWS S3-compatible storage providers.
 * Subclasses must implement provider-specific methods.
 */
export class AbstractAWSProvider extends getAbstractProvider() {
	/**
	 * Get supported deployment types.
	 *
	 * AWS S3-compatible providers support blueprint bundles and static sites.
	 *
	 * @return {Array<string>} Supported deployment types
	 */
	getSupportedDeploymentTypes() {
		const types = getDeploymentTypes();
		return [
			types.BLUEPRINT_BUNDLE,
			types.STATIC_SITE,
		];
	}

	/**
	 * Storage service instance.
	 *
	 * @type {StorageService|null}
	 */
	storageService = null;

	/**
	 * Get the provider type.
	 *
	 * @return {string} Provider type
	 */
	getType() {
		return 'cloud-storage';
	}

	/**
	 * Get provider-specific configuration fields.
	 *
	 * Defines common S3-compatible fields shared by all AWS providers.
	 * Subclasses should override and call super.getProviderSpecificConfigFields() to add provider-specific fields.
	 *
	 * Note: The deployment_types field is automatically added by AbstractProvider.getConfigFields()
	 *
	 * @return {Array<Object>} Array of field definitions
	 */
	getProviderSpecificConfigFields() {
		const builder = getConfigFieldBuilder();
		if ( ! builder ) {
			throw new Error(
				'ConfigFieldBuilder is not available. Make sure AetherProviderSDK is loaded.'
			);
		}
		return builder.buildAll( [
			builder.text( 'access_key_id' )
				.label( __( 'Access Key ID', 'aether' ) )
				.description(
					__( 'S3-compatible API access key ID', 'aether' )
				)
				.required()
				.min( 16 )
				.max( 128 ),

			builder.password( 'secret_access_key' )
				.label( __( 'Secret Access Key', 'aether' ) )
				.description(
					__(
						'S3-compatible API secret access key (encrypted)',
						'aether'
					)
				)
				.required()
				.sensitive()
				.min( 32 )
				.max( 128 ),

			builder.text( 'bucket_name' )
				.label( __( 'Bucket Name', 'aether' ) )
				.description( __( 'Bucket name for file storage', 'aether' ) )
				.required()
				.pattern(
					'^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$',
					__(
						'Bucket name must be 3-63 characters, lowercase, start/end with alphanumeric',
						'aether'
					)
				)
				.min( 3 )
				.max( 63 ),

			builder.text( 'region' )
				.label( __( 'Region (Optional)', 'aether' ) )
				.description(
					__( 'Storage region (e.g., us-east-1, auto)', 'aether' )
				),

			builder.url( 'endpoint' )
				.label( __( 'Endpoint URL (Optional)', 'aether' ) )
				.description(
					__(
						'Custom endpoint URL for S3-compatible storage',
						'aether'
					)
				),
		] );
	}

	/**
	 * Get storage service instance (lazy-loaded).
	 *
	 * Uses provider-specific endpoint and configuration.
	 *
	 * @protected
	 * @return {Promise<StorageService|null>} Storage service instance
	 */
	async getStorageService() {
		if ( this.storageService ) {
			return this.storageService;
		}

		const endpoint = await this.getStorageEndpoint();
		const config = await this.getStorageServiceConfig();

		if ( ! endpoint || ! config.bucket_name ) {
			return null;
		}

		this.storageService = new StorageService(
			endpoint,
			config.bucket_name,
			config
		);

		return this.storageService;
	}

	/**
	 * Get the storage endpoint URL.
	 *
	 * Must be implemented by subclasses to return provider-specific endpoint.
	 * Can be Worker endpoint (for browser-based access) or direct API endpoint.
	 *
	 * @abstract
	 * @return {Promise<string>} Storage endpoint URL
	 */
	async getStorageEndpoint() {
		throw new Error(
			'AbstractAWSProvider.getStorageEndpoint() must be implemented by subclass'
		);
	}

	/**
	 * Get storage service configuration.
	 *
	 * Must be implemented by subclasses to return provider-specific config.
	 *
	 * @abstract
	 * @return {Promise<Object>} Storage service configuration object
	 */
	async getStorageServiceConfig() {
		throw new Error(
			'AbstractAWSProvider.getStorageServiceConfig() must be implemented by subclass'
		);
	}

	/**
	 * Test connection to storage provider.
	 *
	 * Must be implemented by subclasses to test provider-specific connection.
	 *
	 * @abstract
	 * @return {Promise<Object>} Connection test result
	 */
	async testConnection() {
		throw new Error(
			'AbstractAWSProvider.testConnection() must be implemented by subclass'
		);
	}

	/**
	 * Get public URL for an object.
	 *
	 * Must be implemented by subclasses to construct provider-specific public URL.
	 *
	 * @abstract
	 * @param {string} key Object key/path.
	 * @return {string} Public URL
	 */
	getPublicUrl( key ) {
		// Abstract method - key parameter required for interface consistency
		// eslint-disable-next-line no-unused-vars
		void key;
		throw new Error(
			'AbstractAWSProvider.getPublicUrl() must be implemented by subclass'
		);
	}
}

// Export wait function for use by subclasses if needed
export { waitForSDK };

export default AbstractAWSProvider;
