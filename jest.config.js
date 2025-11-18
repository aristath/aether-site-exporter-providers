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
