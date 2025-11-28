/**
 * Cloudflare R2 Provider
 *
 * Unified provider for Cloudflare R2 object storage. Handles all output types
 * (static site, blueprint, etc.) based on user configuration.
 *
 * This replaces the separate CloudflareR2StaticSiteProvider and
 * CloudflareR2BlueprintBundleProvider with a single, extensible provider.
 */

import { __ } from '@wordpress/i18n';
import { getOutputTypeFields } from '@altolith/utils/outputTypes';

/**
 * CloudflareR2Provider class
 *
 * Provides Cloudflare R2 object storage for all output types.
 * Uses Cloudflare Workers for file uploads with zero egress fees.
 */
export class CloudflareR2Provider {
	/**
	 * Provider ID constant.
	 *
	 * @type {string}
	 */
	static ID = 'cloudflare-r2';

	/**
	 * Provider family for config copying compatibility.
	 *
	 * @type {string}
	 */
	static FAMILY = 'cloudflare-r2';

	/**
	 * Provider name.
	 *
	 * @type {string}
	 */
	static NAME = __( 'Cloudflare R2', 'altolith-deploy-r2' );

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
		'Cloudflare R2 object storage with zero egress fees. Supports static site exports and WordPress Playground blueprints.',
		'altolith-deploy-r2'
	);

	/**
	 * Provider icon.
	 *
	 * @type {string}
	 */
	static ICON = '☁️';

	/**
	 * Whether this provider supports parallel execution with other instances.
	 *
	 * R2 providers can run in parallel since they use separate worker endpoints.
	 *
	 * @type {boolean}
	 */
	static SUPPORTS_PARALLEL_EXECUTION = true;

	/**
	 * Core configuration fields (provider-specific).
	 *
	 * Output type fields are added dynamically via getConfigFields().
	 *
	 * @type {Array<Object>}
	 */
	static CONFIG_FIELDS = [
		{
			id: 'credential_profile',
			label: __( 'Cloudflare Credentials', 'altolith-deploy-r2' ),
			type: 'profile',
			profile_category: 'credentials',
			profile_type: 'cloudflare',
			required: true,
			help: __(
				'Select or create a Cloudflare credentials profile with your Account ID and API Token.',
				'altolith-deploy-r2'
			),
		},
		{
			id: 'bucket_name',
			label: __( 'Bucket Name', 'altolith-deploy-r2' ),
			type: 'text',
			required: true,
			sensitive: false,
			validation: {
				pattern: '^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$',
				minLength: 3,
				maxLength: 63,
				message: __(
					'Bucket name must be 3-63 characters, start and end with alphanumeric, and contain only lowercase letters, numbers, and hyphens',
					'altolith-deploy-r2'
				),
			},
		},
		{
			id: 'path',
			label: __( 'Path Prefix', 'altolith-deploy-r2' ),
			type: 'text',
			required: false,
			sensitive: false,
			placeholder: 'my-site/',
			help: __(
				'Optional path prefix for all uploaded files (e.g., "my-site/" will upload files as "my-site/index.html")',
				'altolith-deploy-r2'
			),
			validation: {
				pattern: '^[a-zA-Z0-9._/-]*$',
				message: __(
					'Path can only contain letters, numbers, dots, underscores, hyphens, and forward slashes',
					'altolith-deploy-r2'
				),
			},
		},
		{
			id: 'public_url',
			label: __( 'Custom Domain (Optional)', 'altolith-deploy-r2' ),
			type: 'url',
			required: false,
			sensitive: false,
			help: __(
				'The custom domain for your site (e.g., https://example.com). If provided, the Deploy Worker button will automatically attach it to the worker. Also used for blueprint URL references.',
				'altolith-deploy-r2'
			),
		},
		{
			id: 'worker_endpoint',
			label: __( 'Worker Endpoint URL', 'altolith-deploy-r2' ),
			type: 'url',
			required: false,
			sensitive: false,
			help: __(
				'URL of the deployed Cloudflare Worker. Use the Deploy Worker button below to create one.',
				'altolith-deploy-r2'
			),
		},
		{
			id: 'access_key_id',
			label: __( 'R2 Access Key ID', 'altolith-deploy-r2' ),
			type: 'text',
			required: false,
			sensitive: true,
			help: __(
				'Only required for S3-compatible API access, not for Worker-based uploads.',
				'altolith-deploy-r2'
			),
			validation: {
				minLength: 16,
				maxLength: 128,
				message: __(
					'Access Key ID must be between 16 and 128 characters',
					'altolith-deploy-r2'
				),
			},
		},
		{
			id: 'secret_access_key',
			label: __( 'R2 Secret Access Key', 'altolith-deploy-r2' ),
			type: 'text',
			required: false,
			sensitive: true,
			help: __(
				'Only required for S3-compatible API access, not for Worker-based uploads.',
				'altolith-deploy-r2'
			),
			validation: {
				minLength: 32,
				maxLength: 128,
				message: __(
					'Secret Access Key must be between 32 and 128 characters',
					'altolith-deploy-r2'
				),
			},
		},
	];

	/**
	 * Get all configuration fields including output type fields.
	 *
	 * This method merges the provider's core fields with fields from all
	 * registered output types (static_site, blueprint, media_offload, etc.).
	 *
	 * @return {Array<Object>} Complete array of config field definitions.
	 */
	static getConfigFields() {
		const coreFields = [ ...CloudflareR2Provider.CONFIG_FIELDS ];
		const outputTypeFields = getOutputTypeFields();

		return [ ...coreFields, ...outputTypeFields ];
	}
}

export default CloudflareR2Provider;
