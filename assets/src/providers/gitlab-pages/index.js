/**
 * GitLab Pages Provider Registration
 *
 * Registers the GitLab Pages provider class and settings component via WordPress hooks.
 *
 * @package
 */

import { addAction } from '@wordpress/hooks';
import { render } from '@wordpress/element';
import GitLabPagesSettings from './Settings';
import { GitLabPagesProvider } from './GitLabPagesProvider';

// Debug: Log that this script is loading
// eslint-disable-next-line no-console
console.log( '[Aether Providers] GitLab Pages script loaded' );

// Track if provider has been registered to prevent duplicate registration
let providerRegistered = false;

/**
 * Register provider with the registry
 */
function registerProvider( SDK ) {
	// Prevent duplicate registration
	if ( providerRegistered ) {
		return;
	}

	// Use SDK from parameter or try to get from window
	if ( ! SDK && typeof window !== 'undefined' ) {
		SDK = window.AetherProviderSDK;
	}

	if ( ! SDK || ! SDK.ProviderRegistry ) {
		return false;
	}

	try {
		providerRegistered = true;
		const registry = SDK.ProviderRegistry.getInstance();
		registry.register( GitLabPagesProvider.ID, GitLabPagesProvider );
		// eslint-disable-next-line no-console
		console.log( '[Aether Providers] GitLab Pages provider registered:', GitLabPagesProvider.ID );
		// Force auto-discovery to ensure the registry picks up the new provider
		registry.autoDiscover( true );
		return true;
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( '[Aether Providers] Error registering GitLab Pages:', error );
		providerRegistered = false;
		return false;
	}
}

// Hook into SDK ready action - the action passes the SDK object directly
addAction( 'aether.provider.sdk.ready', 'gitlab-pages/sdk-ready', ( SDK ) => {
	registerProvider( SDK );
} );

// Also hook into the provider registration action (fallback)
addAction(
	'aether.providers.register',
	'gitlab-pages/register',
	( registry ) => {
		registry.register( GitLabPagesProvider.ID, GitLabPagesProvider );
		// eslint-disable-next-line no-console
		console.log( '[Aether Providers] GitLab Pages provider registered via action:', GitLabPagesProvider.ID );
	}
);

// Check if SDK is already available on window (fallback)
if (
	typeof window !== 'undefined' &&
	window.AetherProviderSDK &&
	typeof window.AetherProviderSDK.AbstractProvider === 'function'
) {
	registerProvider();
}

// Register the settings component via action hook
addAction(
	'aether.admin.provider.settings',
	'gitlab-pages/settings',
	( providerId, container ) => {
		if ( providerId === 'gitlab-pages' && container ) {
			render(
				<GitLabPagesSettings providerId={ providerId } />,
				container
			);
		}
	}
);
