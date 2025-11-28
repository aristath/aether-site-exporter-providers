const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
// eslint-disable-next-line import/no-extraneous-dependencies
const { RawSource } = require( 'webpack-sources' );

// Allow disabling minification via environment variable for easier debugging
const shouldMinify = process.env.MINIFY === 'true';

// Plugin to remove source map references from node_modules
class RemoveSourceMapPlugin {
	apply( compiler ) {
		compiler.hooks.compilation.tap(
			'RemoveSourceMapPlugin',
			( compilation ) => {
				compilation.hooks.processAssets.tap(
					{
						name: 'RemoveSourceMapPlugin',
						stage: compilation.constructor
							.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
					},
					() => {
						compilation.chunks.forEach( ( chunk ) => {
							chunk.files.forEach( ( filename ) => {
								if ( filename.endsWith( '.js' ) ) {
									const asset =
										compilation.getAsset( filename );
									if ( asset ) {
										const sourceObj = asset.source;
										let source =
											typeof sourceObj === 'string'
												? sourceObj
												: sourceObj.source();

										// Remove source map references
										source = source.replace(
											/\/\/# sourceMappingURL=[^\n]*\.map$/gm,
											''
										);

										compilation.updateAsset(
											filename,
											new RawSource( source )
										);
									}
								}
							} );
						} );
					}
				);
			}
		);
	}
}

module.exports = {
	...defaultConfig,
	entry: {
		'provider-cloudflare-r2':
			'./assets/src/providers/cloudflare-r2/index.js',
	},
	output: {
		...defaultConfig.output,
		path: require( 'path' ).resolve( __dirname, 'assets/build' ),
		publicPath: '',
		chunkFilename: undefined,
	},
	optimization: {
		...defaultConfig.optimization,
		minimize: shouldMinify,
		splitChunks: false,
		runtimeChunk: false,
		moduleIds: 'deterministic',
	},
	performance: {
		maxAssetSize: 500000, // 500 KiB
		maxEntrypointSize: 500000, // 500 KiB
		hints: 'warning',
	},
	module: {
		...defaultConfig.module,
		parser: {
			...defaultConfig.module?.parser,
			javascript: {
				...defaultConfig.module?.parser?.javascript,
				dynamicImportMode: 'eager',
			},
		},
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve?.alias,
			// Allow importing from base plugin's source
			'@altolith/base': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src'
			),
			// Mirror base plugin's aliases so transitive imports resolve correctly
			'@altolith/utils': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/utils'
			),
			'@altolith/components': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/components'
			),
			'@altolith/hooks': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/hooks'
			),
			'@altolith/constants': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/constants'
			),
			'@altolith/contexts': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/contexts'
			),
			'@altolith/services': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/services'
			),
			'@altolith/providers': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/providers'
			),
			'@altolith/publish': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/publish'
			),
			'@altolith/admin': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/admin-settings'
			),
			'@altolith/profiles': require( 'path' ).resolve(
				__dirname,
				'../altolith-deploy/assets/src/profiles'
			),
		},
	},
	externals: ( { request }, callback ) => {
		// Externalize WordPress packages
		const wpPackages = {
			react: 'React',
			'react-dom': 'ReactDOM',
			'@wordpress/element': 'window.wp.element',
			'@wordpress/components': 'window.wp.components',
			'@wordpress/hooks': 'window.wp.hooks',
			'@wordpress/i18n': 'window.wp.i18n',
			'@wordpress/api-fetch': 'window.wp.apiFetch',
			'@wordpress/icons': 'window.wp.icons',
		};

		if ( wpPackages[ request ] ) {
			return callback( null, wpPackages[ request ] );
		}

		// Don't externalize anything else - let webpack handle it normally
		callback();
	},
	plugins: [ ...defaultConfig.plugins, new RemoveSourceMapPlugin() ],
};
