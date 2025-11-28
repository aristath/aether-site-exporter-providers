/**
 * Cloudflare Credentials Profile Type
 *
 * Defines the schema for Cloudflare account credentials.
 * These credentials (account_id and api_token) can be shared across
 * multiple R2 provider instances.
 */

import { __ } from '@wordpress/i18n';

/**
 * CloudflareCredentialsProfileType class
 *
 * Static class defining the Cloudflare credentials profile schema.
 */
export class CloudflareCredentialsProfileType {
	/**
	 * Unique identifier for this profile type.
	 *
	 * @type {string}
	 */
	static ID = 'cloudflare';

	/**
	 * Category this type belongs to.
	 *
	 * @type {string}
	 */
	static CATEGORY = 'credentials';

	/**
	 * Human-readable name.
	 *
	 * @type {string}
	 */
	static NAME = __( 'Cloudflare Account', 'altolith-deploy-r2' );

	/**
	 * Description shown in UI.
	 *
	 * @type {string}
	 */
	static DESCRIPTION = __(
		'Cloudflare API credentials for R2, Workers, and other Cloudflare services.',
		'altolith-deploy-r2'
	);

	/**
	 * Icon for UI.
	 *
	 * @type {string}
	 */
	static ICON = 'cloud';

	/**
	 * Fields for this profile type.
	 *
	 * Uses same field definition format as provider CONFIG_FIELDS.
	 * Note: Only account_id and api_token - other fields (bucket, path, etc.)
	 * are provider-instance-specific.
	 *
	 * @type {Array<Object>}
	 */
	static FIELDS = [
		{
			id: 'account_id',
			label: __( 'Cloudflare Account ID', 'altolith-deploy-r2' ),
			type: 'text',
			sensitive: true,
			required: true,
			help: __(
				'Your Cloudflare Account ID (32-character hex string). Find it in your Cloudflare dashboard.',
				'altolith-deploy-r2'
			),
			pattern: '^[a-f0-9]{32}$',
			patternError: __(
				'Account ID must be a 32-character hexadecimal string',
				'altolith-deploy-r2'
			),
		},
		{
			id: 'api_token',
			label: __( 'Cloudflare API Token', 'altolith-deploy-r2' ),
			type: 'text',
			sensitive: true,
			required: true,
			help: __(
				'Cloudflare API Token with appropriate permissions. Create one in your Cloudflare dashboard under API Tokens.',
				'altolith-deploy-r2'
			),
		},
	];

	/**
	 * Test endpoint for validating credentials.
	 *
	 * If provided, UI shows "Test Credentials" button.
	 *
	 * @type {string}
	 */
	static TEST_ENDPOINT = '/altolith/deploy-r2/profiles/cloudflare/test';
}

export default CloudflareCredentialsProfileType;
