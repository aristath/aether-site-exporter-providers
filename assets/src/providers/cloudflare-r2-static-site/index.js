/**
 * Cloudflare R2 Static Site Provider Registration
 *
 * Registers the Cloudflare R2 static site provider handlers via WordPress hooks.
 * Provider metadata is registered in JavaScript, not PHP.
 *
 * @package
 */

import { addFilter, addAction, doAction } from '@wordpress/hooks';
import { CloudflareR2StaticSiteProvider } from './CloudflareR2StaticSiteProvider';
import { initCloudflareR2ModalHooks } from './modal-hooks';
import ProviderRegistry from '@aether/providers/registry/ProviderRegistry';
import apiFetch from '../../utils/api';
import { StorageService } from '../services/storageService';

/**
 * Load provider configuration from REST API.
 *
 * @param {string} providerId Provider instance ID.
 * @return {Promise<Object>} Provider configuration or empty object.
 */
async function loadProviderConfig( providerId ) {
	try {
		const response = await apiFetch( {
			path: `/aether/site-exporter/providers/${ providerId }/config`,
			method: 'GET',
		} );
		return response.config || {};
	} catch ( error ) {
		if (
			error.code === 'restProviderNotConfigured' ||
			error.status === 404
		) {
			return {};
		}
		throw error;
	}
}

// Register provider class in JavaScript registry
ProviderRegistry.register(
	CloudflareR2StaticSiteProvider.ID,
	CloudflareR2StaticSiteProvider
);

// Also trigger the hook for any listeners
doAction( 'aether.providers.register', CloudflareR2StaticSiteProvider );

// Track processed files per provider to avoid duplicate processing
const processedFiles = new Map();

/**
 * Get storage service for a provider instance.
 *
 * @param {string} providerId Provider instance ID.
 * @return {Promise<StorageService|null>} Storage service or null if not configured.
 */
async function getStorageService( providerId ) {
	const config = await loadProviderConfig( providerId );

	if ( ! config?.worker_endpoint || ! config?.bucket_name ) {
		return null;
	}

	return new StorageService( config.worker_endpoint, config.bucket_name, {
		public_url: config.custom_domain || null,
	} );
}

/**
 * Handle unified file upload for static site provider.
 *
 * @param {Object} fileContext Unified file context from aether.file.upload action.
 * @return {Promise<void>}
 */
async function handleUnifiedFileUpload( fileContext ) {
	const {
		fileType,
		providerId,
		filePath,
		fileContent,
		contentType,
		storageKey,
	} = fileContext;

	// Only handle requests for cloudflare-r2-static-site providers
	if (
		! providerId ||
		! providerId.startsWith( 'cloudflare-r2-static-site' )
	) {
		return;
	}

	// Only handle static files, not blueprint bundles
	if ( fileType === 'blueprint-bundle' ) {
		return;
	}

	// Create a unique key for this file+provider combination
	const fileKey = `${ providerId }:${ storageKey }`;

	// Check if file is already processed or in progress
	const existingEntry = processedFiles.get( fileKey );
	if ( existingEntry === true ) {
		return;
	}
	if ( existingEntry instanceof Promise ) {
		try {
			await existingEntry;
		} catch {
			if ( processedFiles.get( fileKey ) === existingEntry ) {
				processedFiles.delete( fileKey );
			}
		}
		if ( processedFiles.get( fileKey ) === true ) {
			return;
		}
	}

	const processingPromise = ( async () => {
		try {
			const storage = await getStorageService( providerId );
			if ( ! storage ) {
				throw new Error(
					'Storage service not available. Please configure worker_endpoint and bucket_name.'
				);
			}

			// Get file content as Blob
			let fileBlob = null;
			if ( fileContent ) {
				if ( typeof fileContent === 'string' ) {
					fileBlob = new Blob( [ fileContent ], {
						type: contentType || 'text/html',
					} );
				} else if ( fileContent instanceof Blob ) {
					fileBlob = fileContent;
				}
			} else if (
				filePath?.startsWith( 'http://' ) ||
				filePath?.startsWith( 'https://' )
			) {
				const response = await fetch( filePath, {
					method: 'GET',
					credentials: 'omit',
				} );
				if ( ! response.ok ) {
					throw new Error(
						`Failed to fetch ${ filePath }: HTTP ${ response.status }`
					);
				}
				fileBlob = await response.blob();
			}

			if ( ! fileBlob ) {
				throw new Error( 'File content or valid URL is required' );
			}

			// Determine storage key from filePath if not provided
			let finalStorageKey = storageKey;
			if ( ! finalStorageKey && filePath ) {
				if (
					filePath.startsWith( 'http://' ) ||
					filePath.startsWith( 'https://' )
				) {
					try {
						const urlObj = new URL( filePath );
						finalStorageKey = urlObj.pathname;
					} catch {
						finalStorageKey = filePath;
					}
				} else {
					finalStorageKey = filePath;
				}
			}

			// Normalize storage key
			finalStorageKey =
				finalStorageKey?.replace( /^\/+/, '' ) || 'index.html';

			// Add index.html for directory paths
			if ( finalStorageKey.endsWith( '/' ) ) {
				finalStorageKey =
					finalStorageKey.replace( /\/+$/, '' ) + '/index.html';
			} else if ( ! /\.[a-zA-Z0-9]+$/.test( finalStorageKey ) ) {
				finalStorageKey = finalStorageKey + '/index.html';
			}

			const uploadResult = await storage.upload(
				finalStorageKey,
				fileBlob,
				{
					contentType: contentType || 'text/html',
				}
			);

			if ( ! uploadResult.success ) {
				throw new Error( uploadResult.error || 'Upload failed' );
			}

			fileContext.result = { success: true, url: uploadResult.url };
		} catch ( error ) {
			fileContext.result = {
				success: false,
				error: error.message || 'Unknown error',
			};
			throw error;
		}
		processedFiles.set( fileKey, true );
	} )().catch( ( error ) => {
		if ( processedFiles.get( fileKey ) === processingPromise ) {
			processedFiles.delete( fileKey );
		}
		throw error;
	} );

	processedFiles.set( fileKey, processingPromise );
	await processingPromise;
}

/**
 * Register unified file upload action hook.
 */
addAction(
	'aether.file.upload',
	'aether/cloudflare-r2-static-site',
	( fileContext ) => {
		if ( ! fileContext._uploadPromises ) {
			fileContext._uploadPromises = [];
		}
		fileContext._uploadPromises.push(
			handleUnifiedFileUpload( fileContext )
		);
	},
	10
);

/**
 * Register test connection handler hook.
 */
addFilter(
	'aether.provider.test',
	'aether/cloudflare-r2-static-site',
	( handler, providerId ) => {
		if ( ! providerId?.startsWith( 'cloudflare-r2-static-site' ) ) {
			return handler;
		}
		return async () => {
			const storage = await getStorageService( providerId );
			if ( ! storage ) {
				return {
					success: false,
					error: 'Storage service not configured. Please set worker_endpoint and bucket_name.',
				};
			}
			return storage.testConnection();
		};
	},
	10
);

/**
 * Register upload strategy filter.
 */
addFilter(
	'aether.provider.upload_strategy',
	'aether/cloudflare-r2-static-site',
	( strategy, providerId ) => {
		if ( providerId?.startsWith( 'cloudflare-r2-static-site' ) ) {
			return 'worker';
		}
		return strategy;
	},
	10
);

// Initialize modal hooks
initCloudflareR2ModalHooks( 'cloudflare-r2-static-site' );
