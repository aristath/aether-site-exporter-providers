/**
 * GitLab Provider Registration
 *
 * Registers the GitLab provider class and settings component via WordPress hooks.
 *
 * @package
 */

import { addAction } from '@wordpress/hooks';
import { render } from '@wordpress/element';
import GitLabSettings from './Settings';
import { GitLabProvider } from './GitLabProvider';

// Debug: Log that this script is loading
// eslint-disable-next-line no-console
console.log( '[Aether Providers] GitLab script loaded' );

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
		registry.register( GitLabProvider.ID, GitLabProvider );
		// eslint-disable-next-line no-console
		console.log( '[Aether Providers] GitLab provider registered:', GitLabProvider.ID );
		// Force auto-discovery to ensure the registry picks up the new provider
		registry.autoDiscover( true );
		return true;
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( '[Aether Providers] Error registering GitLab:', error );
		providerRegistered = false;
		return false;
	}
}

// Hook into SDK ready action - the action passes the SDK object directly
addAction( 'aether.provider.sdk.ready', 'gitlab/sdk-ready', ( SDK ) => {
	registerProvider( SDK );
} );

// Also hook into the provider registration action (fallback)
addAction( 'aether.providers.register', 'gitlab/register', ( registry ) => {
	registry.register( GitLabProvider.ID, GitLabProvider );
	// eslint-disable-next-line no-console
	console.log( '[Aether Providers] GitLab provider registered via action:', GitLabProvider.ID );
} );

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
	'gitlab/settings',
	( providerId, container ) => {
		if ( providerId === 'gitlab' && container ) {
			render( <GitLabSettings providerId={ providerId } />, container );
		}
	}
);
