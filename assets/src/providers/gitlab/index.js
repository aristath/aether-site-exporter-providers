/**
 * GitLab Provider Registration
 *
 * Registers the GitLab provider handlers via WordPress hooks.
 * Provider metadata and settings are registered via PHP.
 *
 * @package
 */

import { addFilter } from '@wordpress/hooks';
import { GitLabProvider } from './GitLabProvider';

// Create provider instance for hook registration
const provider = new GitLabProvider();

/**
 * Register test connection handler hook.
 *
 * Providers register test handlers via aether.provider.test filter.
 */
addFilter(
	'aether.provider.test',
	'aether/gitlab',
	( handler, providerId, config ) => {
		// Only handle requests for this provider
		if ( providerId !== 'gitlab' ) {
			return handler; // Return existing handler or null
		}

		// Return test handler function
		return async ( testConfig ) => {
			return await provider.testConnection( testConfig || config );
		};
	},
	10
);
