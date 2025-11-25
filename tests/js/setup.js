/**
 * Jest setup file
 *
 * Sets up the testing environment for JavaScript tests.
 *
 * @package
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
import React from 'react';

// Mock WordPress global functions and objects
global.wp = {
	element: {
		createElement: jest.fn(),
		Fragment: jest.fn(),
		useState: jest.fn(),
		useEffect: jest.fn(),
		useCallback: jest.fn(),
		useMemo: jest.fn(),
		useRef: jest.fn(),
		createRoot: jest.fn( () => ( {
			render: jest.fn(),
			unmount: jest.fn(),
		} ) ),
	},
	components: {
		Button: jest.fn( ( props ) => {
			const { children, ...rest } = props;
			return <button { ...rest }>{ children }</button>;
		} ),
		Notice: jest.fn(),
		TextControl: jest.fn(),
		CheckboxControl: jest.fn(),
		SelectControl: jest.fn(),
		Spinner: jest.fn( ( props ) => (
			<div data-testid="spinner" { ...props } />
		) ),
		Modal: jest.fn(),
		Card: jest.fn(),
		CardBody: jest.fn(),
		CardHeader: jest.fn(),
	},
	hooks: {
		addAction: jest.fn(),
		addFilter: jest.fn(),
		doAction: jest.fn(),
		applyFilters: jest.fn(),
		removeAction: jest.fn(),
		removeFilter: jest.fn(),
	},
	i18n: {
		__: jest.fn( ( text ) => text ),
		_x: jest.fn( ( text ) => text ),
		_n: jest.fn( ( single ) => single ),
		sprintf: jest.fn( ( format, ...args ) => {
			let result = format;
			args.forEach( ( arg, index ) => {
				result = result.replace( `%${ index + 1 }$s`, arg );
				result = result.replace( '%s', arg );
				result = result.replace( '%d', arg );
			} );
			return result;
		} ),
	},
	apiFetch: jest.fn( () => Promise.resolve( {} ) ),
};

// Mock window.wpApiSettings
global.wpApiSettings = {
	root: 'http://localhost/wp-json/',
	nonce: 'test-nonce',
};

// Mock fetch
global.fetch = jest.fn( () =>
	Promise.resolve( {
		ok: true,
		json: () => Promise.resolve( {} ),
		text: () => Promise.resolve( '' ),
		blob: () => Promise.resolve( new Blob() ),
	} )
);

// Mock IndexedDB
const mockIndexedDB = {
	open: jest.fn( () => ( {
		result: {
			createObjectStore: jest.fn(),
			transaction: jest.fn( () => ( {
				objectStore: jest.fn( () => ( {
					put: jest.fn( () => ( {
						onsuccess: null,
						onerror: null,
					} ) ),
					get: jest.fn( () => ( {
						onsuccess: null,
						onerror: null,
					} ) ),
					delete: jest.fn( () => ( {
						onsuccess: null,
						onerror: null,
					} ) ),
					clear: jest.fn( () => ( {
						onsuccess: null,
						onerror: null,
					} ) ),
				} ) ),
			} ) ),
		},
		onupgradeneeded: null,
		onsuccess: null,
		onerror: null,
	} ) ),
	deleteDatabase: jest.fn(),
};

global.indexedDB = mockIndexedDB;

// Mock localStorage
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock console methods to reduce test noise
global.console = {
	...console,
	log: jest.fn(),
	error: jest.fn(),
	warn: jest.fn(),
	info: jest.fn(),
};

// Polyfill Blob.arrayBuffer for jsdom (not supported natively)
if ( ! Blob.prototype.arrayBuffer ) {
	Blob.prototype.arrayBuffer = function () {
		return new Promise( ( resolve, reject ) => {
			const reader = new FileReader();
			reader.onload = () => resolve( reader.result );
			reader.onerror = () => reject( reader.error );
			reader.readAsArrayBuffer( this );
		} );
	};
}

// Polyfill Blob.text for jsdom (not supported natively)
if ( ! Blob.prototype.text ) {
	Blob.prototype.text = function () {
		return new Promise( ( resolve, reject ) => {
			const reader = new FileReader();
			reader.onload = () => resolve( reader.result );
			reader.onerror = () => reject( reader.error );
			reader.readAsText( this );
		} );
	};
}
