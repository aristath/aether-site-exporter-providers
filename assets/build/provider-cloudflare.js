/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

;// external ["wp","hooks"]
const external_wp_hooks_namespaceObject = window["wp"]["hooks"];
;// external ["wp","element"]
const external_wp_element_namespaceObject = window["wp"]["element"];
;// external ["wp","components"]
const external_wp_components_namespaceObject = window["wp"]["components"];
;// external ["wp","i18n"]
const external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// ./assets/src/utils/styles.js
/**
 * Shared style utilities and constants
 *
 * Centralized styles for inline styling across components.
 *
 * @package
 */

const colors = {
  primary: '#2271b1',
  primaryHover: '#135e96',
  primaryDark: '#0a4168',
  text: '#1d2327',
  textMuted: '#646970',
  textSecondary: '#50575e',
  white: '#fff',
  background: '#f6f7f7',
  backgroundLighter: '#f0f0f1',
  backgroundError: '#fcf0f1',
  borderLight: '#c3c4c7',
  borderLighter: '#e0e0e0',
  error: '#d63638',
  success: '#00a32a',
  warning: '#dba617',
  info: '#2271b1'
};
const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1.25rem',
  xl: '1.5rem',
  '2xl': '2rem'
};
const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '9999px'
};
const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem'
};
const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};
const commonStyles = {
  section: {
    background: colors.white,
    border: `1px solid ${colors.borderLight}`,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.04)',
    marginBottom: spacing.lg,
    padding: 0
  },
  sectionHeader: {
    borderBottom: `1px solid ${colors.borderLight}`,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    background: colors.background
  },
  card: {
    background: colors.white,
    border: `1px solid ${colors.borderLight}`,
    borderRadius: borderRadius.sm,
    padding: spacing.lg
  }
};
const statusBadgeStyles = {
  base: {
    display: 'inline-block',
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    borderRadius: borderRadius.sm,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  success: {
    background: '#d5f0dd',
    color: '#00833e'
  },
  error: {
    background: '#fcf0f1',
    color: '#c22c2e'
  },
  warning: {
    background: '#fcf0c7',
    color: '#826200'
  },
  info: {
    background: '#d7edff',
    color: '#135e96'
  }
};
const noticeStyles = {
  base: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    marginBottom: spacing.md,
    borderLeft: '4px solid',
    background: colors.white
  },
  success: {
    borderLeftColor: colors.success,
    background: '#d5f0dd'
  },
  error: {
    borderLeftColor: colors.error,
    background: colors.backgroundError
  },
  warning: {
    borderLeftColor: colors.warning,
    background: '#fcf0c7'
  },
  info: {
    borderLeftColor: colors.info,
    background: '#d7edff'
  }
};

/**
 * Create flexbox style object
 *
 * @param {string} direction Flex direction ('row' or 'column')
 * @param {string} gap       Gap spacing
 * @return {Object} Style object
 */
const createFlexStyle = (direction = 'row', gap = spacing.md) => ({
  display: 'flex',
  flexDirection: direction,
  gap
});

/**
 * Create grid style object
 *
 * @param {string} minColumnWidth Minimum column width
 * @param {string} gap            Gap spacing
 * @return {Object} Style object
 */
const createGridStyle = (minColumnWidth = '16rem', gap = spacing.md) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
  gap
});

/**
 * Common utility styles
 */
const utilityStyles = {
  noMargin: {
    margin: 0
  },
  noMarginTop: {
    marginTop: 0
  },
  noMarginBottom: {
    marginBottom: 0
  }
};
;// external "ReactJSXRuntime"
const external_ReactJSXRuntime_namespaceObject = window["ReactJSXRuntime"];
;// ./assets/src/components/SecretField.js
/**
 * Secret Field Component
 *
 * Replaces the aether-secret web component with a React component.
 *
 * @package
 */






function SecretField({
  value = '',
  onChange,
  label,
  help,
  placeholder,
  ...props
}) {
  const [isVisible, setIsVisible] = (0,external_wp_element_namespaceObject.useState)(false);
  const containerStyle = {
    position: 'relative'
  };
  const toggleStyle = {
    marginTop: spacing.sm
  };
  return /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)("div", {
    className: "aether-secret-field",
    style: containerStyle,
    children: [/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      className: "aether-secret-field__input",
      label: label,
      help: help,
      value: value,
      onChange: onChange,
      type: isVisible ? 'text' : 'password',
      placeholder: placeholder,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      ...props
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.Button, {
      className: "aether-secret-field__toggle",
      variant: "secondary",
      onClick: () => setIsVisible(!isVisible),
      style: toggleStyle,
      children: isVisible ? (0,external_wp_i18n_namespaceObject.__)('Hide', 'aether-site-exporter') : (0,external_wp_i18n_namespaceObject.__)('Show', 'aether-site-exporter')
    })]
  });
}
;// external ["wp","apiFetch"]
const external_wp_apiFetch_namespaceObject = window["wp"]["apiFetch"];
var external_wp_apiFetch_default = /*#__PURE__*/__webpack_require__.n(external_wp_apiFetch_namespaceObject);
;// ./assets/src/utils/getRestUrl.js
/**
 * Get REST API URL Utility
 *
 * Reads the REST API base URL from the meta tag or returns a default.
 * This ensures WordPress Playground scoped URLs work correctly.
 *
 * @package
 */

/**
 * Get REST API URL from meta tag or default.
 *
 * @return {string} REST API base URL.
 */
function getRestUrl() {
  const metaTag = document.querySelector('meta[name="aether-rest-url"]');
  if (metaTag) {
    return metaTag.getAttribute('content') || '/wp-json/aether/site-exporter/';
  }
  return '/wp-json/aether/site-exporter/';
}
;// ./assets/src/utils/api.js
/**
 * API Fetch Utility
 *
 * Enhanced wrapper around @wordpress/api-fetch with:
 * - Request deduplication (prevents concurrent identical requests)
 * - Response caching with TTL (GET requests only)
 * - Nonce handling from meta tags
 * - Auth header utilities for external APIs
 *
 * @package
 */




/**
 * Create authorization headers for external API calls.
 *
 * Utility for building consistent Authorization headers.
 *
 * @param {string} token API token or key.
 * @param {string} type  Auth type (default: 'Bearer').
 * @return {Object} Headers object with Authorization and Content-Type.
 */
