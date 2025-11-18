/**
 * Cloudflare R2 Provider Registration
 *
 * Registers the Cloudflare R2 provider class and settings component via WordPress hooks.
 *
 * @package
 */

import { addAction } from '@wordpress/hooks';
import { render } from '@wordpress/element';
import CloudflareR2Settings from './Settings';
import { CloudflareR2Provider } from './CloudflareR2Provider';

// Debug: Log that this script is loading
// eslint-disable-next-line no-console
console.log( '[Aether Providers] Cloudflare R2 script loaded' );

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
		// eslint-disable-next-line no-console
		console.log( '[Aether Providers] Registering Cloudflare R2 with registry, current providers:', Array.from( registry.providers.keys() ) );
		registry.register( CloudflareR2Provider.ID, CloudflareR2Provider );
		// eslint-disable-next-line no-console
		console.log( '[Aether Providers] Cloudflare R2 provider registered:', CloudflareR2Provider.ID, 'Registry now has:', Array.from( registry.providers.keys() ) );
		// Force auto-discovery to ensure the registry picks up the new provider
		// This is safe because register() is idempotent
		registry.autoDiscover( true );
		return true;
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( '[Aether Providers] Error registering Cloudflare R2:', error );
		providerRegistered = false;
		return false;
	}
}

// Hook into SDK ready action - the action passes the SDK object directly
addAction( 'aether.provider.sdk.ready', 'cloudflare-r2/sdk-ready', ( SDK ) => {
	// eslint-disable-next-line no-console
	console.log( '[Aether Providers] SDK received via action:', !!SDK, 'ProviderRegistry:', !!SDK?.ProviderRegistry );
	registerProvider( SDK );
} );

// Also hook into the provider registration action (fallback)
addAction(
	'aether.providers.register',
	'cloudflare-r2/register',
	( registry ) => {
		registry.register( CloudflareR2Provider.ID, CloudflareR2Provider );
		// eslint-disable-next-line no-console
		console.log( '[Aether Providers] Cloudflare R2 provider registered via action:', CloudflareR2Provider.ID );
	}
);

// Check if SDK is already available on window (fallback)
if (
	typeof window !== 'undefined' &&
	window.AetherProviderSDK &&
	typeof window.AetherProviderSDK.AbstractProvider === 'function'
) {
	// eslint-disable-next-line no-console
	console.log( '[Aether Providers] SDK already available on window, registering Cloudflare R2 immediately' );
	registerProvider();
}

// Register the settings component via action hook
addAction(
	'aether.admin.provider.settings',
	'cloudflare-r2/settings',
	( providerId, container ) => {
		if ( providerId === 'cloudflare-r2' && container ) {
			render(
				<CloudflareR2Settings providerId={ providerId } />,
				container
			);
		}
	}
);
