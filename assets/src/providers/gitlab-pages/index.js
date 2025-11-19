/**
 * GitLab Pages Provider Registration
 *
 * Registers the GitLab Pages provider handlers via WordPress hooks.
 * Provider metadata and settings are registered via PHP.
 *
 * @package
 */

import { addFilter } from '@wordpress/hooks';
import { GitLabPagesProvider } from './GitLabPagesProvider';

// Create provider instance for hook registration
const provider = new GitLabPagesProvider();

/**
 * Register test connection handler hook.
 *
 * Providers register test handlers via aether.provider.test filter.
 */
addFilter(
	'aether.provider.test',
	'aether/gitlab-pages',
	( handler, providerId, config ) => {
		// Only handle requests for this provider
		if ( providerId !== 'gitlab-pages' ) {
			return handler; // Return existing handler or null
		}

		// Return test handler function
		return async ( testConfig ) => {
			return await provider.testConnection( testConfig || config );
		};
	},
	10
);
