/**
 * Cloudflare R2 Provider Modal Hooks
 *
 * Adds custom content to the Cloudflare R2 provider configuration modal.
 * Specifically adds a "Deploy Worker" button for R2 storage worker.
 *
 * @package
 */

import { useState, createRoot } from '@wordpress/element';
import { Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addAction } from '@wordpress/hooks';
import apiFetch from '../../utils/api';

/**
 * Deploy Worker button component for Cloudflare R2.
 *
 * @param {Object}   props            Component props.
 * @param {string}   props.providerId Provider ID.
 * @param {Object}   props.config     Current provider configuration (form values).
 * @param {Function} props.onChange   Optional function to update form field values.
 * @return {JSX.Element} Deploy Worker button.
 */
function DeployWorkerButton( { providerId, config, onChange } ) {
	const [ deploying, setDeploying ] = useState( false );
	const [ error, setError ] = useState( null );
	const [ success, setSuccess ] = useState( false );
	const [ workerUrl, setWorkerUrl ] = useState( null );

	// R2 worker type
	const workerType = 'r2';

	const handleDeploy = async () => {
		setDeploying( true );
		setError( null );
		setSuccess( false );
		setWorkerUrl( null );

		try {
			// Validate R2 credentials
			if (
				! config?.access_key_id ||
				! config?.secret_access_key ||
				! config?.bucket_name
			) {
				throw new Error(
					__(
						'Access Key ID, Secret Access Key, and Bucket Name are required',
						'aether-site-exporter-providers'
					)
				);
			}

			// Get edge provider (Cloudflare Workers) credentials from settings
			const settingsResponse = await apiFetch( {
				path: '/aether/site-exporter/settings',
			} );
			const settings = settingsResponse.settings || {};
			const edgeProvider = settings.providers?.cloudflare || {};

			if ( ! edgeProvider.account_id || ! edgeProvider.api_token ) {
				throw new Error(
					__(
						'Cloudflare Workers provider must be configured first. Please configure the Cloudflare Workers (edge) provider with Account ID and API Token.',
						'aether-site-exporter-providers'
					)
				);
			}

			// Note: Worker script will be loaded directly from file system by the server
			// to avoid any corruption during REST API transfer

			const restUrl = window.wpApiSettings?.root || '/wp-json';

			// Get nonce for authentication
			const nonce =
				document
					.querySelector( 'meta[name="aether-rest-nonce"]' )
					?.getAttribute( 'content' ) ||
				window.wpApiSettings?.nonce ||
				'';

			// Prepare worker bindings for R2
			// Generate worker name (format: aether-r2-{random})
			const randomId = Math.random().toString( 36 ).substring( 2, 10 );
			const workerName = `aether-r2-${ randomId }`;

			// Prepare bindings - R2 bucket binding
			// Format: { bindingName: { type: 'r2_bucket', bucket_name: '...' } }
			const bindings = {};
			if ( config.bucket_name ) {
				bindings.R2_BUCKET = {
					type: 'r2_bucket',
					bucket_name: config.bucket_name,
				};
			}

			// Deploy worker using server-side REST API endpoint (avoids CORS issues)
			const deployEndpoint = `${ restUrl }/aether/site-exporter/providers/cloudflare/deploy-worker`;

			const deployResponse = await fetch( deployEndpoint, {
				method: 'POST',
				headers: {
					'X-WP-Nonce': nonce,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					worker_type: workerType,
					worker_name: workerName,
					// script: script, // Let the server load it directly from file system
					bindings,
					account_id: edgeProvider.account_id,
					api_token: edgeProvider.api_token,
				} ),
			} );

			if ( ! deployResponse.ok ) {
				const errorData = await deployResponse.json().catch( () => ( {
					message: `HTTP ${ deployResponse.status }: ${ deployResponse.statusText }`,
				} ) );
				throw new Error(
					errorData.message ||
						errorData.error ||
						__(
							'Failed to deploy worker',
							'aether-site-exporter-providers'
						)
				);
			}

			const result = await deployResponse.json();

			if ( ! result.success ) {
				throw new Error(
					result.message ||
						result.error ||
						__(
							'Failed to deploy worker',
							'aether-site-exporter-providers'
						)
				);
			}

			// Save worker endpoint to R2 provider config and update form field
			if ( result.worker_url ) {
				// Update the form field value immediately (if onChange is available)
				if ( onChange && typeof onChange === 'function' ) {
					onChange( 'worker_endpoint', result.worker_url );
				}

				// Save to provider config using the provider config endpoint
				// This ensures it's properly saved and will be reflected in the form
				try {
					await apiFetch( {
						path: `/aether/site-exporter/providers/${ providerId }/config`,
						method: 'PUT',
						data: {
							worker_endpoint: result.worker_url,
						},
					} );
				} catch ( saveError ) {
					// Error saving worker endpoint - the value is already in the form
					// so deployment is still successful. The user can manually save if needed.
					// eslint-disable-next-line no-console
					console.error(
						'Failed to save worker endpoint:',
						saveError
					);
				}
			}

			setSuccess( true );
			setWorkerUrl( result.worker_url || null );

			// Clear success message after 10 seconds
			setTimeout( () => {
				setSuccess( false );
			}, 10000 );
		} catch ( err ) {
			setError(
				err.message ||
					__(
						'Failed to deploy worker',
						'aether-site-exporter-providers'
					)
			);
		} finally {
			setDeploying( false );
		}
	};

	const containerStyle = {
		marginTop: '1rem',
		paddingTop: '1rem',
		borderTop: '1px solid #ddd',
	};

	return (
		<div style={ containerStyle }>
			<Button
				variant="secondary"
				onClick={ handleDeploy }
				isBusy={ deploying }
				disabled={
					deploying ||
					! config?.access_key_id ||
					! config?.secret_access_key ||
					! config?.bucket_name
				}
			>
				{ deploying
					? __( 'Deploying…', 'aether-site-exporter-providers' )
					: __( 'Deploy Worker', 'aether-site-exporter-providers' ) }
			</Button>

			{ error && (
				<Notice
					status="error"
					isDismissible={ false }
					style={ { marginTop: '0.5rem' } }
				>
					{ error }
				</Notice>
			) }

			{ success && (
				<Notice
					status="success"
					isDismissible={ false }
					style={ { marginTop: '0.5rem' } }
				>
					{ __(
						'Worker deployed successfully!',
						'aether-site-exporter-providers'
					) }
					{ workerUrl && (
						<div style={ { marginTop: '0.5rem' } }>
							<strong>
								{ __(
									'Worker URL:',
									'aether-site-exporter-providers'
								) }
							</strong>{ ' ' }
							<a
								href={ workerUrl }
								target="_blank"
								rel="noopener noreferrer"
							>
								{ workerUrl }
							</a>
						</div>
					) }
				</Notice>
			) }
		</div>
	);
}

