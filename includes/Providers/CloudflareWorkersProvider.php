<?php

/**
 * Cloudflare Workers Provider
 *
 * PHP provider class for Cloudflare Workers edge computing platform.
 * Provides edge function deployment and management capabilities.
 *
 * @package Aether\SiteExporterProviders\Providers
 */

namespace Aether\SiteExporterProviders\Providers;

use Aether\SiteExporter\Providers\BaseProvider;

/**
 * Cloudflare Workers provider class.
 *
 * Provides Cloudflare Workers edge computing platform integration.
 */
class CloudflareWorkersProvider extends BaseProvider
{
	/**
	 * Provider ID.
	 *
	 * @var string
	 */
	private const PROVIDER_ID = 'cloudflare';

	/**
	 * Get the unique provider identifier.
	 *
	 * @return string Provider ID
	 */
	public function getId(): string
	{
		return self::PROVIDER_ID;
	}

	/**
	 * Get the human-readable provider name.
	 *
	 * @return string Provider name
	 */
	public function getName(): string
	{
		return \__('Cloudflare Workers', 'aether-site-exporter-providers');
	}

	/**
	 * Get the provider description.
	 *
	 * @return string Provider description
	 */
	public function getDescription(): string
	{
		return \__('Deploy edge functions to 200+ global locations with Cloudflare Workers', 'aether-site-exporter-providers');
	}

	/**
	 * Get deployment types this provider supports.
	 *
	 * @return array<string> Array of deployment types
	 */
	public function getDeploymentTypes(): array
	{
		return ['edge_functions'];
	}

	/**
	 * Get provider type.
	 *
	 * @return string Provider type
	 */
	public function getType(): string
	{
		return 'edge-computing';
	}

	/**
	 * Get provider settings fields definition.
	 *
	 * @return array<array<string, mixed>> Array of field definitions
	 */
	public function getSettings(): array
	{
		return [
			[
				'type' => 'checkbox-group',
				'label' => \__('Deployment Types', 'aether-site-exporter-providers'),
				'name' => 'deployment_types',
				'sanitize_callback' => function ($value) {
					if (! \is_array($value)) {
						return ['edge_functions'];
					}
					$validTypes = ['static_site', 'blueprint_bundle', 'edge_functions'];
					return \array_values(\array_intersect($value, $validTypes));
				},
				'get' => function () {
					$settings = \get_option('aether_site_exporter_settings', []);
					$deploymentTypes = $settings['providers'][self::PROVIDER_ID]['deployment_types'] ?? null;
					// Default to edge_functions if not set
					if (! \is_array($deploymentTypes) || empty($deploymentTypes)) {
						return ['edge_functions'];
					}
					return $deploymentTypes;
				},
				'set' => function ($value) {
					$settings = \get_option('aether_site_exporter_settings', []);
					if (! isset($settings['providers']) || ! \is_array($settings['providers'])) {
						$settings['providers'] = [];
					}
					if (! isset($settings['providers'][self::PROVIDER_ID]) || ! \is_array($settings['providers'][self::PROVIDER_ID])) {
						$settings['providers'][self::PROVIDER_ID] = [];
					}
					$settings['providers'][self::PROVIDER_ID]['deployment_types'] = $value;
					\update_option('aether_site_exporter_settings', $settings);
				},
			],
			[
				'type' => 'text',
				'label' => \__('Account ID', 'aether-site-exporter-providers'),
				'name' => 'account_id',
				'sanitize_callback' => function ($value) {
					if (! \is_string($value)) {
						return '';
					}
					$value = \sanitize_text_field($value);
					// Validate pattern: 32-character hexadecimal string
					if (! \preg_match('/^[a-f0-9]{32}$/', $value)) {
						return '';
					}
					return $value;
				},
				'get' => function () {
					$settings = \get_option('aether_site_exporter_settings', []);
					return $settings['providers'][self::PROVIDER_ID]['account_id'] ?? '';
				},
				'set' => function ($value) {
					$settings = \get_option('aether_site_exporter_settings', []);
					if (! isset($settings['providers']) || ! \is_array($settings['providers'])) {
						$settings['providers'] = [];
					}
					if (! isset($settings['providers'][self::PROVIDER_ID]) || ! \is_array($settings['providers'][self::PROVIDER_ID])) {
						$settings['providers'][self::PROVIDER_ID] = [];
					}
					$settings['providers'][self::PROVIDER_ID]['account_id'] = $value;
					\update_option('aether_site_exporter_settings', $settings);
				},
			],
			[
				'type' => 'password',
				'label' => \__('API Token', 'aether-site-exporter-providers'),
				'name' => 'api_token',
				'sanitize_callback' => function ($value) {
					if (! \is_string($value)) {
						return '';
					}
					// Validate length: min 20
					$length = \strlen($value);
					if ($length < 20) {
						return '';
					}
					return $value; // Store as-is, encryption handled by REST API
				},
				'get' => function () {
					$settings = \get_option('aether_site_exporter_settings', []);
					return $settings['providers'][self::PROVIDER_ID]['api_token'] ?? '';
				},
				'set' => function ($value) {
					$settings = \get_option('aether_site_exporter_settings', []);
					if (! isset($settings['providers']) || ! \is_array($settings['providers'])) {
						$settings['providers'] = [];
					}
					if (! isset($settings['providers'][self::PROVIDER_ID]) || ! \is_array($settings['providers'][self::PROVIDER_ID])) {
						$settings['providers'][self::PROVIDER_ID] = [];
					}
					$settings['providers'][self::PROVIDER_ID]['api_token'] = $value;
					\update_option('aether_site_exporter_settings', $settings);
				},
			],
		];
	}
}