function api_createAuthHeaders(token, type = 'Bearer') {
  return {
    Authorization: `${type} ${token}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Get REST API nonce from meta tag or default.
 *
 * @return {string} REST API nonce.
 */
function getNonce() {
  const metaTag = document.querySelector('meta[name="aether-rest-nonce"]');
  if (metaTag) {
    return metaTag.getAttribute('content') || '';
  }
  return '';
}

/**
 * Request deduplication middleware
 *
 * Prevents concurrent identical requests by returning the same Promise
 * for duplicate in-flight requests.
 *
 * Uses request key (method + path + data) to identify duplicates.
 */
const pendingRequests = new Map();
function createRequestKey(options) {
  const method = options.method || 'GET';
  const path = options.path || '';
  const data = options.data ? JSON.stringify(options.data) : '';
  return `${method}:${path}:${data}`;
}
const requestDeduplicationMiddleware = (options, next) => {
  const requestKey = createRequestKey(options);

  // Check if this request is already in flight
  if (pendingRequests.has(requestKey)) {
    // Return the existing Promise
    return pendingRequests.get(requestKey);
  }

  // Make the request
  const promise = next(options);

  // Store the Promise
  pendingRequests.set(requestKey, promise);

  // Clean up when request completes (success or error)
  // Use finally() to guarantee cleanup regardless of outcome
  promise.finally(() => {
    pendingRequests.delete(requestKey);
  });
  return promise;
};

/**
 * Response caching middleware
 *
 * Caches GET request responses with TTL to reduce redundant API calls.
 *
 * Cache format: Map<requestKey, {response, timestamp}>
 * TTL: Configurable per endpoint (default: 5 minutes)
 */
const responseCache = new Map();

// Cache configuration with endpoint-specific TTLs
const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000,
  // 5 minutes default
  endpointTTLs: {
    '/assets': 10 * 60 * 1000,
    // 10 minutes - asset lists change infrequently
    '/settings': 1 * 60 * 1000,
    // 1 minute - settings may change
    '/config': 30 * 60 * 1000,
    // 30 minutes - static configuration
    '/check-wporg': 60 * 60 * 1000 // 60 minutes - WordPress.org data rarely changes
  },
  // Set to true to bypass cache (useful for development/testing)
  bypassCache: false
};

/**
 * Get cache TTL for a specific request path.
 *
 * @param {string} path Request path to check.
 * @return {number} TTL in milliseconds.
 */
function getCacheTTL(path) {
  if (CACHE_CONFIG.bypassCache) {
    return 0;
  }

  // Check if path matches any endpoint-specific TTL
  for (const [endpoint, ttl] of Object.entries(CACHE_CONFIG.endpointTTLs)) {
    if (path && path.includes(endpoint)) {
      return ttl;
    }
  }
  return CACHE_CONFIG.defaultTTL;
}
function isCacheValid(cacheEntry, path) {
  if (!cacheEntry) {
    return false;
  }
  const ttl = getCacheTTL(path);
  if (ttl === 0) {
    // Cache bypass enabled
    return false;
  }
  const age = Date.now() - cacheEntry.timestamp;
  return age < ttl;
}
const responseCachingMiddleware = (options, next) => {
  const method = options.method || 'GET';

  // Only cache GET requests
  if (method !== 'GET') {
    return next(options);
  }
  const requestKey = createRequestKey(options);
  const cached = responseCache.get(requestKey);

  // Return cached response if valid (pass path for TTL calculation)
  if (isCacheValid(cached, options.path)) {
    return Promise.resolve(cached.response);
  }

  // Make the request
  const promise = next(options);

  // Cache successful responses
  promise.then(response => {
    responseCache.set(requestKey, {
      response,
      timestamp: Date.now()
    });
    return response;
  }).catch(error => {
    // Don't cache errors
    throw error;
  });
  return promise;
};

/**
 * Invalidate cache for a specific path or all cached responses
 *
 * @param {string|null} path Optional path to invalidate (invalidates all if not provided)
 */
function invalidateCache(path = null) {
  if (path) {
    // Invalidate all cache entries matching this path
    for (const [key] of responseCache.entries()) {
      if (key.includes(path)) {
        responseCache.delete(key);
      }
    }
  } else {
    // Clear all cache
    responseCache.clear();
  }
}

/**
 * Set the API nonce for authenticated requests.
 *
 * @param {string} nonce WordPress REST API nonce.
 */
function setAPINonce(nonce) {
  external_wp_apiFetch_default().use(external_wp_apiFetch_default().createNonceMiddleware(nonce));
}

/**
 * Configure API fetch with base URL, nonce, and middleware.
 * Automatically fetches from meta tags if not provided.
 *
 * @param {string} restUrl Optional REST API base URL (fetches from meta if not provided).
 * @param {string} nonce   Optional WordPress REST API nonce (fetches from meta if not provided).
 */
function configureAPI(restUrl, nonce) {
  const url = restUrl || getRestUrl();
  const token = nonce || getNonce();
  external_wp_apiFetch_default().use(external_wp_apiFetch_default().createRootURLMiddleware(url));
  if (token) {
    setAPINonce(token);
  }

  // Add custom middleware (order matters: caching before deduplication)
  external_wp_apiFetch_default().use(responseCachingMiddleware);
  external_wp_apiFetch_default().use(requestDeduplicationMiddleware);
}

// Auto-configure on module load.
configureAPI();
/* harmony default export */ const api = ((external_wp_apiFetch_default()));
;// ./assets/src/hooks/useConnectionTest.js
/**
 * Connection Test Hooks
 *
 * Provides direct API calls for testing provider connections from React.
 *
 * @package
 */





/**
 * Hook for testing provider connection (generic).
 *
 * @param {string} providerId Provider ID.
 * @param {Object} config     Provider configuration.
 * @return {Object} Test methods and state.
 */
function useConnectionTest(providerId, config) {
  const [testing, setTesting] = (0,external_wp_element_namespaceObject.useState)(false);
  const [result, setResult] = (0,external_wp_element_namespaceObject.useState)(null);
  const test = (0,external_wp_element_namespaceObject.useCallback)(async () => {
    setTesting(true);
    setResult(null);
    try {
      // Use REST API endpoint to test connection
      const response = await api({
        path: `/aether/site-exporter/providers/${providerId}/test`,
        method: 'POST',
        data: {
          config
        }
      });
      if (!response.success) {
        throw new Error(response.message || response.error || (0,external_wp_i18n_namespaceObject.__)('Connection test failed', 'aether-site-exporter'));
      }
      setResult({
        success: true,
        message: response.message || (0,external_wp_i18n_namespaceObject.__)('Connection test successful', 'aether-site-exporter')
      });
    } catch (err) {
      setResult({
        success: false,
        message: err.message || (0,external_wp_i18n_namespaceObject.__)('Connection test failed', 'aether-site-exporter')
      });
    } finally {
      setTesting(false);
    }
  }, [providerId, config]);
  return {
    test,
    testing,
    result
  };
}
;// ./assets/src/utils/errorParser.js
/**
 * Error Response Parser Utility
 *
 * Centralized error response parsing for API calls.
 * Handles multiple error response formats (generic, plain text).
 *
 * @package
 */

/**
 * Parse error response from various API formats.
 *
 * Handles:
 * - API format with array of errors: { errors: [{ message: "..." }] }
 * - Generic format: { error: "..." }
 * - Message format: { message: "..." }
 * - Plain text responses
 *
 * @param {string} responseText   Raw response text (may be JSON or plain text).
 * @param {string} defaultMessage Default message if parsing fails.
 * @return {string} Parsed error message.
 */
function parseErrorResponse(responseText, defaultMessage) {
  if (!responseText) {
    return defaultMessage;
  }
  try {
    const data = JSON.parse(responseText);

    // Handle API format with errors array: { errors: [{ message: "..." }] }
    if (data.errors && Array.isArray(data.errors)) {
      if (data.errors.length > 0 && data.errors[0].message) {
        return data.errors[0].message;
      }
    }

    // Handle generic error format: { error: "..." }
    if (data.error) {
      return typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
    }

    // Handle message format: { message: "..." }
    if (data.message) {
      return data.message;
    }

    // If JSON parsed but no recognized format, return default
    return defaultMessage;
  } catch (e) {
    // Not valid JSON, treat as plain text
    return responseText || defaultMessage;
  }
}

/**
 * Parse error response with HTTP status context.
 *
 * Includes HTTP status code in error message if available.
 *
 * @param {string} responseText Raw response text.
 * @param {number} statusCode   HTTP status code.
 * @param {string} operation    Operation name (e.g., "Worker deployment").
 * @return {string} Formatted error message with context.
 */
function errorParser_parseErrorResponseWithStatus(responseText, statusCode, operation) {
  const errorMessage = parseErrorResponse(responseText, `${operation} failed`);

  // Add status code context if available and not already in message
  if (statusCode && !errorMessage.includes(statusCode.toString())) {
    return `${errorMessage} (HTTP ${statusCode})`;
  }
  return errorMessage;
}
;// ./assets/src/utils/standardResponse.js
/**
 * Standard Response Format Utility
 *
 * Provides standardized response object format for all API operations.
 * Eliminates inconsistent response structures across the codebase.
 *
 * Standard format:
 * {
 *   success: boolean,
 *   data?: any,           // Success data
 *   error?: string,       // Single error message
 *   errors?: string[]     // Multiple errors (optional)
 * }
 *
 * @package
 */

/**
 * Create a success response.
 *
 * @param {*}      data    Success data (can be any type).
 * @param {string} message Optional success message.
 * @return {Object} Standardized success response.
 */
function standardResponse_createSuccessResponse(data = null, message = null) {
  const response = {
    success: true,
    data
  };

  // Add message to data if provided
  if (message && typeof data === 'object' && data !== null) {
    response.data = {
      ...data,
      message
    };
  } else if (message) {
    response.data = {
      message
    };
  }
  return response;
}

/**
 * Create an error response.
 *
 * @param {string|Error} error  Error message or Error object.
 * @param {Array}        errors Optional array of multiple errors.
 * @return {Object} Standardized error response.
 */
function standardResponse_createErrorResponse(error, errors = null) {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error';
  const response = {
    success: false,
    error: errorMessage
  };
  if (errors && Array.isArray(errors) && errors.length > 0) {
    response.errors = errors;
  }
  return response;
}

/**
 * Normalize a response to standard format.
 *
 * Takes various response formats and converts to standard format.
 * Handles legacy formats for migration.
 *
 * @param {Object} response Response to normalize.
 * @return {Object} Normalized response in standard format.
 */
function normalizeResponse(response) {
  // Already in standard format
  if (response && typeof response.success === 'boolean' && (response.data !== undefined || response.error !== undefined)) {
    return response;
  }

  // Legacy format with error field
  if (response && response.error) {
    return standardResponse_createErrorResponse(response.error, response.errors);
  }

  // Legacy format with success=true but no data field
  if (response && response.success === true) {
    // Extract data from non-standard fields
    const {
      success,
      error,
      errors,
      ...data
    } = response;
    return standardResponse_createSuccessResponse(data);
  }

  // Legacy format with success=false
  if (response && response.success === false) {
    return standardResponse_createErrorResponse(response.message || response.error || 'Operation failed', response.errors);
  }

  // Fallback for unknown format
  return response;
}

/**
 * Check if response indicates success.
 *
 * @param {Object} response Response object.
 * @return {boolean} True if successful.
 */
function isSuccessResponse(response) {
  return response?.success === true;
}

/**
 * Check if response indicates error.
 *
 * @param {Object} response Response object.
 * @return {boolean} True if error.
 */
function isErrorResponse(response) {
  return response?.success === false;
}

/**
 * Get data from response.
 *
 * @param {Object} response Response object.
 * @param {*}      fallback Fallback value if no data.
 * @return {*} Response data or fallback.
 */
function getResponseData(response, fallback = null) {
  if (isSuccessResponse(response)) {
    // Return data even if it's null (null is valid data)
    return 'data' in response ? response.data : fallback;
  }
  return fallback;
}

/**
 * Get error from response.
 *
 * @param {Object} response     Response object.
 * @param {string} defaultError Default error message.
 * @return {string} Error message.
 */
function getResponseError(response, defaultError = 'Unknown error') {
  if (isErrorResponse(response)) {
    return response.error || defaultError;
  }
  return defaultError;
}

/**
 * Get all errors from response.
 *
 * @param {Object} response Response object.
 * @return {Array<string>} Array of error messages.
 */
function getResponseErrors(response) {
  if (isErrorResponse(response)) {
    const errors = [];
    if (response.error) {
      errors.push(response.error);
    }
    if (response.errors && Array.isArray(response.errors)) {
      errors.push(...response.errors);
    }
    return errors;
  }
  return [];
}
;// ./assets/src/utils/debug.js
/**
 * Debug Utility
 *
 * Centralized logging utility for development debugging.
 * Can be enabled/disabled via window.aetherDebug flag.
 *
 * @package
 */

/**
 * Check if debug mode is enabled.
 *
 * @return {boolean} True if debug mode is enabled.
 */
function isDebugEnabled() {
  return typeof window !== 'undefined' && window.aetherDebug === true;
}

/**
 * Log a message to console (only in debug mode).
 *
 * @param {...*} args Arguments to log.
 */
function debug(...args) {
  if (isDebugEnabled() && window.console && window.console.log) {
    window.console.log('[Aether]', ...args);
  }
}

/**
 * Log an error to console (only in debug mode).
 *
 * @param {...*} args Arguments to log.
 */
function debugError(...args) {
  if (isDebugEnabled() && window.console && window.console.error) {
    window.console.error('[Aether Error]', ...args);
  }
}

/**
 * Log a warning to console (only in debug mode).
 *
 * @param {...*} args Arguments to log.
 */
function debugWarn(...args) {
  if (isDebugEnabled() && window.console && window.console.warn) {
    window.console.warn('[Aether Warning]', ...args);
  }
}

/**
 * Log an info message to console (only in debug mode).
 *
 * @param {...*} args Arguments to log.
 */
function debugInfo(...args) {
  if (isDebugEnabled() && window.console && window.console.info) {
    window.console.info('[Aether Info]', ...args);
  }
}

/**
 * Log a table to console (only in debug mode).
 *
 * @param {*} data Data to display as table.
 */
function debugTable(data) {
  if (isDebugEnabled() && window.console && window.console.table) {
    window.console.table(data);
  }
}

/**
 * Start a performance timer (only in debug mode).
 *
 * @param {string} label Timer label.
 */
function debugTime(label) {
  if (isDebugEnabled() && window.console && window.console.time) {
    window.console.time(`[Aether] ${label}`);
  }
}

/**
 * End a performance timer (only in debug mode).
 *
 * @param {string} label Timer label.
 */
function debugTimeEnd(label) {
  if (isDebugEnabled() && window.console && window.console.timeEnd) {
    window.console.timeEnd(`[Aether] ${label}`);
  }
}

/**
 * Group console messages (only in debug mode).
 *
 * @param {string} label Group label.
 */
function debugGroup(label) {
  if (isDebugEnabled() && window.console && window.console.group) {
    window.console.group(`[Aether] ${label}`);
  }
}

/**
 * End console message group (only in debug mode).
 */
function debugGroupEnd() {
  if (isDebugEnabled() && window.console && window.console.groupEnd) {
    window.console.groupEnd();
  }
}

/**
 * Enable debug mode.
 *
 * Usage: aetherDebug.enable() in browser console.
 */
function enableDebug() {
  if (typeof window !== 'undefined') {
    window.aetherDebug = true;
    debug('Debug mode enabled');
  }
}

/**
 * Disable debug mode.
 *
 * Usage: aetherDebug.disable() in browser console.
 */
function disableDebug() {
  if (typeof window !== 'undefined') {
    window.aetherDebug = false;
  }
}

// Export as single object for easier importing
const debugUtil = {
  debug,
  error: debugError,
  warn: debugWarn,
  info: debugInfo,
  table: debugTable,
  time: debugTime,
  timeEnd: debugTimeEnd,
  group: debugGroup,
  groupEnd: debugGroupEnd,
  enable: enableDebug,
  disable: disableDebug,
  isEnabled: isDebugEnabled
};

// Make available globally for easy browser console access
if (typeof window !== 'undefined') {
  window.aetherDebug = window.aetherDebug || false;
  window.aetherDebugUtil = debugUtil;
}
/* harmony default export */ const utils_debug = ((/* unused pure expression or super */ null && (debugUtil)));
;// ./node_modules/is-network-error/index.js
const objectToString = Object.prototype.toString;

const isError = value => objectToString.call(value) === '[object Error]';

const errorMessages = new Set([
	'network error', // Chrome
	'Failed to fetch', // Chrome
	'NetworkError when attempting to fetch resource.', // Firefox
	'The Internet connection appears to be offline.', // Safari 16
	'Network request failed', // `cross-fetch`
	'fetch failed', // Undici (Node.js)
	'terminated', // Undici (Node.js)
	' A network error occurred.', // Bun (WebKit)
	'Network connection lost', // Cloudflare Workers (fetch)
]);

function isNetworkError(error) {
	const isValid = error
		&& isError(error)
		&& error.name === 'TypeError'
		&& typeof error.message === 'string';

	if (!isValid) {
		return false;
	}

	const {message, stack} = error;

	// Safari 17+ has generic message but no stack for network errors
	if (message === 'Load failed') {
		return stack === undefined
			// Sentry adds its own stack trace to the fetch error, so also check for that
			|| '__sentry_captured__' in error;
	}

	// Deno network errors start with specific text
	if (message.startsWith('error sending request for url')) {
		return true;
	}

	// Standard network error messages
	return errorMessages.has(message);
}

;// ./node_modules/p-retry/index.js


function validateRetries(retries) {
	if (typeof retries === 'number') {
		if (retries < 0) {
			throw new TypeError('Expected `retries` to be a non-negative number.');
		}

		if (Number.isNaN(retries)) {
			throw new TypeError('Expected `retries` to be a valid number or Infinity, got NaN.');
		}
	} else if (retries !== undefined) {
		throw new TypeError('Expected `retries` to be a number or Infinity.');
	}
}

function validateNumberOption(name, value, {min = 0, allowInfinity = false} = {}) {
	if (value === undefined) {
		return;
	}

	if (typeof value !== 'number' || Number.isNaN(value)) {
		throw new TypeError(`Expected \`${name}\` to be a number${allowInfinity ? ' or Infinity' : ''}.`);
	}

	if (!allowInfinity && !Number.isFinite(value)) {
		throw new TypeError(`Expected \`${name}\` to be a finite number.`);
	}

	if (value < min) {
		throw new TypeError(`Expected \`${name}\` to be \u2265 ${min}.`);
	}
}

