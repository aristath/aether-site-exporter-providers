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
	title: __( 'Required API Token Permissions', 'altolith-deploy-r2' ),
	sections: [
		{
			title: __( 'R2 Storage', 'altolith-deploy-r2' ),
			items: [
				{
					permission: 'R2: Edit',
					description: __(
						'Read and write files to R2 bucket',
						'altolith-deploy-r2'
					),
				},
			],
		},
		{
			title: __( 'Workers (for deployment)', 'altolith-deploy-r2' ),
			items: [
				{
					permission: 'Workers Scripts: Edit',
					description: __(
						'Deploy and update Workers',
						'altolith-deploy-r2'
					),
				},
				{
					permission: 'Workers Routes: Edit',
					description: __(
						'Attach custom domains to Workers',
						'altolith-deploy-r2'
					),
				},
			],
		},
		{
			title: __( 'DNS (for custom domains)', 'altolith-deploy-r2' ),
			items: [
				{
					permission: 'Zone: Read',
					description: __(
						'Look up zone IDs for custom domains',
						'altolith-deploy-r2'
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
	title: __( 'Manual Worker Deployment', 'altolith-deploy-r2' ),
	steps: [
		__(
			'Go to Cloudflare Dashboard > Workers & Pages',
			'altolith-deploy-r2'
		),
		__( 'Click "Create" and select "Create Worker"', 'altolith-deploy-r2' ),
		__(
			'Name your worker (e.g., "my-r2-static-site")',
			'altolith-deploy-r2'
		),
		__(
			'Go to Settings > Variables > R2 Bucket Bindings',
			'altolith-deploy-r2'
		),
		__(
			'Add binding: Variable name "R2_BUCKET", select your bucket',
			'altolith-deploy-r2'
		),
		__( 'Deploy the worker and copy the URL', 'altolith-deploy-r2' ),
	],
	workersUrl: 'https://dash.cloudflare.com/?to=/:account/workers-and-pages',
};

/**
 * Manual domain attachment instructions.
 */
export const MANUAL_DOMAIN_ATTACHMENT = {
	title: __( 'Manual Domain Attachment', 'altolith-deploy-r2' ),
	steps: [
		__(
			'Go to Cloudflare Dashboard > Workers & Pages',
			'altolith-deploy-r2'
		),
		__( 'Select your worker', 'altolith-deploy-r2' ),
		__(
			'Go to Settings > Triggers > Custom Domains',
			'altolith-deploy-r2'
		),
		__( 'Click "Add Custom Domain"', 'altolith-deploy-r2' ),
		__( 'Enter your domain and confirm', 'altolith-deploy-r2' ),
	],
	note: __(
		'Ensure the domain is on the same Cloudflare account and proxied through Cloudflare (orange cloud).',
		'altolith-deploy-r2'
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
