<?php

/**
 * Main Plugin Class
 *
 * @package Aether\SiteExporterProviders
 */

namespace Aether\SiteExporterProviders;

use Aether\SiteExporterProviders\Providers\CloudflareR2Provider;
use Aether\SiteExporterProviders\Providers\CloudflareWorkersProvider;

\defined('ABSPATH') || exit;

/**
 * Main plugin orchestrator class.
 */
class Plugin
{
	/**
	 * Plugin instance.
	 *
	 * @var Plugin|null
	 */
	private static ?self $instance = null;

	/**
	 * Get plugin instance.
	 *
	 * @return Plugin
	 */
	public static function getInstance(): self
	{
		if (null === self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct()
	{
		$this->init();
	}

	/**
	 * Initialize the plugin.
	 *
	 * @return void
	 */
	private function init(): void
	{
		// Load translations.
		\add_action('init', [ $this, 'loadTextdomain' ]);

		// Register REST API routes.
		\add_action('rest_api_init', [ $this, 'registerRestRoutes' ]);

		// Register providers via filter.
		$this->registerProviders();

		// Enqueue provider scripts AFTER SDK (priority 20, SDK loads at default priority).
		\add_action('admin_enqueue_scripts', [ $this, 'enqueueProviderScripts' ], 20);
	}

	/**
	 * Register providers via aether_providers filter.
	 *
	 * @return void
	 */
	private function registerProviders(): void
	{
		\add_filter('aether_providers', function ($providers) {
			$providers[] = new CloudflareR2Provider();
			$providers[] = new CloudflareWorkersProvider();
			return $providers;
		});
	}

	/**
	 * Load plugin textdomain for translations.
	 *
	 * @return void
	 */
	public function loadTextdomain(): void
	{
		\load_plugin_textdomain(
			'aether-site-exporter-providers',
			false,
			\dirname(\plugin_basename(AETHER_SEP_PLUGIN_FILE)) . '/languages'
		);
	}

	/**
	 * Register REST API routes.
	 *
	 * @return void
	 */
	public function registerRestRoutes(): void
	{
		// Initialize REST controllers.
		$workerScriptController = new REST\WorkerScriptController();

		// Register routes.
		$workerScriptController->registerRoutes();
	}

	/**
	 * Enqueue provider scripts.
	 *
	 * Only enqueue on Aether Site Exporter admin pages.
	 *
	 * @param string $hook Current admin page hook.
	 * @return void
	 */
	public function enqueueProviderScripts(string $hook): void
	{
		// Debug: Log hook and page parameter for troubleshooting
		$page = isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : 'none';
		error_log('[Aether Providers Plugin] Hook received: ' . $hook . ', page: ' . $page);

		// Only enqueue on Aether Site Exporter pages.
		// WordPress admin hooks are formatted like: toplevel_page_aether or aether_page_aether
		// Check for 'aether' in the hook name or check GET parameter
		$hookMatches = strpos($hook, 'aether') !== false;
		$pageMatches = isset($_GET['page']) && strpos(sanitize_text_field(wp_unslash($_GET['page'])), 'aether') !== false;

		if (!$hookMatches && !$pageMatches) {
			error_log('[Aether Providers Plugin] Hook/page does not match Aether pages, skipping');
			return;
		}

		// Debug: Log that we're enqueuing provider scripts
		error_log('[Aether Providers Plugin] Enqueuing provider scripts on hook: ' . $hook);

		$pluginUrl = AETHER_SEP_PLUGIN_URL;
		$buildDir = AETHER_SEP_PLUGIN_DIR . 'assets/build/';

		// List of providers to enqueue.
		$providers = [
			'cloudflare',
			'cloudflare-r2',
		];

		// Enqueue each provider script.
		foreach ($providers as $provider) {
			$assetFile = $buildDir . "provider-{$provider}.asset.php";

			// Skip if asset file doesn't exist.
			if (! file_exists($assetFile)) {
				continue;
			}

			$asset = require $assetFile;

			// Add wp-hooks as dependency to ensure WordPress hooks are available.
			$dependencies = array_merge(
				$asset['dependencies'],
				[ 'wp-hooks' ]
			);

			\wp_enqueue_script(
				"aether-sep-{$provider}",
				$pluginUrl . "assets/build/provider-{$provider}.js",
				$dependencies,
				$asset['version'],
				true
			);

			// Debug: Log each provider script enqueued
			error_log("[Aether Providers Plugin] Enqueued script: aether-sep-{$provider}");
		}
	}
}
