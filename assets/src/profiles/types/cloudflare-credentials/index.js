/**
 * Cloudflare Credentials Profile Type Registration
 *
 * Registers the Cloudflare credentials profile type with the profiles system.
 */

import { addFilter, doAction } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { CloudflareCredentialsProfileType } from './CloudflareCredentialsProfileType';

// Import ProfileTypeRegistry from base plugin
// Note: This is available globally via window.altolith.ProfileTypeRegistry
// We use dynamic import to handle the case where base plugin loads after this one
let ProfileTypeRegistry = null;

/**
 * Initialize the profile type registration.
 *
 * Called when the profiles system is ready.
 */
function initProfileType() {
	// Get the global registry
	if (
		typeof window !== 'undefined' &&
		window.altolith?.ProfileTypeRegistry
	) {
		ProfileTypeRegistry = window.altolith.ProfileTypeRegistry;

		// Register with the registry
		ProfileTypeRegistry.register( CloudflareCredentialsProfileType );

		// Trigger hook for any listeners
		doAction(
			'altolith.profiles.types.register',
			CloudflareCredentialsProfileType
		);
	}
}

/**
 * Register the 'credentials' category via filter.
 *
 * Categories are broad groupings for profiles. The 'credentials' category
 * is used for authentication credentials for cloud services.
 */
addFilter(
	'altolith.profiles.categories',
	'altolith-deploy-r2/credentials-category',
	( categories ) => {
		// Check if credentials category already exists
		const hasCredentials = categories.some(
			( cat ) => cat.id === 'credentials'
		);

		if ( ! hasCredentials ) {
			return [
				...categories,
				{
					id: 'credentials',
					name: __( 'Credentials', 'altolith-deploy-r2' ),
					description: __(
						'Authentication credentials for cloud services',
						'altolith-deploy-r2'
					),
					icon: 'admin-network',
				},
			];
		}

		return categories;
	}
);

// Try to initialize immediately if registry is already available
if ( typeof window !== 'undefined' && window.altolith?.ProfileTypeRegistry ) {
	initProfileType();
} else if ( typeof window !== 'undefined' ) {
	// Wait for the registry to be available
	// Use a MutationObserver pattern or simply delay initialization
	const checkRegistry = () => {
		if ( window.altolith?.ProfileTypeRegistry ) {
			initProfileType();
		} else {
			// Retry after a short delay
			setTimeout( checkRegistry, 100 );
		}
	};

	// Start checking when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', checkRegistry );
	} else {
		checkRegistry();
	}
}

export { CloudflareCredentialsProfileType };