class AbortError extends Error {
	constructor(message) {
		super();

		if (message instanceof Error) {
			this.originalError = message;
			({message} = message);
		} else {
			this.originalError = new Error(message);
			this.originalError.stack = this.stack;
		}

		this.name = 'AbortError';
		this.message = message;
	}
}

function calculateDelay(retriesConsumed, options) {
	const attempt = Math.max(1, retriesConsumed + 1);
	const random = options.randomize ? (Math.random() + 1) : 1;

	let timeout = Math.round(random * options.minTimeout * (options.factor ** (attempt - 1)));
	timeout = Math.min(timeout, options.maxTimeout);

	return timeout;
}

function calculateRemainingTime(start, max) {
	if (!Number.isFinite(max)) {
		return max;
	}

	return max - (performance.now() - start);
}

async function onAttemptFailure({error, attemptNumber, retriesConsumed, startTime, options}) {
	const normalizedError = error instanceof Error
		? error
		: new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`);

	if (normalizedError instanceof AbortError) {
		throw normalizedError.originalError;
	}

	const retriesLeft = Number.isFinite(options.retries)
		? Math.max(0, options.retries - retriesConsumed)
		: options.retries;

	const maxRetryTime = options.maxRetryTime ?? Number.POSITIVE_INFINITY;

	const context = Object.freeze({
		error: normalizedError,
		attemptNumber,
		retriesLeft,
		retriesConsumed,
	});

	await options.onFailedAttempt(context);

	if (calculateRemainingTime(startTime, maxRetryTime) <= 0) {
		throw normalizedError;
	}

	const consumeRetry = await options.shouldConsumeRetry(context);

	const remainingTime = calculateRemainingTime(startTime, maxRetryTime);

	if (remainingTime <= 0 || retriesLeft <= 0) {
		throw normalizedError;
	}

	if (normalizedError instanceof TypeError && !isNetworkError(normalizedError)) {
		if (consumeRetry) {
			throw normalizedError;
		}

		options.signal?.throwIfAborted();
		return false;
	}

	if (!await options.shouldRetry(context)) {
		throw normalizedError;
	}

	if (!consumeRetry) {
		options.signal?.throwIfAborted();
		return false;
	}

	const delayTime = calculateDelay(retriesConsumed, options);
	const finalDelay = Math.min(delayTime, remainingTime);

	if (finalDelay > 0) {
		await new Promise((resolve, reject) => {
			const onAbort = () => {
				clearTimeout(timeoutToken);
				options.signal?.removeEventListener('abort', onAbort);
				reject(options.signal.reason);
			};

			const timeoutToken = setTimeout(() => {
				options.signal?.removeEventListener('abort', onAbort);
				resolve();
			}, finalDelay);

			if (options.unref) {
				timeoutToken.unref?.();
			}

			options.signal?.addEventListener('abort', onAbort, {once: true});
		});
	}

	options.signal?.throwIfAborted();

	return true;
}

async function pRetry(input, options = {}) {
	options = {...options};

	validateRetries(options.retries);

	if (Object.hasOwn(options, 'forever')) {
		throw new Error('The `forever` option is no longer supported. For many use-cases, you can set `retries: Infinity` instead.');
	}

	options.retries ??= 10;
	options.factor ??= 2;
	options.minTimeout ??= 1000;
	options.maxTimeout ??= Number.POSITIVE_INFINITY;
	options.maxRetryTime ??= Number.POSITIVE_INFINITY;
	options.randomize ??= false;
	options.onFailedAttempt ??= () => {};
	options.shouldRetry ??= () => true;
	options.shouldConsumeRetry ??= () => true;

	// Validate numeric options and normalize edge cases
	validateNumberOption('factor', options.factor, {min: 0, allowInfinity: false});
	validateNumberOption('minTimeout', options.minTimeout, {min: 0, allowInfinity: false});
	validateNumberOption('maxTimeout', options.maxTimeout, {min: 0, allowInfinity: true});
	validateNumberOption('maxRetryTime', options.maxRetryTime, {min: 0, allowInfinity: true});

	// Treat non-positive factor as 1 to avoid zero backoff or negative behavior
	if (!(options.factor > 0)) {
		options.factor = 1;
	}

	options.signal?.throwIfAborted();

	let attemptNumber = 0;
	let retriesConsumed = 0;
	const startTime = performance.now();

	while (Number.isFinite(options.retries) ? retriesConsumed <= options.retries : true) {
		attemptNumber++;

		try {
			options.signal?.throwIfAborted();

			const result = await input(attemptNumber);

			options.signal?.throwIfAborted();

			return result;
		} catch (error) {
			if (await onAttemptFailure({
				error,
				attemptNumber,
				retriesConsumed,
				startTime,
				options,
			})) {
				retriesConsumed++;
			}
		}
	}

	// Should not reach here, but in case it does, throw an error
	throw new Error('Retry attempts exhausted without throwing an error.');
}

function makeRetriable(function_, options) {
	return function (...arguments_) {
		return pRetry(() => function_.apply(this, arguments_), options);
	};
}

;// ./assets/src/constants/timing.js
/**
 * Timing Constants
 *
 * Centralized timing values for polling intervals, timeouts, and delays
 *
 * @package
 */

/**
 * Polling Intervals
 *
 * Standard polling intervals for various operations.
 * All values in milliseconds.
 */

/**
 * Default polling interval for job status checks
 * @constant {number} milliseconds
 */
const POLLING_INTERVAL = 500;

/**
 * Retry Configuration
 *
 * Configuration for retry logic
 */

/**
 * Maximum number of retry attempts
 * @constant {number}
 */
const MAX_RETRIES = 3;

/**
 * Initial retry delay (exponential backoff starts from this)
 * @constant {number} milliseconds
 */
const RETRY_INITIAL_DELAY = 1000;

/**
 * Maximum retry delay (exponential backoff caps at this)
 * @constant {number} milliseconds
 */
const RETRY_MAX_DELAY = 30000;
;// ./assets/src/providers/services/edgeService.js
/**
 * Edge Service (React)
 *
 * React implementation of edge service for Cloudflare Workers.
 * Replaces R2EdgeService.php logic.
 * Handles worker deployment and management via Cloudflare API.
 *
 * Deployment strategy:
 * - R2 workers: Uses PHP endpoint (avoids browser PUT request limitations in Playground)
 * - Other worker types: Makes direct browser-based Cloudflare API calls
 *
 * @package
 */








/**
 * Edge Service class.
 */
class EdgeService {
  /**
   * Constructor.
   *
   * @param {string} accountId  Cloudflare account ID.
   * @param {string} apiToken   Cloudflare API token.
   * @param {Object} config     Optional configuration.
   * @param {string} providerId Provider ID for REST API endpoints (default: 'cloudflare').
   */
  constructor(accountId, apiToken, config = {}, providerId = 'cloudflare') {
    this.accountId = accountId;
    this.apiToken = apiToken;
    this.config = config;
    this.providerId = providerId;
    this.cloudflareApiBase = 'https://api.cloudflare.com/client/v4';
  }

  /**
   * Make a request to Cloudflare API.
   *
   * @param {string} endpoint API endpoint (e.g., '/accounts/ID/workers/scripts').
   * @param {Object} options  Fetch options (method, headers, body, etc.).
   * @return {Promise<Object>} API response.
   */
  async cloudflareApiRequest(endpoint, options = {}) {
    const url = `${this.cloudflareApiBase}${endpoint}`;
    const authHeaders = api_createAuthHeaders(this.apiToken);
    const headers = {
      ...authHeaders,
      ...(options.headers || {})
    };
    try {
      // Use pRetry to wrap fetch with retry logic for network errors only.
      // We don't retry on HTTP errors because they contain useful error info.
      const response = await pRetry(async () => {
        return await fetch(url, {
          ...options,
          headers
        });
      }, {
        retries: MAX_RETRIES,
        minTimeout: RETRY_INITIAL_DELAY,
        maxTimeout: RETRY_MAX_DELAY,
        onFailedAttempt: error => {
          // Only network errors will trigger retry.
          debugWarn(`Cloudflare API request failed (${endpoint}), retrying... (attempt ${error.attemptNumber})`, error.message);
        },
        // Only retry on network errors, not HTTP errors.
        shouldRetry: error => {
          return error.name === 'TypeError' && error.message.includes('fetch');
        }
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        const responseText = JSON.stringify(data);
        const error = parseErrorResponse(responseText, 'Cloudflare API request failed');
        debugError(`Cloudflare API error (${endpoint}):`, error);
        return standardResponse_createErrorResponse(error, data.errors || []);
      }
      return standardResponse_createSuccessResponse({
        result: data.result
      });
    } catch (error) {
      debugError(`Cloudflare API request failed (${endpoint}):`, error);
      return standardResponse_createErrorResponse(error.message || 'Network request failed');
    }
  }

  /**
   * Deploy edge worker.
   *
   * Deployment method depends on worker type:
   * - R2 workers: Uses PHP endpoint (server-side PUT request, no CORS issues)
   * - Other worker types: Uses direct browser-based Cloudflare API calls
   *
   * @param {string}  workerType Worker type (e.g., 'r2').
   * @param {string}  script     Worker script content.
   * @param {Object}  bindings   Worker bindings (R2 buckets, etc.).
   * @param {boolean} dryRun     Whether to perform dry run.
   * @return {Promise<Object>} Result array with 'success' and optional 'workerName', 'workerUrl', 'error'.
   */
  async deploy(workerType, script, bindings = {}, dryRun = false) {
    if (dryRun) {
      const workerName = this.generateWorkerName(workerType);
      return standardResponse_createSuccessResponse({
        workerName: workerName + '-dry-run',
        workerUrl: this.getWorkerUrlFromName(workerName + '-dry-run')
      }, 'Dry run successful');
    }

    // Generate worker name.
    const workerName = this.generateWorkerName(workerType);

    // For R2 workers, use PHP endpoint (avoids browser PUT request limitations in Playground)
    if (workerType === 'r2') {
      try {
        const response = await api({
          path: '/aether/v1/providers/cloudflare-r2/deploy-worker',
          method: 'POST',
          data: {
            worker_name: workerName,
            script,
            bindings
          }
        });
        if (!response.success) {
          return standardResponse_createErrorResponse(response.error || 'Worker deployment failed');
        }
        return standardResponse_createSuccessResponse({
          workerName: response.worker_name,
          workerUrl: response.worker_url
        });
      } catch (error) {
        return standardResponse_createErrorResponse(error.message || 'Worker deployment failed');
      }
    }

    // For other worker types, use direct Cloudflare API call (browser-based).
    try {
      // Build multipart/form-data body for Cloudflare Workers API.
      const formData = new FormData();

      // Add worker script.
      const scriptBlob = new Blob([script], {
        type: 'application/javascript+module'
      });
      formData.append('worker.js', scriptBlob, 'worker.js');

      // Add metadata with bindings.
      const metadata = {
        main_module: 'worker.js',
        bindings: []
      };

      // Convert bindings object to Cloudflare API format.
      for (const [name, binding] of Object.entries(bindings)) {
        if (binding.type === 'r2_bucket') {
          metadata.bindings.push({
            type: 'r2_bucket',
            name,
            bucket_name: binding.bucket_name
          });
        }
      }
      formData.append('metadata', new Blob([JSON.stringify(metadata)], {
        type: 'application/json'
      }), 'metadata.json');

      // Deploy to Cloudflare API.
      const endpoint = `/accounts/${this.accountId}/workers/scripts/${workerName}`;
      const response = await this.cloudflareApiRequest(endpoint, {
        method: 'PUT',
        body: formData
      });
      if (!response.success) {
        return standardResponse_createErrorResponse(response.error || 'Worker deployment failed');
      }

      // Get the worker URL.
      const workerUrl = this.getWorkerUrlFromName(workerName);

      // Try to enable workers.dev subdomain.
      await this.enableWorkersDevSubdomain(workerName);
      return standardResponse_createSuccessResponse({
        workerName,
        workerUrl
      });
    } catch (error) {
      return standardResponse_createErrorResponse(error.message || 'Worker deployment failed');
    }
  }

  /**
   * Enable workers.dev subdomain for a worker.
   *
   * @param {string} workerName Worker name.
   * @return {Promise<Object>} Result object.
   */
  async enableWorkersDevSubdomain(workerName) {
    try {
      // First, get the subdomain name.
      const subdomainEndpoint = `/accounts/${this.accountId}/workers/subdomain`;
      const subdomainResponse = await this.cloudflareApiRequest(subdomainEndpoint, {
        method: 'GET'
      });
      if (!subdomainResponse.success) {
        debugWarn('Failed to get workers.dev subdomain:', subdomainResponse.error);
        return standardResponse_createErrorResponse(subdomainResponse.error);
      }
      const subdomain = subdomainResponse.data?.result?.subdomain;
      if (!subdomain) {
        debugWarn('No workers.dev subdomain configured');
        return standardResponse_createErrorResponse('No subdomain configured');
      }

      // Enable the subdomain for this worker.
      const enableEndpoint = `/accounts/${this.accountId}/workers/scripts/${workerName}/subdomain`;
      const enableResponse = await this.cloudflareApiRequest(enableEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          enabled: true
        })
      });
      if (!enableResponse.success) {
        debugWarn('Failed to enable workers.dev subdomain:', enableResponse.error);
        return standardResponse_createErrorResponse(enableResponse.error);
      }
      return standardResponse_createSuccessResponse();
    } catch (error) {
      debugWarn('Error enabling workers.dev subdomain:', error);
      return standardResponse_createErrorResponse(error.message);
    }
  }

  /**
   * Test worker deployment status.
   *
   * @param {string} workerType Worker type.
   * @param {string} workerUrl  Worker URL (optional).
   * @return {Promise<Object>} Result array with 'success', 'deployed' and optional 'workerUrl', 'error'.
   */
  async testDeployment(workerType, workerUrl = '') {
    if (!workerUrl) {
      return standardResponse_createSuccessResponse({
        deployed: false
      }, 'Worker not deployed');
    }

    // Test API token permissions via direct Cloudflare API call.
    try {
      const listResponse = await this.listWorkers();
      if (!listResponse.success) {
        return standardResponse_createErrorResponse(listResponse.error || 'Failed to verify API token permissions');
      }
    } catch (error) {
      return standardResponse_createErrorResponse(error.message || 'Token permission test failed');
    }

    // Try to fetch worker info via direct Cloudflare API call.
    const workerName = this.extractWorkerNameFromUrl(workerUrl);
    if (workerName) {
      try {
        const workerInfo = await this.getWorker(workerName);
        if (workerInfo.success) {
          return standardResponse_createSuccessResponse({
            deployed: true,
            workerUrl
          }, 'Worker is deployed and accessible');
        }
      } catch (error) {
        // Worker might not exist yet, continue
      }
    }
    return standardResponse_createSuccessResponse({
      deployed: true,
      workerUrl
    }, 'Worker URL provided but verification failed');
  }

  /**
   * List all deployed workers.
   *
   * @return {Promise<Object>} Result with workers array.
   */
  async listWorkers() {
    const endpoint = `/accounts/${this.accountId}/workers/scripts`;
    const response = await this.cloudflareApiRequest(endpoint, {
      method: 'GET'
    });
    if (!response.success) {
      return standardResponse_createErrorResponse(response.error || 'Failed to list workers');
    }
    return standardResponse_createSuccessResponse({
      workers: response.data?.result || []
    });
  }

  /**
   * Get information about a specific worker.
   *
   * @param {string} workerName Worker name.
   * @return {Promise<Object>} Result with worker info.
   */
  async getWorker(workerName) {
    const endpoint = `/accounts/${this.accountId}/workers/scripts/${workerName}`;
    const response = await this.cloudflareApiRequest(endpoint, {
      method: 'GET'
    });
    if (!response.success) {
      return standardResponse_createErrorResponse(response.error || 'Failed to get worker info');
    }
    return standardResponse_createSuccessResponse({
      worker: response.data?.result
    });
  }

  /**
   * Get zone ID for a hostname (for custom domain attachment).
   *
   * @param {string} hostname Hostname to lookup.
   * @return {Promise<Object>} Result with zone ID.
   */
  async getZoneIdForHostname(hostname) {
    // List zones and find matching one.
    const endpoint = `/zones?name=${encodeURIComponent(hostname)}`;
    const response = await this.cloudflareApiRequest(endpoint, {
      method: 'GET'
    });
    if (!response.success) {
      return standardResponse_createErrorResponse(response.error || 'Failed to get zone ID');
    }
    const zones = response.data?.result || [];
    if (zones.length === 0) {
      return standardResponse_createErrorResponse(`No zone found for hostname: ${hostname}`);
    }
    return standardResponse_createSuccessResponse({
      zoneId: zones[0].id,
      zoneName: zones[0].name
    });
  }

  /**
   * Attach worker to a custom domain.
   *
   * @param {string} workerName Worker name.
   * @param {string} hostname   The hostname to attach (e.g., "example.com").
   * @param {string} zoneId     Cloudflare zone ID.
   * @return {Promise<Object>} Result with success status.
   */
  async attachWorkerToCustomDomain(workerName, hostname, zoneId) {
    // Clean hostname (remove protocol and path).
    const cleanHostname = hostname.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const endpoint = `/accounts/${this.accountId}/workers/domains`;
    const response = await this.cloudflareApiRequest(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        environment: 'production',
        hostname: cleanHostname,
        service: workerName,
        zone_id: zoneId,
        override_existing_dns_record: true
      })
    });
    if (!response.success) {
      return standardResponse_createErrorResponse(response.error || 'Failed to attach worker to custom domain');
    }
    return standardResponse_createSuccessResponse(null, `Worker attached to ${cleanHostname}`);
  }

  /**
   * Test connection to Cloudflare Workers and R2.
   *
   * @param {string} workerEndpoint Optional worker endpoint to test.
   * @return {Promise<Object>} Result with connection status.
   */
  async testConnection(workerEndpoint = '') {
    const results = {
      success: true,
      workersApi: false,
      r2Access: false,
      errors: []
    };

    // Test Cloudflare Workers API access.
    try {
      const workersResponse = await this.listWorkers();
      if (workersResponse.success) {
        results.workersApi = true;
      } else {
        results.errors.push(`Workers API: ${workersResponse.error}`);
        results.success = false;
      }
    } catch (error) {
      results.errors.push(`Workers API: ${error.message}`);
      results.success = false;
    }

    // Test R2 access if workerEndpoint is provided.
    if (workerEndpoint) {
      try {
        // Create a test URL to check R2 worker access.
        const testSiteKey = 'connection-test-' + Date.now();
        const testUrl = `${workerEndpoint.replace(/\/+$/, '')}/${testSiteKey}/test.html`;
        const response = await fetch(testUrl, {
          method: 'GET'
        });

        // We expect 404 for non-existent file, but that proves R2 worker is accessible.
        if (response.status === 404 || response.ok) {
          results.r2Access = true;
        } else {
          results.errors.push(`R2 Worker: HTTP ${response.status}`);
          results.success = false;
        }
      } catch (error) {
        results.errors.push(`R2 Worker: ${error.message}`);
        results.success = false;
      }
    }
    return results;
  }

  /**
   * Get deployed worker endpoint URL.
   *
   * @return {string} Worker URL, empty string if not deployed.
   */
  getWorkerUrl() {
    // Get worker endpoint from config (set after deployment).
    return this.config.worker_endpoint || '';
  }

  /**
   * Check if worker is deployed.
   *
   * @param {string} workerType Worker type.
   * @return {boolean} True if deployed, false otherwise.
   */
  isDeployed(workerType) {
    const url = this.getWorkerUrl(workerType);
    return !!url;
  }

  /**
   * Get worker script content.
   * Fetches worker script from REST endpoint.
   *
   * @param {string} providerId Optional provider ID (defaults to this.providerId).
   * @param {string} workerType Worker type (e.g., 'r2', 'git', 'media').
   * @return {Promise<string>} Worker script content.
   */
  async getWorkerScript(providerId = null, workerType = '') {
    // Support both calling conventions:
    // - getWorkerScript(workerType) - uses instance providerId
    // - getWorkerScript(providerId, workerType) - uses provided providerId
    if (!workerType && providerId) {
      // First param is workerType, second is undefined
      workerType = providerId;
      providerId = null;
    }
    if (!workerType) {
      debugWarn('Worker type is required to fetch script');
      return '';
    }

    // Use provided providerId or fall back to instance providerId
    const targetProviderId = providerId || this.providerId;
    try {
      const response = await api({
        path: `/aether/v1/providers/${targetProviderId}/edge/worker-script/${workerType}`,
        method: 'GET'
      });

      // The REST endpoint returns the script as plain text (Content-Type: text/javascript)
      if (typeof response === 'string') {
        return response;
      }
      debugWarn('Failed to fetch worker script: unexpected response format');
      return '';
    } catch (error) {
      debugError('Error fetching worker script:', error);
      return '';
    }
  }

  /**
   * Get worker bindings configuration.
   *
   * @param {string} workerType Worker type.
   * @param {Object} config     Provider configuration.
   * @return {Object} Worker bindings.
   */
  getWorkerBindings(workerType, config) {
    if (workerType === 'r2') {
      const bucketName = config.bucket_name || '';
      if (!bucketName) {
        return {};
      }
      return {
        R2_BUCKET: {
          type: 'r2_bucket',
          bucket_name: bucketName // Cloudflare API expects snake_case
        }
      };
    }
    return {};
  }

  /**
   * Generate unique worker name.
   *
   * @param {string} workerType Worker type.
   * @return {string} Generated worker name.
   */
  generateWorkerName(workerType) {
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    return `aether-${workerType}-${randomSuffix}`;
  }

  /**
   * Get worker URL from worker name.
   *
   * @param {string} workerName Worker name.
   * @return {string} Worker URL.
   */
  getWorkerUrlFromName(workerName) {
    return `https://${workerName}.workers.dev`;
  }

  /**
   * Extract worker name from URL.
   *
   * @param {string} workerUrl Worker URL.
   * @return {string|null} Worker name or null.
   */
  extractWorkerNameFromUrl(workerUrl) {
    const match = workerUrl.match(/https?:\/\/([^.]+)\.workers\.dev/);
    return match ? match[1] : null;
  }
}
;// ./assets/src/utils/credentialManager.js
/**
 * Credential Manager
 *
 * Fetches encrypted credentials from REST endpoint and manages them in memory.
 * Credentials are decrypted server-side before being sent to the client.
 *
 * @package
 */



