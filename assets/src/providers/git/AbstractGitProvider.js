/**
 * Abstract Git Provider Base Class
 *
 * Base class for all Git-based providers (GitHub, GitLab, Bitbucket, etc.).
 * Provides common Git operations and functionality shared by all Git providers.
 *
 * @package
 */

import { __, sprintf } from '@wordpress/i18n';
import { getRestUrl } from '../../utils/getRestUrl';

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
 * AbstractGitProvider class
 *
 * Abstract base class for Git-based storage providers.
 * Subclasses must implement provider-specific methods.
 */
export class AbstractGitProvider extends getAbstractProvider() {
	/**
	 * Get supported deployment types.
	 *
	 * Git providers support blueprint bundles and static sites.
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
	 * Whether this provider is experimental.
	 *
	 * Git-based providers are currently experimental.
	 *
	 * @type {boolean}
	 */
	experimental = true;

	/**
	 * Get the human-readable provider name.
	 *
	 * Appends "(Experimental)" suffix if provider is experimental.
	 *
	 * @return {string} Provider name with experimental suffix if applicable
	 */
	getName() {
		const baseName = this.getBaseName();
		if ( this.experimental ) {
			return sprintf(
				/* translators: %s: Provider name */
				__( '%s (Experimental)', 'aether' ),
				baseName
			);
		}
		return baseName;
	}

	/**
	 * Get the base provider name without experimental suffix.
	 *
	 * Must be implemented by subclasses.
	 *
	 * @abstract
	 * @return {string} Base provider name
	 */
	getBaseName() {
		throw new Error(
			'AbstractGitProvider.getBaseName() must be implemented by subclass'
		);
	}

	/**
	 * Get the provider type.
	 *
	 * @return {string} Provider type
	 */
	getType() {
		return 'git-hosting';
	}

	/**
	 * Get provider-specific configuration fields.
	 *
	 * Defines common Git fields shared by all Git providers.
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
			builder.password( 'personal_access_token' )
				.label( __( 'Personal Access Token', 'aether' ) )
				.description(
					__(
						'Personal access token with repository write permissions',
						'aether'
					)
				)
				.required()
				.sensitive()
				.min( 20 )
				.max( 255 ),

			builder.text( 'branch' )
				.label( __( 'Branch', 'aether' ) )
				.description(
					__( 'Git branch name (default: main)', 'aether' )
				)
				.default( 'main' ),

			builder.url( 'git_worker_url' )
				.label( __( 'Git Worker URL (Optional)', 'aether' ) )
				.description(
					__(
						'CORS proxy worker for browser-based Git operations (for WordPress Playground)',
						'aether'
					)
				),
		] );
	}

	/**
	 * Normalize Git URL to ensure it ends with .git
	 *
	 * @param {string} url Git repository URL.
	 * @return {string} Normalized Git URL
	 */
	normalizeGitUrl( url ) {
		if ( ! url ) {
			return '';
		}
		return url.endsWith( '.git' ) ? url : url + '.git';
	}

	/**
	 * Get Git CORS proxy URL from settings.
	 *
	 * @return {Promise<string|null>} Proxy URL or null if not available
	 */
	async getGitProxyUrl() {
		const config = await this.getConfig();
		if ( config.git_worker_url ) {
			return config.git_worker_url;
		}

		// Try to get worker endpoint from storage provider settings
		try {
			const restUrl = getRestUrl();
			const nonceMeta = document.querySelector(
				'meta[name="aether-rest-nonce"]'
			);
			const nonce = nonceMeta ? nonceMeta.getAttribute( 'content' ) : '';

			const settingsResponse = await fetch( `${ restUrl }settings`, {
				headers: {
					'X-WP-Nonce': nonce,
				},
			} );

			if ( settingsResponse.ok ) {
				const settings = await settingsResponse.json();
				const workerEndpoint =
					settings?.providers?.[ settings?.provider_types?.storage ]
						?.worker_endpoint;
				if ( workerEndpoint ) {
					return workerEndpoint;
				}
			}
		} catch ( error ) {
			// Worker endpoint not available, return null
		}

		return null;
	}

	/**
	 * Get Git authentication object for isomorphic-git.
	 *
	 * @return {Promise<Object>} Auth object with username and password
	 */
	async getGitAuth() {
		const config = await this.getConfig();
		return {
			username: config.personal_access_token || '',
			password: '',
		};
	}

	/**
	 * Get the Git repository URL.
	 *
	 * Must be implemented by subclasses to construct provider-specific Git URL.
	 *
	 * @abstract
	 * @return {Promise<string>} Full Git repository URL
	 */
	async getGitRepositoryUrl() {
		throw new Error(
			'AbstractGitProvider.getGitRepositoryUrl() must be implemented by subclass'
		);
	}

	/**
	 * Get the API base URL for this provider.
	 *
	 * Must be implemented by subclasses to return provider-specific API base URL.
	 *
	 * @abstract
	 * @return {string} API base URL
	 */
	getApiBaseUrl() {
		throw new Error(
			'AbstractGitProvider.getApiBaseUrl() must be implemented by subclass'
		);
	}

	/**
	 * Test connection to provider API.
	 *
	 * Must be implemented by subclasses to test provider-specific API connection.
	 *
	 * @abstract
	 * @return {Promise<Object>} Connection test result
	 */
	async testConnection() {
		throw new Error(
			'AbstractGitProvider.testConnection() must be implemented by subclass'
		);
	}

	/**
	 * Get Git configuration for browser-side uploads.
	 *
	 * Returns configuration object compatible with useGitUpload hook.
	 *
	 * @return {Promise<Object>} Git configuration object
	 */
	async getGitConfig() {
		const config = await this.getConfig();
		const gitUrl = await this.getGitRepositoryUrl();

		return {
			config: {
				gitUrl: this.normalizeGitUrl( gitUrl ),
				branch: config.branch || 'main',
				personalAccessToken: config.personal_access_token || '',
			},
		};
	}

	/**
	 * Get the upload strategy for Git-based providers.
	 *
	 * All Git providers use 'git' upload strategy.
	 *
	 * @return {string} Upload strategy: 'git'
	 */
	getUploadStrategy() {
		return 'git';
	}
}

export default AbstractGitProvider;
