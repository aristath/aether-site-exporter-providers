const path = require( 'path' );

module.exports = {
	testEnvironment: 'jsdom',
	roots: [ '<rootDir>/tests/js', '<rootDir>/assets/src' ],
	testMatch: [
		'**/__tests__/**/*.js',
		'**/?(*.)+(spec|test).js',
		'**/__tests__/**/*.jsx',
		'**/?(*.)+(spec|test).jsx',
	],
	collectCoverageFrom: [
		'assets/src/**/*.{js,jsx}',
		'!assets/src/**/*.test.{js,jsx}',
		'!assets/src/**/__tests__/**',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
	coverageDirectory: 'coverage/js',
	coverageReporters: [ 'text', 'lcov', 'html' ],
	setupFilesAfterEnv: [ '<rootDir>/tests/js/setup.js' ],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'^@altolith/base/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/$1'
		),
		'^@altolith/utils/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/utils/$1'
		),
		'^@altolith/utils$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/utils'
		),
		'^@altolith/components/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/components/$1'
		),
		'^@altolith/components$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/components'
		),
		'^@altolith/hooks/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/hooks/$1'
		),
		'^@altolith/hooks$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/hooks'
		),
		'^@altolith/constants/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/constants/$1'
		),
		'^@altolith/constants$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/constants'
		),
		'^@altolith/contexts/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/contexts/$1'
		),
		'^@altolith/contexts$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/contexts'
		),
		'^@altolith/services/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/services/$1'
		),
		'^@altolith/services$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/services'
		),
		'^@altolith/providers/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/providers/$1'
		),
		'^@altolith/providers$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/providers'
		),
		'^@altolith/publish/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/publish/$1'
		),
		'^@altolith/publish$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/publish'
		),
		'^@altolith/admin/(.*)$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/admin-settings/$1'
		),
		'^@altolith/admin$': path.resolve(
			__dirname,
			'../altolith-deploy/assets/src/admin-settings'
		),
	},
	transform: {
		'^.+\\.(js|jsx)$': [
			'babel-jest',
			{ configFile: './babel.config.js' },
		],
	},
	transformIgnorePatterns: [
		'node_modules/(?!(p-retry|retry|is-network-error|parse5)/)',
	],
	globals: {
		wpApiSettings: {
			root: 'http://localhost/wp-json/',
			nonce: 'test-nonce',
		},
	},
	// Memory optimization settings
	maxWorkers: 1,
	workerIdleMemoryLimit: '512MB',
	testTimeout: 10000,
};
