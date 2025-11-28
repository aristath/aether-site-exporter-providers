<?php

/**
 * REST API Helpers Trait
 *
 * Provides common functionality for REST controllers.
 *
 * @package Altolith\DeployR2\REST
 */

namespace Altolith\DeployR2\REST;

/**
 * Trait providing REST API helper methods.
 */
trait RESTHelpersTrait
{
	/**
	 * Permission check for REST endpoints.
	 *
	 * Requires manage_options capability.
	 *
	 * @return bool True if user has permission.
	 */
	public function permissionCheck(): bool
	{
		return \current_user_can('manage_options');
	}

	/**
	 * Get REST API namespace.
	 *
	 * @return string API namespace.
	 */
	public function getNamespace(): string
	{
		return 'altolith/deploy/providers';
	}
}
