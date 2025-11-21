/**
 * Abstract AWS Provider Base Class
 *
 * Base class for all AWS S3-compatible storage providers (Cloudflare R2, AWS S3, DigitalOcean Spaces, etc.).
 * Provides common S3-compatible storage operations and functionality.
 *
 * @package
 */

import { StorageService } from '../services/storageService';

// Import from base plugin
import { AbstractProvider } from '@aether/base/providers/base/AbstractProvider';
import { DEPLOYMENT_TYPES } from '@aether/base/constants/deploymentTypes';

/**
 * AbstractAWSProvider class
 *
 * Abstract base class for AWS S3-compatible storage providers.
 * Subclasses must implement provider-specific methods.
 */
export class AbstractAWSProvider extends AbstractProvider {
	/**
	 * Get supported deployment types.
	 *
	 * AWS S3-compatible providers support blueprint bundles and static sites.
	 *
	 * @return {Array<string>} Supported deployment types
	 */
	getSupportedDeploymentTypes() {
		return [
			DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE,
			DEPLOYMENT_TYPES.STATIC_SITE,
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
	 * Abstract base class - subclasses should override this method to define their fields.
	 *
	 * @return {Array<Object>} Empty array (subclasses should override)
	 */
	getProviderSpecificConfigFields() {
		// Abstract base class - subclasses should override
		return [];
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

export default AbstractAWSProvider;