/**
 * In-memory credential cache.
 * Key: providerId, Value: { credentials, timestamp }
 *
 * @type {Map<string, {credentials: Object, timestamp: number}>}
 */
const credentialCache = new Map();

/**
 * Cache expiration time (5 minutes).
 */
const CACHE_EXPIRY_MS = 5 * 60 * 1000;

/**
 * Fetch credentials for a provider.
 *
 * @param {string} providerId Provider ID (e.g., 'local-filesystem').
 * @return {Promise<Object>} Credentials object.
 */
async function getCredentials(providerId) {
  // Check cache first.
  const cached = credentialCache.get(providerId);
  if (cached) {
    const age = Date.now() - cached.timestamp;
    // Use <= to include the exact expiry time (off-by-one fix)
    // Cache is valid for the full CACHE_EXPIRY_MS duration
    // Expires only when age > CACHE_EXPIRY_MS
    if (age <= CACHE_EXPIRY_MS) {
      return cached.credentials;
    }
    // Cache expired, remove it.
    credentialCache.delete(providerId);
  }

  // Fetch from REST endpoint (using /config endpoint).
  const response = await api({
    path: `/aether/site-exporter/providers/${providerId}/config`,
    method: 'GET'
  });
  if (!response || !response.success) {
    throw new Error(response?.error || 'Failed to fetch credentials');
  }
  const credentials = response.config || {};

  // Cache credentials.
  credentialCache.set(providerId, {
    credentials,
    timestamp: Date.now()
  });
  return credentials;
}

/**
 * Clear cached credentials for a provider.
 *
 * @param {string} providerId Provider ID.
 */
function clearCredentials(providerId) {
  credentialCache.delete(providerId);
}

/**
 * Clear all cached credentials.
 */
function clearAllCredentials() {
  credentialCache.clear();
}
;// ./assets/src/providers/hooks/useEdgeService.js
/**
 * Edge Service Hook
 *
 * React hook for edge worker operations (deploy, test, get status).
 * Uses EdgeService class that calls Cloudflare API directly.
 *
 * @package
 */






/**
 * Hook for edge service operations.
 *
 * @param {string} providerId Provider ID (e.g., 'cloudflare-r2').
 * @return {Object} Edge service methods.
 */
