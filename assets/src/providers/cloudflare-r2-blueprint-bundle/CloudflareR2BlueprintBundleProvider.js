/**
 * Cloudflare R2 Blueprint Bundle Provider
 *
 * Static metadata class for the Cloudflare R2 blueprint bundle provider.
 * All logic is handled via hooks in index.js.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';

/**
 * CloudflareR2BlueprintBundleProvider class
 *
 * Provides Cloudflare R2 object storage for blueprint bundle exports.
 * This is a static metadata class - all operational logic is in index.js.
 */
export class CloudflareR2BlueprintBundleProvider {
	/**
	 * Provider ID constant.
	 *
	 * @type {string}
	 */
	static ID = 'cloudflare-r2-blueprint-bundle';

	/**
	 * Provider name.
	 *
	 * @type {string}
	 */
	static NAME = __( 'Cloudflare R2 (Blueprint Bundle)', 'aether' );

	/**
	 * Provider type.
	 *
	 * @type {string}
	 */
	static TYPE = 'cloud-storage';

	/**
	 * Provider description.
	 *
	 * @type {string}
	 */
	static DESCRIPTION = __(
		'Cloudflare R2 object storage for WordPress Playground blueprint bundles with zero egress fees.',
		'aether'
	);

	/**
	 * Provider icon.
	 *
	 * @type {string}
	 */
	static ICON = '☁️';

	/**
	 * Deployment type this provider supports.
	 *
	 * @type {string}
	 */
	static DEPLOYMENT_TYPE = 'blueprint_bundle';

	/**
	 * Configuration fields.
	 *
	 * @type {Array<Object>}
	 */
	static CONFIG_FIELDS = [
		{
			id: 'account_id',
			label: __( 'Cloudflare Account ID', 'aether' ),
			type: 'text',
			required: true,
			sensitive: true,
			validation: {
				pattern: '^[a-f0-9]{32}$',
				message: __(
					'Account ID must be a 32-character hexadecimal string',
					'aether'
				),
			},
		},
		{
			id: 'api_token',
			label: __( 'Cloudflare API Token', 'aether' ),
			type: 'password',
			required: true,
			sensitive: true,
			validation: {
				minLength: 20,
				message: __(
					'API Token must be at least 20 characters',
					'aether'
				),
			},
		},
		{
			id: 'access_key_id',
			label: __( 'R2 Access Key ID', 'aether' ),
			type: 'text',
			required: true,
			sensitive: true,
			validation: {
				minLength: 16,
				maxLength: 128,
				message: __(
					'Access Key ID must be between 16 and 128 characters',
					'aether'
				),
			},
		},
		{
			id: 'secret_access_key',
			label: __( 'R2 Secret Access Key', 'aether' ),
			type: 'text',
			required: true,
			sensitive: true,
			validation: {
				minLength: 32,
				maxLength: 128,
				message: __(
					'Secret Access Key must be between 32 and 128 characters',
					'aether'
				),
			},
		},
		{
			id: 'bucket_name',
			label: __( 'Bucket Name', 'aether' ),
			type: 'text',
			required: true,
			sensitive: false,
			validation: {
				pattern: '^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$',
				minLength: 3,
				maxLength: 63,
				message: __(
					'Bucket name must be 3-63 characters, start and end with alphanumeric, and contain only lowercase letters, numbers, and hyphens',
					'aether'
				),
			},
		},
		{
			id: 'worker_endpoint',
			label: __( 'Worker Endpoint URL', 'aether' ),
			type: 'url',
			required: false,
			sensitive: false,
			help: __(
				'URL of the deployed Cloudflare Worker. Use the Deploy Worker button below to create one.',
				'aether'
			),
		},
		{
			id: 'bundle_path',
			label: __( 'Bundle Path', 'aether' ),
			type: 'text',
			required: false,
			sensitive: false,
			placeholder: 'blueprint-bundle/bundle.zip',
			help: __(
				'Path within the bucket for the blueprint bundle ZIP file',
				'aether'
			),
		},
		{
			id: 'custom_domain',
			label: __( 'Custom Domain (Optional)', 'aether' ),
			type: 'url',
			required: false,
			sensitive: false,
			isAdvanced: true,
		},
	];
}

export default CloudflareR2BlueprintBundleProvider;
