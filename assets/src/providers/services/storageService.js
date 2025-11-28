/**
 * Storage Service (React)
 *
 * React implementation of storage service for Cloudflare R2.
 * Replaces R2StorageService.php logic.
 * All operations go through Worker endpoint.
 *
 * @package
 */

import {
	uploadFile,
	deleteFile,
	copyFile,
	listObjects as listObjectsFromWorker,
	batchCopy as batchCopyFromWorker,
	batchDelete as batchDeleteFromWorker,
	getObjectUrl,
	downloadFile as downloadFileFromWorker,
} from '../../utils/workerEndpointClient';

/**
 * Storage Service class.
 */
export class StorageService {
	/**
	 * Constructor.
	 *
	 * Supports adapter pattern for provider-specific upload implementations.
	 * Each provider instance can inject its own upload adapter via the
	 * 'altolith.storage.service.create' filter, achieving true provider instance isolation.
	 *
	 * @param {string} workerEndpoint Worker endpoint URL.
	 * @param {string} bucketName     Bucket name.
	 * @param {Object} config         Optional configuration.
	 * @param {Object} uploadAdapter  Optional upload adapter with upload() method.
	 */
	constructor(
		workerEndpoint,
		bucketName,
		config = {},
		uploadAdapter = null
	) {
		this.workerEndpoint = workerEndpoint;
		this.bucketName = bucketName;
		this.config = config;
		this.providerId = config.provider_id || '';
		this.pathPrefix = config.path || '';
		this.uploadAdapter = uploadAdapter;
	}