function useEdgeService(providerId) {
  /**
   * Get edge service instance.
   *
   * @return {Promise<EdgeService>} Edge service instance.
   */
  const getEdgeService = (0,external_wp_element_namespaceObject.useCallback)(async () => {
    // Fetch edge provider credentials from settings.
    const response = await api({
      path: '/aether/v1/settings',
      method: 'GET'
    });
    const settings = response?.settings || {};
    const providerTypes = settings.provider_types || {};
    const edgeProviderId = providerTypes.edge || 'cloudflare';

    // Get edge provider config from providers array
    const edgeProvider = settings.providers?.[edgeProviderId] || {};
    const accountId = edgeProvider.account_id || '';
    const apiToken = edgeProvider.api_token || '';
    if (!accountId || !apiToken) {
      throw new Error('Edge provider credentials are required for worker deployment');
    }

    // Get storage provider config for worker bindings.
    const storageCredentials = await getCredentials(providerId);
    return new EdgeService(accountId, apiToken, {
      ...storageCredentials,
      worker_endpoint: storageCredentials.worker_endpoint || ''
    }, edgeProviderId);
  }, [providerId]);

  /**
   * Deploy edge worker.
   *
   * @param {string}  workerType Worker type (e.g., 'r2').
   * @param {string}  script     Worker script content.
   * @param {Object}  bindings   Worker bindings (R2 buckets, etc.).
   * @param {boolean} dryRun     Whether to perform dry run.
   * @return {Promise<Object>} Deployment result.
   */
  const deploy = (0,external_wp_element_namespaceObject.useCallback)(async (workerType, script, bindings = {}, dryRun = false) => {
    const service = await getEdgeService();
    return service.deploy(workerType, script, bindings, dryRun);
  }, [getEdgeService]);

  /**
   * Test worker deployment status.
   *
   * @param {string} workerType Worker type.
   * @param {string} workerUrl  Worker URL (optional).
   * @return {Promise<Object>} Test result.
   */
  const testDeployment = (0,external_wp_element_namespaceObject.useCallback)(async (workerType, workerUrl = '') => {
    const service = await getEdgeService();
    return service.testDeployment(workerType, workerUrl);
  }, [getEdgeService]);

  /**
   * Get deployed worker endpoint URL.
   *
   * @param {string} workerType Worker type.
   * @return {Promise<string>} Worker URL, empty string if not deployed.
   */
  const getWorkerUrl = (0,external_wp_element_namespaceObject.useCallback)(async workerType => {
    const service = await getEdgeService();
    return service.getWorkerUrl(workerType);
  }, [getEdgeService]);

  /**
   * Check if worker is deployed.
   *
   * @param {string} workerType Worker type.
   * @return {Promise<boolean>} True if deployed, false otherwise.
   */
  const isDeployed = (0,external_wp_element_namespaceObject.useCallback)(async workerType => {
    const service = await getEdgeService();
    return service.isDeployed(workerType);
  }, [getEdgeService]);

  /**
   * Get worker script content from REST endpoint.
   *
   * @param {string} scriptProviderId Provider ID.
   * @param {string} workerType       Worker type.
   * @return {Promise<string>} Worker script content.
   */
  const getWorkerScript = (0,external_wp_element_namespaceObject.useCallback)(async (scriptProviderId, workerType) => {
    const response = await api({
      path: `/aether/v1/providers/${scriptProviderId}/edge/worker-script/${workerType}`,
      method: 'GET'
    });
    if (typeof response === 'string') {
      return response;
    }
    throw new Error('Failed to fetch worker script');
  }, []);

  /**
   * Get worker bindings configuration.
   *
   * @param {string} workerType Worker type.
   * @param {Object} config     Provider configuration.
   * @return {Promise<Object>} Worker bindings.
   */
  const getWorkerBindings = (0,external_wp_element_namespaceObject.useCallback)(async (workerType, config = {}) => {
    const service = await getEdgeService();
    return service.getWorkerBindings(workerType, config);
  }, [getEdgeService]);
  return {
    deploy,
    testDeployment,
    getWorkerUrl,
    isDeployed,
    getWorkerScript,
    getWorkerBindings
  };
}
;// ./assets/src/hooks/useWorkerDeploy.js
/**
 * Worker Deploy Hook
 *
 * Handles worker deployment to Cloudflare Workers.
 * Updated to use useEdgeService hook.
 *
 * @package
 */






/**
 * Hook for deploying workers.
 *
 * @param {string} workerType Worker type (r2, git, media, spaces).
 * @param {string} providerId Provider ID (e.g., 'cloudflare-r2').
 * @return {Object} Deployment methods and state.
 */
function useWorkerDeploy(workerType, providerId = 'cloudflare-r2') {
  const [deploying, setDeploying] = (0,external_wp_element_namespaceObject.useState)(false);
  const [error, setError] = (0,external_wp_element_namespaceObject.useState)(null);
  const [result, setResult] = (0,external_wp_element_namespaceObject.useState)(null);
  const edgeService = useEdgeService(providerId);
  const deploy = (0,external_wp_element_namespaceObject.useCallback)(async (dryRun = false) => {
    setDeploying(true);
    setError(null);
    setResult(null);
    try {
      // Get edge provider ID from settings.
      const settingsResponse = await api({
        path: '/aether/v1/settings'
      });
      const settings = settingsResponse.settings || {};
      const providerTypes = settings.provider_types || {};
      const edgeProviderId = providerTypes.edge || 'cloudflare';

      // Get worker script from REST API.
      const script = await edgeService.getWorkerScript(edgeProviderId, workerType);

      // Get worker bindings.
      const storageConfigResponse = await api({
        path: `/aether/v1/providers/${providerId}/config`
      });
      const config = storageConfigResponse.config || {};
      const bindings = await edgeService.getWorkerBindings(workerType, config);

      // Deploy worker.
      const deployResult = await edgeService.deploy(workerType, script, bindings, dryRun);
      if (!deployResult.success) {
        throw new Error(deployResult.error || (0,external_wp_i18n_namespaceObject.__)('Worker deployment failed', 'aether'));
      }

      // Save deployment info to WordPress settings.
      const deploymentInfo = {
        worker_type: workerType,
        workerName: deployResult.workerName,
        workerUrl: deployResult.workerUrl,
        deployed_at: Date.now()
      };

      // Get current deployments.
      const deployments = settings.worker_deployments || {};
      deployments[workerType] = deploymentInfo;
      await api({
        path: '/aether/v1/settings',
        method: 'POST',
        data: {
          key: 'worker_deployments',
          value: deployments
        }
      });

      // Also update provider config with worker endpoint.
      if (deployResult.workerUrl) {
        // Get current providers settings.
        const providersResponse = await api({
          path: '/aether/v1/settings',
          method: 'GET'
        });
        const providers = providersResponse.settings?.providers || {};

        // Use full providerId (e.g., 'cloudflare-r2') not truncated version
        if (!providers[providerId]) {
          providers[providerId] = {};
        }
        providers[providerId].worker_endpoint = deployResult.workerUrl;

        // Update providers settings.
        await api({
          path: '/aether/v1/settings',
          method: 'POST',
          data: {
            key: 'providers',
            value: providers
          }
        });
      }
      setResult(deploymentInfo);
      setDeploying(false);
      return {
        success: true,
        ...deploymentInfo
      };
    } catch (err) {
      const errorMessage = err.message || (0,external_wp_i18n_namespaceObject.__)('Worker deployment failed', 'aether');
      setError(errorMessage);
      setDeploying(false);
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [workerType, providerId, edgeService]);
  return {
    deploy,
    deploying,
    error,
    result
  };
}
;// ./assets/src/components/ProviderActions.js
/**
 * Provider Actions Component
 *
 * Test connection and deploy worker buttons for providers.
 *
 * @package
 */









function ProviderActions({
  providerId,
  requiresWorker,
  workerType = 'r2',
  onWorkerDeployed,
  currentConfig = null
}) {
  const [config, setConfig] = (0,external_wp_element_namespaceObject.useState)({});
  const [loadingConfig, setLoadingConfig] = (0,external_wp_element_namespaceObject.useState)(true);

  // Load provider config for connection testing.
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    const loadConfig = async () => {
      try {
        const response = await api({
          path: '/aether/v1/settings'
        });
        if (response?.success && response?.settings?.providers?.[providerId]) {
          setConfig(response.settings.providers[providerId]);
        }
      } catch (err) {
        // Silently fail - config will remain empty
      } finally {
        setLoadingConfig(false);
      }
    };
    if (providerId) {
      loadConfig();
    }
  }, [providerId]);

  // Use currentConfig if provided (from form), otherwise use saved config
  const testConfig = currentConfig && Object.keys(currentConfig).length > 0 ? currentConfig : config;
  const {
    test,
    testing,
    result: testResult
  } = useConnectionTest(providerId, testConfig);
  const {
    deploy,
    deploying,
    error: deployError,
    result: deployResult
  } = useWorkerDeploy(workerType);
  const handleTestConnection = async () => {
    await test();
  };
  const handleDeployWorker = async () => {
    const result = await deploy(false);
    if (result.success && result.workerUrl) {
      setConfig(prevConfig => ({
        ...prevConfig,
        workerEndpoint: result.workerUrl
      }));
      if (onWorkerDeployed) {
        onWorkerDeployed(result.workerUrl);
      }
    }
  };
  const containerStyle = {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTop: `1px solid ${colors.borderLight}`
  };
  const buttonsStyle = {
    ...createFlexStyle('row', spacing.md),
    marginTop: spacing.md
  };
  if (loadingConfig && !currentConfig) {
    return null;
  }
  return /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)("div", {
    className: "aether-provider-actions",
    style: containerStyle,
    children: [testResult && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.Notice, {
      className: `aether-provider-actions__notice aether-provider-actions__notice--${testResult.success ? 'success' : 'error'}`,
      status: testResult.success ? 'success' : 'error',
      isDismissible: false,
      onRemove: () => {},
      children: testResult.message
    }), deployResult && deployResult.success && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)(external_wp_components_namespaceObject.Notice, {
      className: "aether-provider-actions__notice aether-provider-actions__notice--success",
      status: "success",
      isDismissible: false,
      onRemove: () => {},
      children: [(0,external_wp_i18n_namespaceObject.__)('Worker deployed successfully!', 'aether'), deployResult.workerUrl && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)("div", {
        className: "aether-provider-actions__worker-url",
        style: {
          marginTop: spacing.sm
        },
        children: [/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("strong", {
          className: "aether-provider-actions__worker-url-label",
          children: (0,external_wp_i18n_namespaceObject.__)('Worker URL:', 'aether')
        }), ' ', /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("a", {
          className: "aether-provider-actions__worker-url-link",
          href: deployResult.workerUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          children: deployResult.workerUrl
        })]
      })]
    }), deployError && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.Notice, {
      className: "aether-provider-actions__notice aether-provider-actions__notice--error",
      status: "error",
      isDismissible: false,
      onRemove: () => {},
      children: deployError
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)("div", {
      className: "aether-provider-actions__buttons",
      style: buttonsStyle,
      children: [/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.Button, {
        className: "aether-provider-actions__test-button",
        variant: "secondary",
        onClick: handleTestConnection,
        isBusy: testing,
        disabled: testing || deploying,
        children: testing ? (0,external_wp_i18n_namespaceObject.__)('Testing…', 'aether') : (0,external_wp_i18n_namespaceObject.__)('Test Connection', 'aether')
      }), requiresWorker && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.Button, {
        className: "aether-provider-actions__deploy-button",
        variant: "secondary",
        onClick: handleDeployWorker,
        isBusy: deploying,
        disabled: testing || deploying,
        children: deploying ? (0,external_wp_i18n_namespaceObject.__)('Deploying…', 'aether') : (0,external_wp_i18n_namespaceObject.__)('Deploy Worker', 'aether')
      })]
    })]
  });
}
;// ./assets/src/utils/settingsHelpers.js
/**
 * Settings Helper Utilities
 *
 * Utilities for working with settings API (no dot notation).
 *
 * @package
 */

/**
 * Get provider settings from full settings object.
 *
 * Providers are stored in settings.providers[providerId].
 *
 * @param {Object} settings   Full settings object from API.
 * @param {string} providerId Provider ID.
 * @return {Object} Provider settings object.
 */
function getProviderSettings(settings, providerId) {
  // All providers are stored in settings.providers[providerId]
  return settings?.providers?.[providerId] || {};
}

/**
 * Update provider settings in full settings object.
 *
 * Providers are saved to settings.providers[providerId].
 *
 * @param {Object} allSettings      Full settings object.
 * @param {string} providerId       Provider ID.
 * @param {Object} providerSettings Provider settings to update.
 * @return {Object} Updated full settings object with saveKey and saveValue.
 */
