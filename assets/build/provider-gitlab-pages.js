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
function createAuthHeaders(token, type = 'Bearer') {
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
function parseErrorResponseWithStatus(responseText, statusCode, operation) {
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
function createSuccessResponse(data = null, message = null) {
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
function createErrorResponse(error, errors = null) {
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
    return createErrorResponse(response.error, response.errors);
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
    return createSuccessResponse(data);
  }

  // Legacy format with success=false
  if (response && response.success === false) {
    return createErrorResponse(response.message || response.error || 'Operation failed', response.errors);
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
    const authHeaders = createAuthHeaders(this.apiToken);
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
        return createErrorResponse(error, data.errors || []);
      }
      return createSuccessResponse({
        result: data.result
      });
    } catch (error) {
      debugError(`Cloudflare API request failed (${endpoint}):`, error);
      return createErrorResponse(error.message || 'Network request failed');
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
      return createSuccessResponse({
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
          return createErrorResponse(response.error || 'Worker deployment failed');
        }
        return createSuccessResponse({
          workerName: response.worker_name,
          workerUrl: response.worker_url
        });
      } catch (error) {
        return createErrorResponse(error.message || 'Worker deployment failed');
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
        return createErrorResponse(response.error || 'Worker deployment failed');
      }

      // Get the worker URL.
      const workerUrl = this.getWorkerUrlFromName(workerName);

      // Try to enable workers.dev subdomain.
      await this.enableWorkersDevSubdomain(workerName);
      return createSuccessResponse({
        workerName,
        workerUrl
      });
    } catch (error) {
      return createErrorResponse(error.message || 'Worker deployment failed');
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
        return createErrorResponse(subdomainResponse.error);
      }
      const subdomain = subdomainResponse.data?.result?.subdomain;
      if (!subdomain) {
        debugWarn('No workers.dev subdomain configured');
        return createErrorResponse('No subdomain configured');
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
        return createErrorResponse(enableResponse.error);
      }
      return createSuccessResponse();
    } catch (error) {
      debugWarn('Error enabling workers.dev subdomain:', error);
      return createErrorResponse(error.message);
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
      return createSuccessResponse({
        deployed: false
      }, 'Worker not deployed');
    }

    // Test API token permissions via direct Cloudflare API call.
    try {
      const listResponse = await this.listWorkers();
      if (!listResponse.success) {
        return createErrorResponse(listResponse.error || 'Failed to verify API token permissions');
      }
    } catch (error) {
      return createErrorResponse(error.message || 'Token permission test failed');
    }

    // Try to fetch worker info via direct Cloudflare API call.
    const workerName = this.extractWorkerNameFromUrl(workerUrl);
    if (workerName) {
      try {
        const workerInfo = await this.getWorker(workerName);
        if (workerInfo.success) {
          return createSuccessResponse({
            deployed: true,
            workerUrl
          }, 'Worker is deployed and accessible');
        }
      } catch (error) {
        // Worker might not exist yet, continue
      }
    }
    return createSuccessResponse({
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
      return createErrorResponse(response.error || 'Failed to list workers');
    }
    return createSuccessResponse({
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
      return createErrorResponse(response.error || 'Failed to get worker info');
    }
    return createSuccessResponse({
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
      return createErrorResponse(response.error || 'Failed to get zone ID');
    }
    const zones = response.data?.result || [];
    if (zones.length === 0) {
      return createErrorResponse(`No zone found for hostname: ${hostname}`);
    }
    return createSuccessResponse({
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
      return createErrorResponse(response.error || 'Failed to attach worker to custom domain');
    }
    return createSuccessResponse(null, `Worker attached to ${cleanHostname}`);
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
;// ./assets/src/providers/gitlab-pages/Settings.js
/**
 * GitLab Pages Provider Settings Component
 *
 * @package
 */








function GitLabPagesSettings({
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
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(SecretField, {
      label: (0,external_wp_i18n_namespaceObject.__)('Personal Access Token', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('GitLab Personal Access Token with api and write_repository permissions', 'aether'),
      value: settings.personal_access_token || '',
      onChange: value => handleChange('personal_access_token', value),
      placeholder: (0,external_wp_i18n_namespaceObject.__)('Enter personal access token', 'aether')
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Project ID', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('GitLab project ID (numeric)', 'aether'),
      value: settings.project_id || '',
      onChange: value => handleChange('project_id', value),
      required: true,
      pattern: "^\\d+$",
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Namespace (Optional)', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('GitLab namespace (username or group) for Pages URL generation', 'aether'),
      value: settings.namespace || '',
      onChange: value => handleChange('namespace', value),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Project Path (Optional)', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('Project path for Pages URL generation', 'aether'),
      value: settings.project_path || '',
      onChange: value => handleChange('project_path', value),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Branch', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('Git branch name (default: main)', 'aether'),
      value: settings.branch || 'main',
      onChange: value => handleChange('branch', value),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Git Worker URL (Optional)', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('CORS proxy worker for browser-based Git operations (for WordPress Playground)', 'aether'),
      value: settings.git_worker_url || '',
      onChange: value => handleChange('git_worker_url', value),
      type: "url",
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.CheckboxControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Enable GitLab Pages', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('Enable static site hosting via GitLab Pages', 'aether'),
      checked: settings.pages_enabled || false,
      onChange: value => handleChange('pages_enabled', value),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('GitLab Pages URL (Optional)', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('Auto-detected if left empty', 'aether'),
      value: settings.pages_url || '',
      onChange: value => handleChange('pages_url', value),
      type: "url",
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Custom Domain (Optional)', 'aether'),
      help: (0,external_wp_i18n_namespaceObject.__)('Custom domain for GitLab Pages (e.g., https://www.example.com)', 'aether'),
      value: settings.custom_domain || '',
      onChange: value => handleChange('custom_domain', value),
      type: "url",
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(ProviderActions, {
      providerId: providerId,
      requiresWorker: false
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
;// ./assets/src/providers/git/AbstractGitProvider.js
/**
 * Abstract Git Provider Base Class
 *
 * Base class for all Git-based providers (GitHub, GitLab, Bitbucket, etc.).
 * Provides common Git operations and functionality shared by all Git providers.
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
 * AbstractGitProvider class
 *
 * Abstract base class for Git-based storage providers.
 * Subclasses must implement provider-specific methods.
 */
class AbstractGitProvider extends getAbstractProvider() {
  /**
   * Get supported deployment types.
   *
   * Git providers support blueprint bundles and static sites.
   *
   * @return {Array<string>} Supported deployment types
   */
  getSupportedDeploymentTypes() {
    const types = getDeploymentTypes();
    return [types.BLUEPRINT_BUNDLE, types.STATIC_SITE];
  }

  /**
   * Whether this provider is experimental.
   *
   * Git-based providers are currently experimental.
   *
   * @type {boolean}
   */
  experimental = true;

  /**
   * Get the human-readable provider name.
   *
   * Appends "(Experimental)" suffix if provider is experimental.
   *
   * @return {string} Provider name with experimental suffix if applicable
   */
  getName() {
    const baseName = this.getBaseName();
    if (this.experimental) {
      return (0,external_wp_i18n_namespaceObject.sprintf)(/* translators: %s: Provider name */
      (0,external_wp_i18n_namespaceObject.__)('%s (Experimental)', 'aether'), baseName);
    }
    return baseName;
  }

  /**
   * Get the base provider name without experimental suffix.
   *
   * Must be implemented by subclasses.
   *
   * @abstract
   * @return {string} Base provider name
   */
  getBaseName() {
    throw new Error('AbstractGitProvider.getBaseName() must be implemented by subclass');
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
   * Get provider-specific configuration fields.
   *
   * Defines common Git fields shared by all Git providers.
   * Subclasses should override and call super.getProviderSpecificConfigFields() to add provider-specific fields.
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
    return builder.buildAll([builder.password('personal_access_token').label((0,external_wp_i18n_namespaceObject.__)('Personal Access Token', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Personal access token with repository write permissions', 'aether')).required().sensitive().min(20).max(255), builder.text('branch').label((0,external_wp_i18n_namespaceObject.__)('Branch', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Git branch name (default: main)', 'aether')).default('main'), builder.url('git_worker_url').label((0,external_wp_i18n_namespaceObject.__)('Git Worker URL (Optional)', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('CORS proxy worker for browser-based Git operations (for WordPress Playground)', 'aether'))]);
  }

  /**
   * Normalize Git URL to ensure it ends with .git
   *
   * @param {string} url Git repository URL.
   * @return {string} Normalized Git URL
   */
  normalizeGitUrl(url) {
    if (!url) {
      return '';
    }
    return url.endsWith('.git') ? url : url + '.git';
  }

  /**
   * Get Git CORS proxy URL from settings.
   *
   * @return {Promise<string|null>} Proxy URL or null if not available
   */
  async getGitProxyUrl() {
    const config = await this.getConfig();
    if (config.git_worker_url) {
      return config.git_worker_url;
    }

    // Try to get worker endpoint from storage provider settings
    try {
      const restUrl = getRestUrl();
      const nonceMeta = document.querySelector('meta[name="aether-rest-nonce"]');
      const nonce = nonceMeta ? nonceMeta.getAttribute('content') : '';
      const settingsResponse = await fetch(`${restUrl}settings`, {
        headers: {
          'X-WP-Nonce': nonce
        }
      });
      if (settingsResponse.ok) {
        const settings = await settingsResponse.json();
        const workerEndpoint = settings?.providers?.[settings?.provider_types?.storage]?.worker_endpoint;
        if (workerEndpoint) {
          return workerEndpoint;
        }
      }
    } catch (error) {
      // Worker endpoint not available, return null
    }
    return null;
  }

  /**
   * Get Git authentication object for isomorphic-git.
   *
   * @return {Promise<Object>} Auth object with username and password
   */
  async getGitAuth() {
    const config = await this.getConfig();
    return {
      username: config.personal_access_token || '',
      password: ''
    };
  }

  /**
   * Get the Git repository URL.
   *
   * Must be implemented by subclasses to construct provider-specific Git URL.
   *
   * @abstract
   * @return {Promise<string>} Full Git repository URL
   */
  async getGitRepositoryUrl() {
    throw new Error('AbstractGitProvider.getGitRepositoryUrl() must be implemented by subclass');
  }

  /**
   * Get the API base URL for this provider.
   *
   * Must be implemented by subclasses to return provider-specific API base URL.
   *
   * @abstract
   * @return {string} API base URL
   */
  getApiBaseUrl() {
    throw new Error('AbstractGitProvider.getApiBaseUrl() must be implemented by subclass');
  }

  /**
   * Test connection to provider API.
   *
   * Must be implemented by subclasses to test provider-specific API connection.
   *
   * @abstract
   * @return {Promise<Object>} Connection test result
   */
  async testConnection() {
    throw new Error('AbstractGitProvider.testConnection() must be implemented by subclass');
  }

  /**
   * Get Git configuration for browser-side uploads.
   *
   * Returns configuration object compatible with useGitUpload hook.
   *
   * @return {Promise<Object>} Git configuration object
   */
  async getGitConfig() {
    const config = await this.getConfig();
    const gitUrl = await this.getGitRepositoryUrl();
    return {
      config: {
        gitUrl: this.normalizeGitUrl(gitUrl),
        branch: config.branch || 'main',
        personalAccessToken: config.personal_access_token || ''
      }
    };
  }

  /**
   * Get the upload strategy for Git-based providers.
   *
   * All Git providers use 'git' upload strategy.
   *
   * @return {string} Upload strategy: 'git'
   */
  getUploadStrategy() {
    return 'git';
  }
}
/* harmony default export */ const git_AbstractGitProvider = ((/* unused pure expression or super */ null && (AbstractGitProvider)));
;// ./assets/src/providers/gitlab/GitLabProvider.js
/**
 * GitLab Provider
 *
 * JavaScript implementation of the GitLab provider.
 * Provides Git-based storage using GitLab repositories.
 *
 * @package
 */





// Import from parent plugin's SDK (exposed as window.AetherProviderSDK)
const {
  ConfigFieldBuilder: GitLabProvider_ConfigFieldBuilder
} = window.AetherProviderSDK || {};

/**
 * GitLabProvider class
 *
 * Provides Git-based file storage using GitLab repositories.
 * Uses GitLab API and isomorphic-git for browser-based deployment.
 *
 * Inherits deployment types from AbstractGitProvider (BLUEPRINT_BUNDLE + STATIC_SITE).
 */
class GitLabProvider extends AbstractGitProvider {
  /**
   * Provider ID constant.
   *
   * @type {string}
   */
  static ID = 'gitlab';

  /**
   * Get the unique provider identifier.
   *
   * @return {string} Provider ID
   */
  getId() {
    return this.registeredId || GitLabProvider.ID;
  }

  /**
   * Get the base provider name without experimental suffix.
   *
   * @return {string} Base provider name
   */
  getBaseName() {
    return (0,external_wp_i18n_namespaceObject.__)('GitLab', 'aether');
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
   * Get the provider description.
   *
   * @return {string} Provider description
   */
  getDescription() {
    return (0,external_wp_i18n_namespaceObject.__)('Git-based file storage using GitLab repositories. Uses GitLab API and isomorphic-git for browser-based deployment.', 'aether');
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
   * Includes common Git fields from AbstractGitProvider plus GitLab-specific fields.
   *
   * @return {Array<Object>} Array of field definitions
   */
  getProviderSpecificConfigFields() {
    // Get base Git fields from AbstractGitProvider (already built)
    const baseFields = super.getProviderSpecificConfigFields();

    // Add GitLab-specific fields
    const SDK = window.AetherProviderSDK;
    const builder = SDK?.ConfigFieldBuilder;
    if (!builder) {
      throw new Error('ConfigFieldBuilder is not available. Make sure AetherProviderSDK is loaded.');
    }
    const gitlabFields = builder.buildAll([builder.text('project_id').label((0,external_wp_i18n_namespaceObject.__)('Project ID', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('GitLab project ID (numeric)', 'aether')).required().pattern('^\\d+$', (0,external_wp_i18n_namespaceObject.__)('Project ID must be numeric', 'aether')), builder.text('namespace').label((0,external_wp_i18n_namespaceObject.__)('Namespace (Optional)', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('GitLab namespace (username or group) for repository URL', 'aether')), builder.text('project_path').label((0,external_wp_i18n_namespaceObject.__)('Project Path (Optional)', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Project path for repository URL', 'aether'))]);

    // Combine base fields and GitLab-specific fields
    return [...baseFields, ...gitlabFields];
  }

  /**
   * Get the API base URL for GitLab.
   *
   * @return {string} API base URL
   */
  getApiBaseUrl() {
    return 'https://gitlab.com/api/v4';
  }

  /**
   * Get the Git repository URL.
   *
   * Constructs GitLab repository URL from namespace and projectPath, or uses projectId.
   *
   * @return {Promise<string>} Full Git repository URL
   */
  async getGitRepositoryUrl() {
    const config = await this.getConfig();

    // If namespace and project_path are provided, use them
    if (config.namespace && config.project_path) {
      return `https://gitlab.com/${config.namespace}/${config.project_path}.git`;
    }

    // If only project_id is provided, fetch project info from GitLab API
    if (config.project_id) {
      // If we have namespace, try to use it with project_id
      if (config.namespace) {
        // Try to fetch project info to get the full path
        try {
          const apiUrl = this.getApiBaseUrl();
          const projectInfo = await fetch(`${apiUrl}/projects/${config.project_id}`, {
            headers: {
              Authorization: `Bearer ${config.personal_access_token}`
            }
          });
          if (projectInfo.ok) {
            const project = await projectInfo.json();
            if (project.path_with_namespace) {
              return `https://gitlab.com/${project.path_with_namespace}.git`;
            }
          }
        } catch (error) {
          debugWarn('Failed to fetch project info from GitLab API:', error);
        }

        // Fallback: use namespace with project_id (may not work for all cases)
        return `https://gitlab.com/${config.namespace}/${config.project_id}.git`;
      }

      // If no namespace, fetch project info to get full path
      if (config.personal_access_token) {
        try {
          const apiUrl = this.getApiBaseUrl();
          const projectInfo = await fetch(`${apiUrl}/projects/${config.project_id}`, {
            headers: {
              Authorization: `Bearer ${config.personal_access_token}`
            }
          });
          if (projectInfo.ok) {
            const project = await projectInfo.json();
            if (project.path_with_namespace) {
              return `https://gitlab.com/${project.path_with_namespace}.git`;
            }
            if (project.web_url) {
              // Extract namespace and path from web_url
              const urlMatch = project.web_url.match(/https?:\/\/[^\/]+\/(.+)/);
              if (urlMatch) {
                return `https://gitlab.com/${urlMatch[1]}.git`;
              }
            }
          }
        } catch (error) {
          debugWarn('Failed to fetch project info from GitLab API:', error);
        }
      }

      // Last fallback: return URL with project_id (may not work for all GitLab instances)
      return `https://gitlab.com/projects/${config.project_id}.git`;
    }
    throw new Error((0,external_wp_i18n_namespaceObject.__)('GitLab repository URL cannot be constructed. Please provide namespace and project_path, or project_id with personal_access_token.', 'aether'));
  }

  /**
   * Test connection to GitLab API.
   *
   * @return {Promise<Object>} Connection test result
   */
  async testConnection() {
    const config = await this.getConfig();
    if (!config.personal_access_token) {
      return {
        success: false,
        error: (0,external_wp_i18n_namespaceObject.__)('Personal access token is required', 'aether')
      };
    }
    try {
      const apiUrl = this.getApiBaseUrl();
      const response = await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${config.personal_access_token}`
        }
      });
      if (!response.ok) {
        return {
          success: false,
          error: (0,external_wp_i18n_namespaceObject.sprintf)(/* translators: %d: HTTP status code */
          (0,external_wp_i18n_namespaceObject.__)('GitLab API returned status %d', 'aether'), response.status)
        };
      }
      const userData = await response.json();

      // If project_id is provided, verify project access
      if (config.project_id) {
        const projectResponse = await fetch(`${apiUrl}/projects/${config.project_id}`, {
          headers: {
            Authorization: `Bearer ${config.personal_access_token}`
          }
        });
        if (!projectResponse.ok) {
          return {
            success: false,
            error: (0,external_wp_i18n_namespaceObject.__)('Cannot access GitLab project. Please verify project ID and token permissions.', 'aether')
          };
        }
      }
      return {
        success: true,
        message: (0,external_wp_i18n_namespaceObject.sprintf)(/* translators: %s: GitLab username */
        (0,external_wp_i18n_namespaceObject.__)('Successfully connected to GitLab as %s', 'aether'), userData.username || userData.name)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || (0,external_wp_i18n_namespaceObject.__)('Failed to connect to GitLab API', 'aether')
      };
    }
  }
}
/* harmony default export */ const gitlab_GitLabProvider = ((/* unused pure expression or super */ null && (GitLabProvider)));
;// ./assets/src/providers/gitlab-pages/GitLabPagesProvider.js
/**
 * GitLab Pages Provider
 *
 * JavaScript implementation of the GitLab Pages provider.
 * Provides GitLab Pages static site hosting.
 * Extends GitLabProvider to inherit Git-based storage functionality.
 *
 * @package
 */




// Import from parent plugin's SDK (exposed as window.AetherProviderSDK)
const {
  ConfigFieldBuilder: GitLabPagesProvider_ConfigFieldBuilder,
  DEPLOYMENT_TYPES: GitLabPagesProvider_DEPLOYMENT_TYPES
} = window.AetherProviderSDK || {};

/**
 * GitLabPagesProvider class
 *
 * Provides GitLab Pages static site hosting.
 * Extends GitLabProvider to inherit Git-based storage functionality.
 * Uses GitLab API and isomorphic-git for browser-based deployment.
 */
class GitLabPagesProvider extends GitLabProvider {
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
    return [types.STATIC_SITE];
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
    return (0,external_wp_i18n_namespaceObject.__)('GitLab Pages', 'aether');
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
    return (0,external_wp_i18n_namespaceObject.__)('GitLab Pages static site hosting with automatic CI/CD pipelines. Uses GitLab API and isomorphic-git for browser-based deployment.', 'aether');
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
    if (!builder) {
      throw new Error('ConfigFieldBuilder is not available. Make sure AetherProviderSDK is loaded.');
    }
    const pagesFields = builder.buildAll([builder.checkbox('pages_enabled').label((0,external_wp_i18n_namespaceObject.__)('Enable GitLab Pages', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Enable static site hosting via GitLab Pages', 'aether')).default(true), builder.url('pages_url').label((0,external_wp_i18n_namespaceObject.__)('GitLab Pages URL (Optional)', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Auto-detected if namespace provided (e.g., https://namespace.gitlab.io/project)', 'aether')), builder.url('custom_domain').label((0,external_wp_i18n_namespaceObject.__)('Custom Domain (Optional)', 'aether')).description((0,external_wp_i18n_namespaceObject.__)('Custom domain for GitLab Pages (e.g., https://www.example.com)', 'aether'))]);

    // Combine base fields and Pages-specific fields
    return [...baseFields, ...pagesFields];
  }

  /**
   * Deploy to GitLab Pages.
   *
   * @return {Promise<Object>} Deployment result
   */
  async deploy() {
    const configured = await this.isConfigured();
    if (!configured) {
      return {
        success: false,
        message: (0,external_wp_i18n_namespaceObject.__)('Cannot deploy: provider is not configured.', 'aether')
      };
    }
    return {
      success: true,
      message: (0,external_wp_i18n_namespaceObject.__)('GitLab Pages deployment is automatic when files are pushed to the repository.', 'aether')
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
    status.pages_enabled = Boolean(config.pages_enabled);
    status.hasCustomDomain = Boolean(config.custom_domain);
    status.supportsBrowserGit = Boolean(config.git_worker_url);
    return status;
  }
}
/* harmony default export */ const gitlab_pages_GitLabPagesProvider = ((/* unused pure expression or super */ null && (GitLabPagesProvider)));
;// ./assets/src/providers/gitlab-pages/index.js
/**
 * GitLab Pages Provider Registration
 *
 * Registers the GitLab Pages provider class and settings component via WordPress hooks.
 *
 * @package
 */






// Debug: Log that this script is loading
// eslint-disable-next-line no-console

console.log('[Aether Providers] GitLab Pages script loaded');

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
    registry.register(GitLabPagesProvider.ID, GitLabPagesProvider);
    // eslint-disable-next-line no-console
    console.log('[Aether Providers] GitLab Pages provider registered:', GitLabPagesProvider.ID);
    // Force auto-discovery to ensure the registry picks up the new provider
    registry.autoDiscover(true);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Aether Providers] Error registering GitLab Pages:', error);
    providerRegistered = false;
    return false;
  }
}

// Hook into SDK ready action - the action passes the SDK object directly
(0,external_wp_hooks_namespaceObject.addAction)('aether.provider.sdk.ready', 'gitlab-pages/sdk-ready', SDK => {
  registerProvider(SDK);
});

// Also hook into the provider registration action (fallback)
(0,external_wp_hooks_namespaceObject.addAction)('aether.providers.register', 'gitlab-pages/register', registry => {
  registry.register(GitLabPagesProvider.ID, GitLabPagesProvider);
  // eslint-disable-next-line no-console
  console.log('[Aether Providers] GitLab Pages provider registered via action:', GitLabPagesProvider.ID);
});

// Check if SDK is already available on window (fallback)
if (typeof window !== 'undefined' && window.AetherProviderSDK && typeof window.AetherProviderSDK.AbstractProvider === 'function') {
  registerProvider();
}

// Register the settings component via action hook
(0,external_wp_hooks_namespaceObject.addAction)('aether.admin.provider.settings', 'gitlab-pages/settings', (providerId, container) => {
  if (providerId === 'gitlab-pages' && container) {
    (0,external_wp_element_namespaceObject.render)(/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(GitLabPagesSettings, {
      providerId: providerId
    }), container);
  }
});
/******/ })()
;