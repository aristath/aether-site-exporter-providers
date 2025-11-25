/**
 * GitLab Pages Provider
 *
 * Static metadata class for the GitLab Pages provider.
 * All logic is handled via hooks in index.js.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';

/**
 * GitLabPagesProvider class
 *
 * Provides GitLab Pages static site hosting.
 * This is a static metadata class - all operational logic is in index.js.
 */
export class GitLabPagesProvider {
	/**
	 * Provider ID constant.
	 *
	 * @type {string}
	 */
	static ID = 'gitlab-pages';

	/**
	 * Provider name.
	 *
	 * @type {string}
	 */
	static NAME = __( 'GitLab Pages (Experimental)', 'aether' );

	/**
	 * Provider type.
	 *
	 * @type {string}
	 */
	static TYPE = 'git-hosting';

	/**
	 * Provider description.
	 *
	 * @type {string}
	 */
	static DESCRIPTION = __(
		'GitLab Pages static site hosting with automatic CI/CD pipelines. Uses GitLab API for browser-based deployment.',
		'aether'
	);

	/**
	 * Provider icon.
	 *
	 * @type {string}
	 */
	static ICON = '🦊';

	/**
	 * Deployment type this provider supports.
	 *
	 * @type {string}
	 */
	static DEPLOYMENT_TYPE = 'static_site';

	/**
	 * Configuration fields.
	 *
	 * @type {Array<Object>}
	 */
	static CONFIG_FIELDS = [
		{
			id: 'personal_access_token',
			label: __( 'Personal Access Token', 'aether' ),
			type: 'text',
			required: true,
			sensitive: true,
			help: __(
				'GitLab Personal Access Token with api and write_repository scopes',
				'aether'
			),
		},
		{
			id: 'project_id',
			label: __( 'Project ID', 'aether' ),
			type: 'text',
			required: true,
			sensitive: false,
			validation: {
				pattern: '^\\d+$',
				message: __( 'Project ID must be a numeric value', 'aether' ),
			},
		},
		{
			id: 'namespace',
			label: __( 'Namespace', 'aether' ),
			type: 'text',
			required: false,
			sensitive: false,
			help: __(
				'GitLab namespace (username or group) for the repository',
				'aether'
			),
		},
		{
			id: 'project_path',
			label: __( 'Project Path', 'aether' ),
			type: 'text',
			required: false,
			sensitive: false,
			help: __( 'Repository name/path within the namespace', 'aether' ),
		},
		{
			id: 'branch',
			label: __( 'Branch', 'aether' ),
			type: 'text',
			required: false,
			sensitive: false,
			default: 'main',
			help: __( 'Git branch to push to', 'aether' ),
		},
		{
			id: 'pages_url',
			label: __( 'Pages URL', 'aether' ),
			type: 'url',
			required: false,
			sensitive: false,
			help: __( 'Custom GitLab Pages URL', 'aether' ),
		},
		{
			id: 'custom_domain',
			label: __( 'Custom Domain', 'aether' ),
			type: 'url',
			required: false,
			sensitive: false,
			isAdvanced: true,
		},
	];
}

export default GitLabPagesProvider;