function updateProviderSettings(allSettings, providerId, providerSettings) {
  // All providers: save to settings.providers[providerId]
  return {
    ...allSettings,
    providers: {
      ...(allSettings.providers || {}),
      [providerId]: providerSettings
    },
    _saveKey: 'providers',
    _saveValue: {
      ...(allSettings.providers || {}),
      [providerId]: providerSettings
    }
  };
}
;// ./assets/src/utils/constants.js
/**
 * Application Constants
 *
 * Centralized constants to avoid magic numbers and strings throughout the codebase.
 *
 * @package
 */

/**
 * Success message display duration (milliseconds).
 */
const SUCCESS_MESSAGE_DURATION_MS = 3000;

/**
 * Short delay for async operations (milliseconds).
 * Used to allow state updates to propagate before continuing.
 */
const SHORT_DELAY_MS = 100;

/**
 * Maximum progress percentage.
 */
const MAX_PROGRESS = 100;
;// ./assets/src/hooks/useSuccessTimeout.js
/**
 * Success Timeout Hook
 *
 * Manages success message timeout with automatic cleanup.
 * Prevents memory leaks and ensures proper cleanup on unmount.
 *
 * @package
 */




/**
 * Hook for managing success message timeout.
 *
 * @return {Object} { showSuccess, clearSuccess }
 */
function useSuccessTimeout() {
  const timeoutRef = (0,external_wp_element_namespaceObject.useRef)(null);

  // Cleanup timeout on unmount
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);
  const showSuccess = (0,external_wp_element_namespaceObject.useCallback)(callback => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (callback) {
        callback();
      }
      timeoutRef.current = null;
    }, SUCCESS_MESSAGE_DURATION_MS);
  }, []);
  const clearSuccess = (0,external_wp_element_namespaceObject.useCallback)(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  return {
    showSuccess,
    clearSuccess
  };
}
;// ./assets/src/hooks/useProviderSettingsForm.js
/**
 * Provider Settings Form Hook
 *
 * Shared hook for provider settings form logic.
 * Extracts common patterns from provider Settings components to reduce duplication.
 *
 * @package
 */







/**
 * Hook for provider settings form management.
 *
 * @param {string} providerId Provider ID.
 * @return {Object} Form state and handlers.
 */
function useProviderSettingsForm(providerId) {
  const [settings, setSettings] = (0,external_wp_element_namespaceObject.useState)({});
  const [loading, setLoading] = (0,external_wp_element_namespaceObject.useState)(true);
  const [saving, setSaving] = (0,external_wp_element_namespaceObject.useState)(false);
  const [error, setError] = (0,external_wp_element_namespaceObject.useState)(null);
  const [success, setSuccess] = (0,external_wp_element_namespaceObject.useState)(false);
  const {
    showSuccess,
    clearSuccess
  } = useSuccessTimeout();

  // Load existing settings
  (0,external_wp_element_namespaceObject.useEffect)(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await api({
          path: '/aether/site-exporter/settings'
        });
        if (response?.success && response?.settings) {
          const providerSettings = getProviderSettings(response.settings, providerId);
          setSettings(prev => ({
            ...prev,
            ...providerSettings
          }));
        }
      } catch (err) {
        setError(err.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    if (providerId) {
      loadSettings();
    }
  }, [providerId]);
  const handleChange = (0,external_wp_element_namespaceObject.useCallback)((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setError(null);
    clearSuccess();
    setSuccess(false);
  }, [clearSuccess]);
  const handleSubmit = (0,external_wp_element_namespaceObject.useCallback)(async e => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const allSettingsResponse = await api({
        path: '/aether/site-exporter/settings'
      });
      if (!allSettingsResponse?.success) {
        throw new Error('Failed to fetch settings');
      }
      const allSettings = allSettingsResponse.settings || {};
      const updatedSettings = updateProviderSettings(allSettings, providerId, settings);

      // Use the save key and value from updateProviderSettings
      // All providers are now saved to settings.providers[providerId]
      const saveKey = updatedSettings._saveKey || 'providers';
      const saveValue = updatedSettings._saveValue || updatedSettings.providers;
      await api({
        path: '/aether/site-exporter/settings',
        method: 'POST',
        data: {
          key: saveKey,
          value: saveValue
        }
      });
      setSuccess(true);
      showSuccess(() => setSuccess(false));
      (0,external_wp_hooks_namespaceObject.doAction)('aether.admin.provider.settings.saved', providerId);
    } catch (err) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  }, [providerId, settings, showSuccess]);
  return {
    settings,
    loading,
    saving,
    error,
    success,
    handleChange,
    handleSubmit
  };
}
;// ./assets/src/providers/cloudflare/Settings.js
/**
 * Cloudflare Workers Provider Settings Component
 *
 * @package
 */








function CloudflareWorkersSettings({
  providerId
}) {
  const {
    settings,
    loading,
    saving,
    error,
    success,
    handleChange,
    handleSubmit
  } = useProviderSettingsForm(providerId);
  const formStyle = {
    ...createFlexStyle('column', spacing.md)
  };
  const noticeErrorStyle = {
    ...noticeStyles.error,
    padding: spacing.md,
    marginBottom: spacing.md
  };
  const noticeSuccessStyle = {
    ...noticeStyles.success,
    padding: spacing.md,
    marginBottom: spacing.md
  };
  const noticeParagraphStyle = {
    margin: 0
  };
  const actionsStyle = {
    ...createFlexStyle('row', spacing.sm),
    justifyContent: 'flex-end',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.borderLight}`
  };
  if (loading) {
    return /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
      className: "aether-provider-settings-form aether-provider-settings-form--loading",
      children: (0,external_wp_i18n_namespaceObject.__)('Loading settings…', 'aether')
    });
  }
  return /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)("form", {
    className: "aether-provider-settings-form",
    onSubmit: handleSubmit,
    style: formStyle,
    children: [error && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("div", {
      className: "aether-provider-settings-form__notice aether-provider-settings-form__notice--error",
      style: noticeErrorStyle,
      children: /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
        className: "aether-provider-settings-form__notice-text",
        style: noticeParagraphStyle,
        children: error
      })
    }), success && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("div", {
      className: "aether-provider-settings-form__notice aether-provider-settings-form__notice--success",
      style: noticeSuccessStyle,
      children: /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
        className: "aether-provider-settings-form__notice-text",
        style: noticeParagraphStyle,
        children: (0,external_wp_i18n_namespaceObject.__)('Settings saved successfully!', 'aether')
      })
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Account ID', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('Your Cloudflare account ID (found in Workers dashboard)', 'aether'),
      value: settings.account_id || '',
      onChange: value => handleChange('account_id', value),
      required: true,
      pattern: "^[a-f0-9]{32}$",
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(SecretField, {
      label: (0,external_wp_i18n_namespaceObject.__)('API Token', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('Cloudflare API token with Workers permissions', 'aether'),
      value: settings.api_token || '',
      onChange: value => handleChange('api_token', value),
      placeholder: (0,external_wp_i18n_namespaceObject.__)('Enter API token', 'aether')
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(ProviderActions, {
      providerId: providerId,
      requiresWorker: false,
      currentConfig: settings
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("div", {
      className: "aether-provider-settings-form__actions",
      style: actionsStyle,
      children: /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.Button, {
        className: "aether-provider-settings-form__submit-button",
        type: "submit",
        variant: "primary",
        isBusy: saving,
        disabled: saving,
        children: saving ? (0,external_wp_i18n_namespaceObject.__)('Saving…', 'aether') : (0,external_wp_i18n_namespaceObject.__)('Save Settings', 'aether')
      })
    })]
  });
}
;// ./assets/src/utils/cloudflareWorkersApi.js
/**
 * Cloudflare Workers API Client
 *
 * Client for Cloudflare Workers API (v4).
 * Handles worker deployment, retrieval, and management.
 *
 * @package
 */





/**
 * Cloudflare API base URL.
 */
const API_BASE = 'https://api.cloudflare.com/client/v4';

/**
 * Deploy a worker to Cloudflare.
 *
 * @param {string} accountId  Cloudflare account ID.
 * @param {string} apiToken   Cloudflare API token.
 * @param {string} workerName Worker name.
 * @param {string} script     Worker script content.
 * @param {Object} bindings   Optional worker bindings (storage buckets, KV namespaces, etc.).
 * @return {Promise<Object>} Deployment result with success, workerName, workerUrl, and optional error.
 */
async function deployWorker(accountId, apiToken, workerName, script, bindings = {}) {
  const url = `${API_BASE}/accounts/${accountId}/workers/scripts/${workerName}`;

  // Create multipart/form-data body for ES module upload.
  const boundary = generateBoundary();
  const body = buildMultipartBody(script, bindings, boundary);
  const authHeaders = api_createAuthHeaders(apiToken);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    },
    body
  });
  if (!response.ok) {
    const responseBody = await response.text();
    const errorMessage = errorParser_parseErrorResponseWithStatus(responseBody, response.status, 'Worker deployment');
    return standardResponse_createErrorResponse(errorMessage);
  }
  const workerUrl = `https://${workerName}.workers.dev`;
  return standardResponse_createSuccessResponse({
    workerName,
    workerUrl
  });
}

/**
 * Get worker information.
 *
 * @param {string} accountId  Cloudflare account ID.
 * @param {string} apiToken   Cloudflare API token.
 * @param {string} workerName Worker name.
 * @return {Promise<Object>} Worker info or error.
 */
async function getWorker(accountId, apiToken, workerName) {
  const url = `${API_BASE}/accounts/${accountId}/workers/scripts/${workerName}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: createAuthHeaders(apiToken)
  });
  if (!response.ok) {
    const responseBody = await response.text();
    const errorMessage = parseErrorResponseWithStatus(responseBody, response.status, 'Get worker');
    return createErrorResponse(errorMessage);
  }
  const data = await response.json();
  return createSuccessResponse({
    worker: data.result || data
  });
}

/**
 * List workers for an account.
 *
 * @param {string} accountId Cloudflare account ID.
 * @param {string} apiToken  Cloudflare API token.
 * @return {Promise<Object>} List of workers or error.
 */
async function listWorkers(accountId, apiToken) {
  const url = `${API_BASE}/accounts/${accountId}/workers/scripts`;
  const response = await fetch(url, {
    method: 'GET',
    headers: createAuthHeaders(apiToken)
  });
  if (!response.ok) {
    const responseBody = await response.text();
    const errorMessage = parseErrorResponseWithStatus(responseBody, response.status, 'List workers');
    return createErrorResponse(errorMessage);
  }
  const data = await response.json();
  return createSuccessResponse({
    workers: data.result || []
  });
}

/**
 * Test API token permissions.
 *
 * NOTE: In WordPress Playground (browser environment), we cannot make direct
 * API calls to Cloudflare due to CORS restrictions. This function validates
 * credentials format only. Actual connection will be tested during deployment.
 *
 * @param {string} accountId Cloudflare account ID.
 * @param {string} apiToken  Cloudflare API token.
 * @return {Promise<Object>} Test result with success and optional error/message.
 */
async function testTokenPermissions(accountId, apiToken) {
  // Validate credentials are provided
  if (!accountId || !apiToken) {
    return standardResponse_createErrorResponse('Account ID and API token are required');
  }

  // Validate account ID format (32 character hex)
  if (!/^[a-f0-9]{32}$/i.test(accountId)) {
    return standardResponse_createErrorResponse('Invalid account ID format (expected 32 character hex string)');
  }

  // Validate API token format (40 character alphanumeric)
  if (apiToken.length < 20) {
    return standardResponse_createErrorResponse('API token appears too short (expected at least 20 characters)');
  }

  // In browser environment (WordPress Playground), we cannot test the actual
  // connection due to CORS. Return success after validation.
  // The connection will be validated during actual worker deployment.
  return standardResponse_createSuccessResponse(null, 'Credentials validated. Connection will be tested during deployment.');
}

/**
 * Delete a worker.
 *
 * @param {string} accountId  Cloudflare account ID.
 * @param {string} apiToken   Cloudflare API token.
 * @param {string} workerName Worker name.
 * @return {Promise<Object>} Delete result with success and optional error/message.
 */
async function deleteWorker(accountId, apiToken, workerName) {
  const url = `${API_BASE}/accounts/${accountId}/workers/scripts/${workerName}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: api_createAuthHeaders(apiToken)
  });
  if (response.status === 200 || response.status === 404) {
    // 404 means worker already deleted, which is success.
    return {
      success: true,
      message: `Worker ${workerName} deleted successfully`
    };
  }
  const responseBody = await response.text();
  const errorMessage = errorParser_parseErrorResponseWithStatus(responseBody, response.status, 'Worker deletion');
  return standardResponse_createErrorResponse(errorMessage);
}

