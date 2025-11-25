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
		'^@aether/base/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/$1'
		),
		'^@aether/utils/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/utils/$1'
		),
		'^@aether/utils$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/utils'
		),
		'^@aether/components/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/components/$1'
		),
		'^@aether/components$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/components'
		),
		'^@aether/hooks/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/hooks/$1'
		),
		'^@aether/hooks$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/hooks'
		),
		'^@aether/constants/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/constants/$1'
		),
		'^@aether/constants$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/constants'
		),
		'^@aether/contexts/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/contexts/$1'
		),
		'^@aether/contexts$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/contexts'
		),
		'^@aether/services/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/services/$1'
		),
		'^@aether/services$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/services'
		),
		'^@aether/providers/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/providers/$1'
		),
		'^@aether/providers$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/providers'
		),
		'^@aether/publish/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/publish/$1'
		),
		'^@aether/publish$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/publish'
		),
		'^@aether/admin/(.*)$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/admin-settings/$1'
		),
		'^@aether/admin$': path.resolve(
			__dirname,
			'../aether-site-exporter/assets/src/admin-settings'
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
