<?php

/**
 * PHPStan Bootstrap File
 *
 * Loads the base plugin's BaseProvider class for static analysis.
 *
 * @package Aether\SiteExporterProviders
 */

// Load BaseProvider from base plugin
$baseProviderPath = __DIR__ . '/../aether-site-exporter/includes/Providers/BaseProvider.php';
if (file_exists($baseProviderPath)) {
	require_once $baseProviderPath;
}