/**
 * List all custom domains for workers.
 *
 * @param {string} accountId Cloudflare account ID.
 * @param {string} apiToken  Cloudflare API token.
 * @return {Promise<Object>} List of custom domains or error.
 */
async function listCustomDomains(accountId, apiToken) {
  const url = `${API_BASE}/accounts/${accountId}/workers/domains`;
  const response = await fetch(url, {
    method: 'GET',
    headers: api_createAuthHeaders(apiToken)
  });
  if (!response.ok) {
    const responseBody = await response.text();
    const errorMessage = errorParser_parseErrorResponseWithStatus(responseBody, response.status, 'List custom domains');
    return standardResponse_createErrorResponse(errorMessage);
  }
  const data = await response.json();
  return standardResponse_createSuccessResponse({
    domains: data.result || []
  });
}

/**
 * Attach a custom domain to a worker.
 *
 * @param {string} accountId  Cloudflare account ID.
 * @param {string} apiToken   Cloudflare API token.
 * @param {string} workerName Worker name (service).
 * @param {string} hostname   Domain hostname (e.g., "s12y.org").
 * @param {string} zoneId     Cloudflare zone ID for the domain.
 * @return {Promise<Object>} Attachment result with success and optional error.
 */
async function attachCustomDomain(accountId, apiToken, workerName, hostname, zoneId) {
  const url = `${API_BASE}/accounts/${accountId}/workers/domains`;

  // Clean hostname (remove protocol and paths)
  const cleanHostname = hostname.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const body = JSON.stringify({
    environment: 'production',
    hostname: cleanHostname,
    service: workerName,
    zone_id: zoneId
  });
  const response = await fetch(url, {
    method: 'PUT',
    headers: api_createAuthHeaders(apiToken),
    body
  });
  if (!response.ok) {
    const responseBody = await response.text();
    const errorMessage = errorParser_parseErrorResponseWithStatus(responseBody, response.status, 'Attach custom domain');
    return standardResponse_createErrorResponse(errorMessage);
  }
  const data = await response.json();
  return standardResponse_createSuccessResponse({
    domain: data.result || data
  });
}

/**
 * Remove a custom domain from a worker.
 *
 * @param {string} accountId Cloudflare account ID.
 * @param {string} apiToken  Cloudflare API token.
 * @param {string} domainId  Domain ID (from list domains response).
 * @return {Promise<Object>} Removal result with success and optional error.
 */
