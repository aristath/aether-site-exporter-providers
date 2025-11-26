/**
 * Cloudflare R2 Documentation Content
 *
 * Contains all help text, documentation, and instructions
 * for the R2 provider configuration modal.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';

/**
 * Required API token permissions for R2 provider.
 */
export const REQUIRED_PERMISSIONS = {
	title: __(
		'Required API Token Permissions',
		'aether-site-exporter-providers'
	),
	sections: [
		{
			title: __( 'R2 Storage', 'aether-site-exporter-providers' ),
			items: [
				{
					permission: 'R2: Edit',
					description: __(
						'Read and write files to R2 bucket',
						'aether-site-exporter-providers'
					),
				},
			],
		},
		{
			title: __(
				'Workers (for deployment)',
				'aether-site-exporter-providers'
			),
			items: [
				{
					permission: 'Workers Scripts: Edit',
					description: __(
						'Deploy and update Workers',
						'aether-site-exporter-providers'
					),
				},
				{
					permission: 'Workers Routes: Edit',
					description: __(
						'Attach custom domains to Workers',
						'aether-site-exporter-providers'
					),
				},
			],
		},
		{
			title: __(
				'DNS (for custom domains)',
				'aether-site-exporter-providers'
			),
			items: [
				{
					permission: 'Zone: Read',
					description: __(
						'Look up zone IDs for custom domains',
						'aether-site-exporter-providers'
					),
				},
			],
		},
	],
	createTokenUrl: 'https://dash.cloudflare.com/profile/api-tokens',
};

/**
 * Manual worker deployment instructions.
 */
export const MANUAL_WORKER_DEPLOYMENT = {
	title: __( 'Manual Worker Deployment', 'aether-site-exporter-providers' ),
	steps: [
		__(
			'Go to Cloudflare Dashboard > Workers & Pages',
			'aether-site-exporter-providers'
		),
		__(
			'Click "Create" and select "Create Worker"',
			'aether-site-exporter-providers'
		),
		__(
			'Name your worker (e.g., "my-r2-static-site")',
			'aether-site-exporter-providers'
		),
		__(
			'Go to Settings > Variables > R2 Bucket Bindings',
			'aether-site-exporter-providers'
		),
		__(
			'Add binding: Variable name "R2_BUCKET", select your bucket',
			'aether-site-exporter-providers'
		),
		__(
			'Deploy the worker and copy the URL',
			'aether-site-exporter-providers'
		),
	],
	workersUrl: 'https://dash.cloudflare.com/?to=/:account/workers-and-pages',
};

/**
 * Manual domain attachment instructions.
 */
export const MANUAL_DOMAIN_ATTACHMENT = {
	title: __( 'Manual Domain Attachment', 'aether-site-exporter-providers' ),
	steps: [
		__(
			'Go to Cloudflare Dashboard > Workers & Pages',
			'aether-site-exporter-providers'
		),
		__( 'Select your worker', 'aether-site-exporter-providers' ),
		__(
			'Go to Settings > Triggers > Custom Domains',
			'aether-site-exporter-providers'
		),
		__( 'Click "Add Custom Domain"', 'aether-site-exporter-providers' ),
		__( 'Enter your domain and confirm', 'aether-site-exporter-providers' ),
	],
	note: __(
		'Ensure the domain is on the same Cloudflare account and proxied through Cloudflare (orange cloud).',
		'aether-site-exporter-providers'
	),
	docsUrl:
		'https://developers.cloudflare.com/workers/configuration/routing/custom-domains/',
};

/**
 * Links to Cloudflare documentation.
 */
export const CLOUDFLARE_DOCS = {
	createApiToken:
		'https://developers.cloudflare.com/fundamentals/api/get-started/create-token/',
	r2Overview: 'https://developers.cloudflare.com/r2/',
	workersCustomDomains:
		'https://developers.cloudflare.com/workers/configuration/routing/custom-domains/',
	workersBindings:
		'https://developers.cloudflare.com/workers/runtime-apis/bindings/',
};