// Store React roots and container elements for cleanup
const reactRoots = new Map();
const rootContainers = new Map();

/**
 * Initialize modal hooks for Cloudflare R2 provider.
 */
export function initCloudflareR2ModalHooks() {
	// Hook into the after_fields action to add Deploy Worker button
	addAction(
		'aether.provider.form.after_fields',
		'aether-site-exporter-providers/cloudflare-r2/deploy-button',
		( context ) => {
			// Only add button for Cloudflare R2 provider
			if ( context.providerId !== 'cloudflare-r2' ) {
				return;
			}

			// Find the container element
			const container = document.querySelector(
				`.aether-provider-form__after-fields[data-provider-id="${ context.providerId }"]`
			);

			if ( ! container ) {
				return;
			}

			// Clean up previous render if it exists
			const existingRoot = reactRoots.get( context.providerId );
			const existingContainer = rootContainers.get( context.providerId );
			if ( existingRoot ) {
				// Unmount previous React component
				try {
					existingRoot.unmount();
				} catch ( e ) {
					// If unmount fails, just remove the element
					if ( existingContainer && existingContainer.parentNode ) {
						existingContainer.parentNode.removeChild(
							existingContainer
						);
					}
				}
				reactRoots.delete( context.providerId );
				rootContainers.delete( context.providerId );
			}

			// Create a new root element for this render
			const rootElement = document.createElement( 'div' );
			container.appendChild( rootElement );

			// Create React 18 root and render
			const root = createRoot( rootElement );
			reactRoots.set( context.providerId, root );
			rootContainers.set( context.providerId, rootElement );

			root.render(
				<DeployWorkerButton
					providerId={ context.providerId }
					config={ context.values }
					onChange={ context.onChange }
				/>
			);
		}
	);
}