async function removeCustomDomain(accountId, apiToken, domainId) {
  const url = `${API_BASE}/accounts/${accountId}/workers/domains/${domainId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: api_createAuthHeaders(apiToken)
  });
  if (response.status === 200 || response.status === 404) {
    // 404 means domain already removed, which is success.
    return {
      success: true,
      message: `Custom domain ${domainId} removed successfully`
    };
  }
  const responseBody = await response.text();
  const errorMessage = errorParser_parseErrorResponseWithStatus(responseBody, response.status, 'Custom domain removal');
  return standardResponse_createErrorResponse(errorMessage);
}

/**
 * Generate a random boundary string for multipart/form-data.
 *
 * @return {string} Boundary string.
 */
function generateBoundary() {
  return `----WebKitFormBoundary${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Build multipart/form-data body for worker deployment.
 *
 * @param {string} script   Worker script content.
 * @param {Object} bindings Worker bindings.
 * @param {string} boundary Boundary string.
 * @return {string} Multipart body.
 */
function buildMultipartBody(script, bindings, boundary) {
  let body = '';

  // Add the worker script as a file part.
  body += `--${boundary}\r\n`;
  body += 'Content-Disposition: form-data; name="worker.js"; filename="worker.js"\r\n';
  body += 'Content-Type: application/javascript+module\r\n\r\n';
  body += script + '\r\n';

  // Add metadata to indicate ES module format.
  const metadata = {
    main_module: 'worker.js' // Cloudflare API requires snake_case
  };

  // Add bindings if provided.
  if (Object.keys(bindings).length > 0) {
    metadata.bindings = bindings;
  }
  body += `--${boundary}\r\n`;
  body += 'Content-Disposition: form-data; name="metadata"\r\n';
  body += 'Content-Type: application/json\r\n\r\n';
  body += JSON.stringify(metadata) + '\r\n';
  body += `--${boundary}--\r\n`;
  return body;
}
;// ./assets/src/providers/cloudflare/CloudflareWorkersProvider.js
/**
 * Cloudflare Workers Provider
 *
 * JavaScript implementation of the Cloudflare Workers edge provider.
 * Provides edge function deployment and management capabilities.
 *
 * @package
 */






// Import from parent plugin's SDK (exposed as window.AetherProviderSDK)
// Access SDK lazily to avoid issues if SDK hasn't loaded yet
function getSDK() {
  if (typeof window === 'undefined' || !window.AetherProviderSDK) {
    return null;
  }
  return window.AetherProviderSDK;
}
function getAbstractProvider() {
  const SDK = getSDK();
  if (SDK && SDK.AbstractProvider && typeof SDK.AbstractProvider === 'function') {
    return SDK.AbstractProvider;
  }
  // Return a placeholder class - this prevents "superclass is not a constructor" error
  return class {
    constructor() {
      throw new Error('AetherProviderSDK.AbstractProvider is not available. ' + 'Make sure the parent plugin (aether-site-exporter) is active and the SDK has loaded.');
    }
  };
}
function getConfigFieldBuilder() {
  const SDK = getSDK();
  return SDK?.ConfigFieldBuilder || null;
}
function getDeploymentTypes() {
  const SDK = getSDK();
  return SDK?.DEPLOYMENT_TYPES || {};
}

// Get these at module load time with fallbacks
const SDK = getSDK();
const ConfigFieldBuilder = getConfigFieldBuilder();
const DEPLOYMENT_TYPES = getDeploymentTypes();

/**
 * CloudflareWorkersProvider class
 *
 * Provides Cloudflare Workers edge computing platform integration.
 */
class CloudflareWorkersProvider extends getAbstractProvider() {
  /**
   * Provider ID constant.
   *
   * @type {string}
   */
  static ID = 'cloudflare';

  /**
   * Get supported deployment types.
   *
   * Cloudflare Workers support edge functions only.
   *
   * @return {Array<string>} Supported deployment types
   */
  getSupportedDeploymentTypes() {
    const types = getDeploymentTypes();
    return [types.EDGE_FUNCTIONS];
  }

  /**
   * Worker script file paths
   *
   * @type {Object}
   */
  workerScripts = {
    r2: 'assets/workers/CloudflareR2Worker.js',
    git: 'includes/Providers/GitHubPages/assets/worker/index-git.js',
    spaces: 'includes/Providers/DigitalOceanSpaces/assets/worker/index-spaces.js'
  };

  /**
   * Deployment info cache
   *
   * @type {Object}
   */
  deploymentInfo = {};

  /**
   * Get the unique provider identifier.
   *
   * @return {string} Provider ID
   */
  getId() {
    return this.registeredId || CloudflareWorkersProvider.ID;
  }

  /**
   * Get the human-readable provider name.
   *
   * @return {string} Provider name
   */
  getName() {
    return (0,external_wp_i18n_namespaceObject.__)('Cloudflare Workers', 'aether');
  }

  /**
   * Get the provider type.
   *
   * @return {string} Provider type
   */
  getType() {
    return 'edge-computing';
  }

  /**
   * Get the provider description.
   *
   * @return {string} Provider description
   */
  getDescription() {
    return (0,external_wp_i18n_namespaceObject.__)('Deploy edge functions to 200+ global locations with Cloudflare Workers', 'aether');
  }

  /**
   * Get the provider icon.
   *
   * @return {string} Provider icon
   */
  getIcon() {
    return '⚡';
  }

  /**
   * Get provider-specific configuration fields.
   *
   * Note: The deployment_types field is automatically added by AbstractProvider.getConfigFields()
   *
   * @return {Array<Object>} Array of field definitions
   */
  getProviderSpecificConfigFields() {
    const builder = getConfigFieldBuilder();
    if (!builder) {
      throw new Error('ConfigFieldBuilder is not available. Make sure AetherProviderSDK is loaded.');
    }
    return builder.buildAll([builder.text('account_id').label((0,external_wp_i18n_namespaceObject.__)('Account ID', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Your Cloudflare account ID (found in Workers dashboard)', 'aether')).required().pattern('^[a-f0-9]{32}$', (0,external_wp_i18n_namespaceObject.__)('Account ID must be a 32-character hexadecimal string', 'aether')).sensitive(), builder.password('api_token').label((0,external_wp_i18n_namespaceObject.__)('API Token', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Cloudflare API token with Workers permissions', 'aether')).required().sensitive().min(20)]);
  }

  /**
   * Deploy worker to Cloudflare.
   *
   * @param {string}  workerType   Worker type (r2, git, spaces).
   * @param {string}  script       Worker script content.
   * @param {Object}  bindings     Optional worker bindings.
   * @param {boolean} dryRun       Whether to perform dry run.
   * @param {string}  customDomain Optional custom domain to attach.
   * @return {Promise<Object>} Deployment result
   */
  async deployWorker(workerType, script, bindings = {}, dryRun = false, customDomain = null) {
    // Validate worker type
    if (!this.isValidWorkerType(workerType)) {
      return {
        success: false,
        error: `Invalid worker type: ${workerType}`
      };
    }

    // Validate credentials
    const validation = await this.validateCredentials();
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || (0,external_wp_i18n_namespaceObject.__)('Invalid credentials', 'aether')
      };
    }

    // Test API token permissions
    if (!dryRun) {
      const tokenTest = await this.testTokenPermissions();
      if (!tokenTest.success) {
        return {
          success: false,
          error: tokenTest.error || (0,external_wp_i18n_namespaceObject.__)('Token permission test failed', 'aether')
        };
      }
    }

    // Generate worker name
    const workerName = this.generateWorkerName(workerType);

    // Dry run mode
    if (dryRun) {
      const dryRunName = `${workerName}-dry-run`;
      return {
        success: true,
        workerName: dryRunName,
        workerUrl: this.getWorkerUrlFromName(dryRunName),
        workerType,
        message: (0,external_wp_i18n_namespaceObject.__)('Dry run successful', 'aether')
      };
    }
    try {
      const config = await this.getConfig();

      // Deploy to Cloudflare
      const result = await deployWorker(config.account_id, config.api_token, workerName, script, bindings);
      if (!result.success) {
        return result;
      }

      // Save deployment info
      await this.saveDeploymentInfo(workerType, {
        worker_type: workerType,
        workerName,
        workerUrl: result.workerUrl,
        deployed_at: Date.now()
      });
      const response = {
        success: true,
        workerName,
        workerUrl: result.workerUrl,
        workerType,
        message: (0,external_wp_i18n_namespaceObject.__)('Worker deployed successfully', 'aether')
      };

      // Attach custom domain if provided
      if (customDomain) {
        // eslint-disable-next-line no-console
        debug(`[Aether] Attaching custom domain ${customDomain} to worker ${workerName}...`);
        const domainResult = await this.ensureCustomDomainAttached(workerName, customDomain);
        if (domainResult.success) {
          response.custom_domain = customDomain;
          response.domainAttached = true;
          response.message += ` (custom domain attached)`;
          // eslint-disable-next-line no-console
          debug(`[Aether] Custom domain attached successfully`);
        } else {
          response.domainAttached = false;
          response.domainError = domainResult.error;
          // eslint-disable-next-line no-console
          debugWarn(`[Aether] Failed to attach custom domain: ${domainResult.error}`);
          // Don't fail the entire deployment just because domain attachment failed
        }
      }
      return response;
    } catch (error) {
      return {
        success: false,
        error: error.message || (0,external_wp_i18n_namespaceObject.__)('Worker deployment failed', 'aether')
      };
    }
  }

  /**
   * Test connection to Cloudflare Workers API.
   *
   * Uses WordPress REST API endpoint to proxy the request server-side,
   * avoiding CORS issues with direct browser requests to Cloudflare API.
   *
   * @return {Promise<Object>} Connection test result
   */
  async testConnection() {
    // Validate credentials
    const validation = await this.validateCredentials();
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || (0,external_wp_i18n_namespaceObject.__)('Invalid credentials', 'aether')
      };
    }
    try {
      // Get current config
      const config = await this.getConfig();

      // Use REST API endpoint to proxy request server-side (avoids CORS)
      const response = await api({
        path: `/aether/v1/providers/${this.getId()}/test`,
        method: 'POST',
        data: {
          config
        }
      });

      // Handle WP_Error responses (WordPress REST API error format)
      if (response.code && response.message) {
        return {
          success: false,
          error: response.message
        };
      }

      // Handle successful response
      if (response.success) {
        return {
          success: true,
          message: response.message || (0,external_wp_i18n_namespaceObject.__)('Connection successful', 'aether')
        };
      }

      // Handle error response
      return {
        success: false,
        error: response.error || response.message || (0,external_wp_i18n_namespaceObject.__)('Connection test failed', 'aether')
      };
    } catch (error) {
      // Handle network errors or other exceptions
      return {
        success: false,
        error: error?.message || error?.data?.message || error?.error || (0,external_wp_i18n_namespaceObject.__)('Connection test failed', 'aether')
      };
    }
  }

  /**
   * Delete worker from Cloudflare.
   *
   * @param {string}  workerName Worker name to delete.
   * @param {boolean} dryRun     Whether to perform dry run.
   * @return {Promise<Object>} Deletion result
   */
  async deleteWorker(workerName, dryRun = false) {
    // Validate credentials
    const validation = await this.validateCredentials();
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || (0,external_wp_i18n_namespaceObject.__)('Invalid credentials', 'aether')
      };
    }

    // Dry run mode
    if (dryRun) {
      return {
        success: true,
        message: `Dry run: Would delete worker ${workerName}`
      };
    }
    try {
      const config = await this.getConfig();
      const result = await deleteWorker(config.account_id, config.api_token, workerName);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message || (0,external_wp_i18n_namespaceObject.__)('Worker deletion failed', 'aether')
      };
    }
  }

  /**
   * Get deployed worker URL.
   *
   * @param {string} workerType Worker type.
   * @return {string} Worker URL or empty string
   */
  getWorkerUrl(workerType) {
    const deployments = this.getDeploymentInfo();
    if (deployments[workerType] && deployments[workerType].workerUrl) {
      return deployments[workerType].workerUrl;
    }
    return '';
  }

  /**
   * Generate unique worker name.
   *
   * @param {string} workerType Worker type.
   * @return {string} Generated worker name
   */
  generateWorkerName(workerType) {
    const randomId = Math.random().toString(36).substring(2, 10);
    return `aether-${workerType}-${randomId}`;
  }

  /**
   * Get worker URL from worker name.
   *
   * @param {string} workerName Worker name.
   * @return {string} Worker URL
   */
  getWorkerUrlFromName(workerName) {
    return `https://${workerName}.workers.dev`;
  }

  /**
   * Get supported operations.
   *
   * @return {Array<string>} Supported operations
   */
  getSupportedOperations() {
    return ['upload', 'delete', 'copy', 'cors-proxy', 'images', 'stream'];
  }

  /**
   * Validate credentials format.
   *
   * @protected
   * @return {Promise<Object>} Validation result
   */
  async validateCredentials() {
    const config = await this.getConfig();
    if (!config.account_id) {
      return {
        valid: false,
        error: (0,external_wp_i18n_namespaceObject.__)('Account ID is required', 'aether')
      };
    }
    if (!config.api_token) {
      return {
        valid: false,
        error: (0,external_wp_i18n_namespaceObject.__)('API token is required', 'aether')
      };
    }
    return {
      valid: true
    };
  }

  /**
   * Test API token permissions.
   *
   * @protected
   * @return {Promise<Object>} Test result
   */
  async testTokenPermissions() {
    const config = await this.getConfig();
    try {
      const result = await testTokenPermissions(config.account_id, config.api_token);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message || (0,external_wp_i18n_namespaceObject.__)('Token permission test failed', 'aether')
      };
    }
  }

  /**
   * Check if worker type is valid.
   *
   * @protected
   * @param {string} workerType Worker type.
   * @return {boolean} True if valid
   */
  isValidWorkerType(workerType) {
    return ['r2', 'git', 'spaces'].includes(workerType);
  }

  /**
   * Get deployment info.
   *
   * @protected
   * @return {Object} Deployment info
   */
  getDeploymentInfo() {
    return this.deploymentInfo;
  }

  /**
   * Save deployment information for a worker type.
   * Stores deployment info in memory for the current session.
   * Persistence to storage is not needed as this is session-only data.
   *
   * @param {string} workerType Worker type.
   * @param {Object} info       Deployment information.
   * @return {Promise<void>}
   */
  async saveDeploymentInfo(workerType, info) {
    this.deploymentInfo[workerType] = info;
  }

  /**
   * Prepare worker environment variables.
   *
   * @param {string} workerType Worker type.
   * @param {Object} config     Configuration.
   * @return {Object} Environment variables
   */
  prepareWorkerEnvironment(workerType, config) {
    const env = {};
    if (workerType === 'r2') {
      if (config.bucket_name) {
        env.R2_BUCKET = config.bucket_name;
      }
      if (config.account_id) {
        env.CF_ACCOUNT_ID = config.account_id;
      }
    }
    if (workerType === 'media') {
      if (config.bucket_name) {
        env.R2_BUCKET = config.bucket_name;
      }
      if (config.images_account_hash) {
        env.CF_IMAGES_ACCOUNT_HASH = config.images_account_hash;
      }
      if (config.images_api_token) {
        env.CF_IMAGES_TOKEN = config.images_api_token;
      }
    }
    if (workerType === 'spaces') {
      if (config.bucket_name) {
        env.SPACES_BUCKET = config.bucket_name;
      }
      if (config.region) {
        env.SPACES_REGION = config.region;
      }
    }
    return env;
  }

  /**
   * Get Cloudflare zone ID for a hostname.
   *
   * @param {string} hostname Hostname (e.g., "s12y.org" or "https://s12y.org").
   * @return {Promise<string|null>} Zone ID or null if not found.
   */
  async getZoneIdForHostname(hostname) {
    // Clean hostname (remove protocol and paths)
    const cleanHostname = hostname.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    try {
      const config = await this.getConfig();
      const url = `https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(cleanHostname)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${config.api_token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        // eslint-disable-next-line no-console
        debugError(`[Aether] Failed to get zone ID for ${cleanHostname}: HTTP ${response.status}`);
        return null;
      }
      const data = await response.json();
      if (data.result && data.result.length > 0) {
        return data.result[0].id;
      }

      // eslint-disable-next-line no-console
      debugWarn(`[Aether] Zone not found for hostname: ${cleanHostname}`);
      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      debugError('Error getting zone ID:', error.message);
      return null;
    }
  }

  /**
   * Ensure custom domain is attached to worker with conflict resolution.
   * If the domain is already attached to another worker, removes it first.
   *
   * @param {string} workerName Worker name to attach domain to.
   * @param {string} hostname   Domain hostname to attach.
   * @return {Promise<Object>} Result with success and optional error/message.
   */
  async ensureCustomDomainAttached(workerName, hostname) {
    try {
      const config = await this.getConfig();

      // Get zone ID for the hostname
      const zoneId = await this.getZoneIdForHostname(hostname);
      if (!zoneId) {
        return {
          success: false,
          error: (0,external_wp_i18n_namespaceObject.__)('Zone not found for hostname. Ensure the domain is added to your Cloudflare account.', 'aether')
        };
      }

      // Try to attach the domain
      const attachResult = await attachCustomDomain(config.account_id, config.api_token, workerName, hostname, zoneId);

      // If successful, we're done
      if (attachResult.success) {
        // eslint-disable-next-line no-console
        debug(`[Aether] Custom domain ${hostname} attached to worker ${workerName}`);
        return {
          success: true,
          message: `Custom domain attached successfully`
        };
      }

      // If failed, check if it's a conflict (domain already attached)
      // Common error codes: 409 (conflict) or error messages containing "already"
      const isConflict = attachResult.statusCode === 409 || attachResult.error && attachResult.error.toLowerCase().includes('already');
      if (!isConflict) {
        // Different error, return it
        return attachResult;
      }

      // Domain is already attached to another worker, try to resolve conflict
      // eslint-disable-next-line no-console
      debug(`[Aether] Domain ${hostname} is already attached, attempting to resolve conflict...`);

      // List all custom domains
      const listResult = await listCustomDomains(config.account_id, config.api_token);
      if (!listResult.success) {
        return {
          success: false,
          error: `Failed to list custom domains: ${listResult.error}`
        };
      }

      // Find the domain we want to attach
      const cleanHostname = hostname.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const existingDomain = listResult.domains.find(domain => domain.hostname === cleanHostname);
      if (!existingDomain) {
        return {
          success: false,
          error: (0,external_wp_i18n_namespaceObject.__)('Domain conflict detected but could not find existing assignment', 'aether')
        };
      }

      // eslint-disable-next-line no-console
      debug(`[Aether] Removing domain from old worker: ${existingDomain.service}`);

      // Remove the domain from the old worker
      const removeResult = await removeCustomDomain(config.account_id, config.api_token, existingDomain.id);
      if (!removeResult.success) {
        return {
          success: false,
          error: `Failed to remove old domain assignment: ${removeResult.error}`
        };
      }

      // eslint-disable-next-line no-console
      debug(`[Aether] Domain removed from old worker, retrying attachment...`);

      // Retry attaching to new worker
      const retryResult = await attachCustomDomain(config.account_id, config.api_token, workerName, hostname, zoneId);
      if (retryResult.success) {
        // eslint-disable-next-line no-console
        debug(`[Aether] Custom domain ${hostname} successfully attached to worker ${workerName} after conflict resolution`);
        return {
          success: true,
          message: `Custom domain attached successfully (replaced old assignment)`
        };
      }
      return retryResult;
    } catch (error) {
      // eslint-disable-next-line no-console
      debugError('[Aether] Error ensuring custom domain:', error.message);
      return {
        success: false,
        error: error.message || (0,external_wp_i18n_namespaceObject.__)('Failed to attach custom domain', 'aether')
      };
    }
  }
}
/* harmony default export */ const cloudflare_CloudflareWorkersProvider = ((/* unused pure expression or super */ null && (CloudflareWorkersProvider)));
;// ./assets/src/providers/cloudflare/index.js
/**
 * Cloudflare Workers Provider Registration
 *
 * Registers the Cloudflare Workers provider class and settings component via WordPress hooks.
 *
 * @package
 */






// Debug: Log that this script is loading
// eslint-disable-next-line no-console

console.log('[Aether Providers] Cloudflare Workers script loaded');

// Track if provider has been registered to prevent duplicate registration
let providerRegistered = false;

/**
 * Register provider with the registry
 */
function registerProvider(SDK) {
  // Prevent duplicate registration
  if (providerRegistered) {
    return;
  }

  // Use SDK from parameter or try to get from window
  if (!SDK && typeof window !== 'undefined') {
    SDK = window.AetherProviderSDK;
  }
  if (!SDK || !SDK.ProviderRegistry) {
    return false;
  }
  try {
    providerRegistered = true;
    const registry = SDK.ProviderRegistry.getInstance();
    registry.register(CloudflareWorkersProvider.ID, CloudflareWorkersProvider);
    // eslint-disable-next-line no-console
    console.log('[Aether Providers] Cloudflare Workers provider registered:', CloudflareWorkersProvider.ID);
    // Force auto-discovery to ensure the registry picks up the new provider
    registry.autoDiscover(true);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Aether Providers] Error registering Cloudflare Workers:', error);
    providerRegistered = false;
    return false;
  }
}

// Hook into SDK ready action - the action passes the SDK object directly
(0,external_wp_hooks_namespaceObject.addAction)('aether.provider.sdk.ready', 'cloudflare/sdk-ready', SDK => {
  registerProvider(SDK);
});

// Also hook into the provider registration action (fallback)
(0,external_wp_hooks_namespaceObject.addAction)('aether.providers.register', 'cloudflare/register', registry => {
  registry.register(CloudflareWorkersProvider.ID, CloudflareWorkersProvider);
  // eslint-disable-next-line no-console
  console.log('[Aether Providers] Cloudflare Workers provider registered via action:', CloudflareWorkersProvider.ID);
});

// Check if SDK is already available on window (fallback)
if (typeof window !== 'undefined' && window.AetherProviderSDK && typeof window.AetherProviderSDK.AbstractProvider === 'function') {
  registerProvider();
}

// Register the settings component via action hook
(0,external_wp_hooks_namespaceObject.addAction)('aether.admin.provider.settings', 'cloudflare/settings', (providerId, container) => {
  if (providerId === 'cloudflare' && container) {
    (0,external_wp_element_namespaceObject.render)(/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(CloudflareWorkersSettings, {
      providerId: providerId
    }), container);
  }
});
/******/ })()
;