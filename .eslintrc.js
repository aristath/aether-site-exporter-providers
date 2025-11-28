const path = require( 'path' );

module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	overrides: [
		{
			// Allow imports from base plugin in provider files
			files: [ 'assets/src/providers/**/*.js' ],
			rules: {
				'import/no-extraneous-dependencies': 'off', // Base plugin is a peer dependency, resolved at build time
			},
		},
	],
	rules: {
		// Disable import resolution errors for webpack aliases and cross-plugin imports
		// These are resolved at build time by webpack
		'import/no-unresolved': [
			'error',
			{
				ignore: [
					'@altolith/base/.*', // Webpack alias
					'@altolith/providers/.*', // Webpack alias
					'@altolith/utils/.*', // Webpack alias
					'@altolith/components/.*', // Webpack alias
					'@altolith/hooks/.*', // Webpack alias
					'@altolith/constants/.*', // Webpack alias
					'@altolith/contexts/.*', // Webpack alias
					'@altolith/services/.*', // Webpack alias
					'@altolith/publish/.*', // Webpack alias
					'@altolith/admin/.*', // Webpack alias
					'../contexts/.*', // Context imports from base plugin
					'../../base/.*', // Base provider imports in test files
					'../configFieldBuilder', // ConfigFieldBuilder from base plugin
				],
			},
		],
		// Allow imports from base plugin (altolith-deploy)
		// This is a separate plugin that depends on the base plugin
		// Imports from @altolith/* are resolved at build time by webpack
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/__tests__/**',
					'**/*.test.js',
					'**/*.spec.js',
					'**/jest.config.js',
					'**/webpack.config.js',
					'**/babel.config.js',
				],
			},
		],
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					// Webpack aliases for base plugin
					[
						'@altolith/base',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src'
						),
					],
					[
						'@altolith/providers',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/providers'
						),
					],
					[
						'@altolith/utils',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/utils'
						),
					],
					[
						'@altolith/components',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/components'
						),
					],
					[
						'@altolith/hooks',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/hooks'
						),
					],
					[
						'@altolith/constants',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/constants'
						),
					],
					[
						'@altolith/contexts',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/contexts'
						),
					],
					[
						'@altolith/services',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/services'
						),
					],
					[
						'@altolith/publish',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/publish'
						),
					],
					[
						'@altolith/admin',
						path.resolve(
							__dirname,
							'../altolith-deploy/assets/src/admin-settings'
						),
					],
				],
				extensions: [ '.js', '.jsx', '.json' ],
			},
		},
	},
};
