/**
 * GitLab Pages Provider
 *
 * JavaScript implementation of the GitLab Pages provider.
 * Provides GitLab Pages static site hosting.
 * Extends GitLabProvider to inherit Git-based storage functionality.
 *
 * @package
 */

import { __ } from '@wordpress/i18n';
import { GitLabProvider } from '../gitlab/GitLabProvider';

// Import from parent plugin's SDK (exposed as window.AetherProviderSDK)
const { ConfigFieldBuilder, DEPLOYMENT_TYPES } = window.AetherProviderSDK || {};

/**
 * GitLabPagesProvider class
 *
 * Provides GitLab Pages static site hosting.
 * Extends GitLabProvider to inherit Git-based storage functionality.
 * Uses GitLab API and isomorphic-git for browser-based deployment.
 */
export class GitLabPagesProvider extends GitLabProvider {
	/**
	 * Provider ID constant.
	 *
	 * @type {string}
	 */
	static ID = 'gitlab-pages';

	/**
	 * Get supported deployment types.
	 *
	 * GitLab Pages supports static sites only (not blueprint bundles).
	 * Overrides parent GitLabProvider which supports both.
	 *
	 * @return {Array<string>} Supported deployment types
	 */
	getSupportedDeploymentTypes() {
		const SDK = window.AetherProviderSDK;
		const types = SDK?.DEPLOYMENT_TYPES || {};
		return [ types.STATIC_SITE ];
	}

	/**
	 * Get the unique provider identifier.
	 *
	 * @return {string} Provider ID
	 */
	getId() {
		return this.registeredId || GitLabPagesProvider.ID;
	}

	/**
	 * Get the base provider name without experimental suffix.
	 *
	 * @return {string} Base provider name
	 */
	getBaseName() {
		return __( 'GitLab Pages', 'aether' );
	}

	/**
	 * Get the human-readable provider name.
	 *
	 * @return {string} Provider name
	 */
	getName() {
		return super.getName();
	}

	/**
	 * Get the provider type.
	 *
	 * @return {string} Provider type
	 */
	getType() {
		return 'git-hosting';
	}

	/**
	 * Get the provider description.
	 *
	 * @return {string} Provider description
	 */
	getDescription() {
		return __(
			'GitLab Pages static site hosting with automatic CI/CD pipelines. Uses GitLab API and isomorphic-git for browser-based deployment.',
			'aether'
		);
	}

	/**
	 * Get the provider icon.
	 *
	 * @return {string} Provider icon
	 */
	getIcon() {
		return '🦊';
	}

	/**
	 * Get configuration fields for this provider.
	 *
	 * Includes all fields from GitLabProvider plus Pages-specific fields.
	 *
	 * @return {Array<Object>} Array of field definitions
	 */
	getProviderSpecificConfigFields() {
		// Get base fields from GitLabProvider (already built)
		const baseFields = super.getProviderSpecificConfigFields();

		// Add Pages-specific fields
		const SDK = window.AetherProviderSDK;
		const builder = SDK?.ConfigFieldBuilder;
		if ( ! builder ) {
			throw new Error(
				'ConfigFieldBuilder is not available. Make sure AetherProviderSDK is loaded.'
			);
		}
		const pagesFields = builder.buildAll( [
			builder.checkbox( 'pages_enabled' )
				.label( __( 'Enable GitLab Pages', 'aether' ) )
				.description(
					__(
						'Enable static site hosting via GitLab Pages',
						'aether'
					)
				)
				.default( true ),

			builder.url( 'pages_url' )
				.label( __( 'GitLab Pages URL (Optional)', 'aether' ) )
				.description(
					__(
						'Auto-detected if namespace provided (e.g., https://namespace.gitlab.io/project)',
						'aether'
					)
				),

			builder.url( 'custom_domain' )
				.label( __( 'Custom Domain (Optional)', 'aether' ) )
				.description(
					__(
						'Custom domain for GitLab Pages (e.g., https://www.example.com)',
						'aether'
					)
				),
		] );

		// Combine base fields and Pages-specific fields
		return [ ...baseFields, ...pagesFields ];
	}

	/**
	 * Deploy to GitLab Pages.
	 *
	 * @return {Promise<Object>} Deployment result
	 */
	async deploy() {
		const configured = await this.isConfigured();
		if ( ! configured ) {
			return {
				success: false,
				message: __(
					'Cannot deploy: provider is not configured.',
					'aether'
				),
			};
		}

		return {
			success: true,
			message: __(
				'GitLab Pages deployment is automatic when files are pushed to the repository.',
				'aether'
			),
		};
	}

	/**
	 * Get provider status.
	 *
	 * @return {Promise<Object>} Status object
	 */
	async getStatus() {
		const status = await super.getStatus();

		const config = await this.getConfig();
		status.pages_enabled = Boolean( config.pages_enabled );
		status.hasCustomDomain = Boolean( config.custom_domain );
		status.supportsBrowserGit = Boolean( config.git_worker_url );

		return status;
	}
}

export default GitLabPagesProvider;
