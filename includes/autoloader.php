<?php

/**
 * PSR-4 Autoloader
 *
 * @package Aether\SiteExporterR2
 */

namespace Aether\SiteExporterR2;

// Exit if accessed directly.
if (! defined('ABSPATH')) {
	exit;
}

/**
 * PSR-4 autoloader implementation.
 *
 * @param string $class Fully qualified class name.
 * @return void
 */
spl_autoload_register(
	function ($class) {
		// Project-specific namespace prefix.
		$prefix = 'Aether\\SiteExporterR2\\';

		// Base directory for the namespace prefix.
		$baseDir = __DIR__ . '/';

		// Does the class use the namespace prefix?
		$len = strlen($prefix);
		if (strncmp($prefix, $class, $len) !== 0) {
			// No, move to the next registered autoloader.
			return;
		}

		// Get the relative class name.
		$relativeClass = substr($class, $len);

		// Replace the namespace prefix with the base directory, replace namespace
		// separators with directory separators in the relative class name, append
		// with .php.
		$file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

		// If the file exists, require it.
		if (file_exists($file)) {
			require $file;
		}
	}
);
