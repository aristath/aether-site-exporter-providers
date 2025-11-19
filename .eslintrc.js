const path = require( 'path' );

module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	rules: {
		// Disable import resolution errors for webpack aliases and cross-plugin imports
		// These are resolved at build time by webpack
		'import/no-unresolved': [
			'error',
			{
				ignore: [
					'@aether/base/.*', // Webpack alias
					'../contexts/.*', // Context imports from base plugin
					'../../base/.*', // Base provider imports in test files
					'../configFieldBuilder', // ConfigFieldBuilder from base plugin
				],
			},
		],
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					// Webpack alias for base plugin
					[
						'@aether/base',
						path.resolve(
							__dirname,
							'../aether-site-exporter/assets/src'
						),
					],
				],
				extensions: [ '.js', '.jsx', '.json' ],
			},
		},
	},
};