	/**
	 * Get the full storage key with path prefix applied.
	 *
	 * @param {string} key Original key.
	 * @return {string} Key with path prefix prepended.
	 */
	getFullKey( key ) {
		if ( ! this.pathPrefix ) {
			return key;
		}
		// Normalize: ensure prefix ends with / and key doesn't start with /
		const prefix = this.pathPrefix.replace( /\/$/, '' ) + '/';
		const normalizedKey = key.replace( /^\//, '' );
		return prefix + normalizedKey;
	}

	/**
	 * Upload a file to storage.
	 *
	 * Uses the upload adapter if provided, otherwise falls back to direct upload.
	 * This enables provider-specific upload implementations while keeping common logic
	 * (manifest, dedup, etc.) in the StorageService.
	 *
	 * @param {string}    key      Object key/path in storage.
	 * @param {File|Blob} file     File to upload.
	 * @param {Object}    metadata Optional metadata (contentType, cacheControl, onProgress).
	 * @return {Promise<Object>} Result array with 'success' and optional 'url', 'error'.
	 */
	async upload( key, file, metadata = {} ) {
		if ( ! ( file instanceof File || file instanceof Blob ) ) {
			return {
				success: false,
				error: 'File must be a File or Blob object',
			};
		}

		const contentType = metadata.contentType || file.type;

		try {
			let result;

			// Use upload adapter if provided (provider-specific upload)
			if (
				this.uploadAdapter &&
				typeof this.uploadAdapter.upload === 'function'
			) {
				result = await this.uploadAdapter.upload( key, file, {
					...metadata,
					contentType,
				} );
			} else {
				// Default: upload directly to R2 via worker
				const fullKey = this.getFullKey( key );

				const options = {
					contentType,
					cacheControl: metadata.cacheControl || '',
					onProgress: metadata.onProgress || null,
				};

				result = await uploadFile(
					this.workerEndpoint,
					fullKey,
					file,
					options
				);
			}

			if ( ! result.success ) {
				return result;
			}

			// Build public URL using original key for URL generation.
			const url = this.getUrl( key );

			return {
				success: true,
				url,
			};
		} catch ( error ) {
			return {
				success: false,
				error: error.message || 'Upload failed',
			};
		}
	}

	/**
	 * Delete a file from storage.
	 *
	 * @param {string} key Object key/path.
	 * @return {Promise<Object>} Result array with 'success' and optional 'error'.
	 */
	async delete( key ) {
		const fullKey = this.getFullKey( key );
		return deleteFile( this.workerEndpoint, fullKey );
	}

	/**
	 * Copy an object from source to destination within storage.
	 *
	 * @param {string} sourceKey Source object key.
	 * @param {string} destKey   Destination object key.
	 * @return {Promise<Object>} Result array with 'success' and optional 'error'.
	 */
	async copy( sourceKey, destKey ) {
		const fullSourceKey = this.getFullKey( sourceKey );
		const fullDestKey = this.getFullKey( destKey );
		return copyFile( this.workerEndpoint, fullSourceKey, fullDestKey );
	}

	/**
	 * Check if a file exists in storage.
	 *
	 * @param {string} key Object key/path.
	 * @return {Promise<boolean>} True if exists, false otherwise.
	 */
	async exists( key ) {
		const fullKey = this.getFullKey( key );
		// List objects with prefix matching the exact key.
		const result = await listObjectsFromWorker(
			this.workerEndpoint,
			fullKey,
			1
		);

		if ( ! result.success ) {
			return false;
		}

		const objects = result.objects || [];
		return objects.some( ( obj ) => obj.key === fullKey );
	}

	/**
	 * List objects in storage.
	 *
	 * @param {string} prefix Optional prefix to filter objects.
	 * @param {number} limit  Maximum number of objects to return.
	 * @return {Promise<Object>} Result array with 'success', 'objects' array, and optional 'error'.
	 */
	async listObjects( prefix = '', limit = 1000 ) {
		const fullPrefix = this.getFullKey( prefix );
		return listObjectsFromWorker( this.workerEndpoint, fullPrefix, limit );
	}

	/**
	 * Get public URL for an object.
	 *
	 * @param {string} key Object key/path.
	 * @return {string} Public URL.
	 */
	getUrl( key ) {
		const fullKey = this.getFullKey( key );
		// Use public_url if available (e.g., custom domain)
		if ( this.config.public_url ) {
			const baseUrl = this.config.public_url.replace( /\/$/, '' );
			return `${ baseUrl }/${ fullKey }`;
		}
		// Fallback to worker endpoint URL
		return getObjectUrl( this.workerEndpoint, this.bucketName, fullKey );
	}

	/**
	 * Batch copy multiple objects in storage.
	 *
	 * @param {Array} operations Array of {source, dest} objects.
	 * @return {Promise<Object>} Result with success, copied count, errors count, and results array.
	 */
	async batchCopy( operations ) {
		const prefixedOperations = operations.map( ( op ) => ( {
			source: this.getFullKey( op.source ),
			dest: this.getFullKey( op.dest ),
		} ) );
		return batchCopyFromWorker( this.workerEndpoint, prefixedOperations );
	}

	/**
	 * Batch delete multiple objects from storage.
	 *
	 * @param {Array} keys Array of object keys to delete.
	 * @return {Promise<Object>} Result with success and optional error.
	 */
	async batchDelete( keys ) {
		const prefixedKeys = keys.map( ( key ) => this.getFullKey( key ) );
		return batchDeleteFromWorker( this.workerEndpoint, prefixedKeys );
	}

	/**
	 * Download manifest file from storage.
	 *
	 * Uses providerId from config to build manifest path, matching base plugin's interface.
	 *
	 * @return {Promise<Blob|null>} Manifest blob or null if not found.
	 */
	async downloadManifest() {
		const manifestKey = this.providerId
			? `file-manifest-${ this.providerId }.json`
			: 'file-manifest.json';
		const fullKey = this.getFullKey( manifestKey );

		try {
			const blob = await downloadFileFromWorker(
				this.workerEndpoint,
				fullKey
			);
			return blob;
		} catch ( error ) {
			// Return null if file doesn't exist (404) or other error.
			return null;
		}
	}

	/**
	 * Upload manifest file to storage.
	 *
	 * Uses providerId from config to build manifest path, matching base plugin's interface.
	 *
	 * @param {Blob} blob Manifest blob to upload.
	 * @return {Promise<Object>} Result with success and optional error.
	 */
	async uploadManifest( blob ) {
		const manifestKey = this.providerId
			? `file-manifest-${ this.providerId }.json`
			: 'file-manifest.json';

		const result = await this.upload( manifestKey, blob, {
			contentType: 'application/json',
		} );

		return result;
	}

	/**
	 * Test connection to storage service.
	 *
	 * @return {Promise<Object>} Result array with 'success' and optional 'message', 'error'.
	 */
	async testConnection() {
		// Try to list objects (max 1) to verify connection.
		// Use listObjectsFromWorker directly without path prefix for connection test
		const result = await listObjectsFromWorker(
			this.workerEndpoint,
			'',
			1
		);

		if ( ! result.success ) {
			return {
				success: false,
				error: result.error || 'Failed to list objects',
			};
		}

		return {
			success: true,
			message: 'Successfully connected to Cloudflare R2.',
		};
	}
}
