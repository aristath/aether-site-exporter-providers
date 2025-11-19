/**
 * Cloudflare Workers Provider Registration
 *
 * Registers the Cloudflare Workers provider handlers via WordPress hooks.
 * Provider metadata and settings are registered via PHP.
 *
 * @package
 */

import { addFilter } from '@wordpress/hooks';
import { CloudflareWorkersProvider } from './CloudflareWorkersProvider';

// Create provider instance for hook registration
const provider = new CloudflareWorkersProvider();

/**
 * Register test connection handler hook.
 *
 * Providers register test handlers via aether.provider.test filter.
 */
addFilter(
	'aether.provider.test',
	'aether/cloudflare',
	( handler, providerId, config ) => {
		// Only handle requests for this provider
		if ( providerId !== 'cloudflare' ) {
			return handler; // Return existing handler or null
		}

		// Return test handler function
		return async ( testConfig ) => {
			return await provider.testConnection( testConfig || config );
		};
	},
	10
);
