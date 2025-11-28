/**
 * Cloudflare R2 Static Site Provider Modal Hooks
 *
 * Adds custom content to the Cloudflare R2 static site provider configuration modal.
 * Specifically adds a "Deploy Worker" button for R2 storage worker.
 *
 * @package
 */

import { useState } from '@wordpress/element';
import { Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import apiFetch from '../../utils/api';
import { EdgeService } from '../services/edgeService';
import {
	R2SetupGuide,
	APITokenHelpSection,
	DeploymentErrorHelp,
	ManualWorkerSetupModal,
} from '../cloudflare-r2-shared';
import ProfileRegistry from '@altolith/profiles/ProfileRegistry';

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
	const [ domainAttached, setDomainAttached ] = useState( false );
	const [ domainError, setDomainError ] = useState( null );
	const [ showManualSetup, setShowManualSetup ] = useState( false );

	const handleDeploy = async () => {
		setDeploying( true );
		setError( null );
		setSuccess( false );
		setWorkerUrl( null );
		setDomainAttached( false );
		setDomainError( null );

		try {
			// Validate required fields
			if ( ! config?.credential_profile || ! config?.bucket_name ) {
				throw new Error(
					__(
						'Credential profile and Bucket Name are required to deploy the worker',
						'altolith-deploy-r2'
					)
				);
			}

			// Resolve credentials from the selected profile
			const profile = ProfileRegistry.get( config.credential_profile );
			if ( ! profile || ! profile.fields ) {
				throw new Error(
					__(
						'Could not load credential profile. Please select a valid profile.',
						'altolith-deploy-r2'
					)
				);
			}

			const { account_id: accountId, api_token: apiToken } =
				profile.fields;
			if ( ! accountId || ! apiToken ) {
				throw new Error(
					__(
						'Credential profile is missing Account ID or API Token',
						'altolith-deploy-r2'
					)
				);
			}

			const restUrl = (
				window.altolithData?.restUrl ||
				window.wpApiSettings?.root ||
				'/wp-json'
			).replace( /\/$/, '' );

			// Get nonce for authentication from window.altolithData (set by base plugin)
			const nonce =
				window.altolithData?.nonce || window.wpApiSettings?.nonce || '';

			// Generate worker name (format: altolith-r2-{random})
			const randomId = Math.random().toString( 36 ).substring( 2, 10 );
			const workerName = `altolith-r2-${ randomId }`;

			// Prepare bindings - R2 bucket binding
			const bindings = {};
			if ( config.bucket_name ) {
				bindings.R2_BUCKET = {
					type: 'r2_bucket',
					bucket_name: config.bucket_name,
				};
			}

			// Deploy worker using server-side REST API endpoint (avoids CORS issues)
			const deployEndpoint = `${ restUrl }/altolith/deploy/providers/cloudflare/deploy-worker`;

			const deployResponse = await fetch( deployEndpoint, {
				method: 'POST',
				headers: {
					'X-WP-Nonce': nonce,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					worker_type: 'r2',
					worker_name: workerName,
					bindings,
					account_id: accountId,
					api_token: apiToken,
				} ),
			} );

			if ( ! deployResponse.ok ) {
				const errorData = await deployResponse.json().catch( () => ( {
					message: `HTTP ${ deployResponse.status }: ${ deployResponse.statusText }`,
				} ) );
				throw new Error(
					errorData.message ||
						errorData.error ||
						__( 'Failed to deploy worker', 'altolith-deploy-r2' )
				);
			}

			const result = await deployResponse.json();

			if ( ! result.success ) {
				throw new Error(
					result.message ||
						result.error ||
						__( 'Failed to deploy worker', 'altolith-deploy-r2' )
				);
			}

			// Save worker endpoint to provider config and update form field
			if ( result.worker_url ) {
				// Update the form field value immediately (if onChange is available)
				if ( onChange && typeof onChange === 'function' ) {
					onChange( 'worker_endpoint', result.worker_url );
				}

				// Save to provider config using the provider config endpoint
				try {
					// First fetch existing config to merge with
					const existingConfigResponse = await apiFetch( {
						path: `/altolith/deploy/providers/${ providerId }/config`,
						method: 'GET',
					} );
					const existingConfig = existingConfigResponse?.config || {};

					// Merge worker_endpoint into existing config
					await apiFetch( {
						path: `/altolith/deploy/providers/${ providerId }/config`,
						method: 'POST',
						data: {
							config: {
								...existingConfig,
								worker_endpoint: result.worker_url,
							},
						},
					} );
				} catch {
					// Error saving worker endpoint - the value is already in the form
					// so deployment is still successful. The user can manually save if needed.
				}
			}

			// If public_url is configured, attach the worker to the custom domain
			if ( result.worker_url && config.public_url ) {
				try {
					const edgeService = new EdgeService(
						accountId,
						apiToken,
						config,
						'cloudflare-r2-static-site'
					);

					// Get zone ID for the hostname
					const hostname = config.public_url
						.replace( /^https?:\/\//, '' )
						.split( '/' )[ 0 ];
					const rootDomain = hostname
						.split( '.' )
						.slice( -2 )
						.join( '.' );
					const zoneResult =
						await edgeService.getZoneIdForHostname( rootDomain );

					if ( zoneResult.success && zoneResult.data?.zoneId ) {
						// Extract worker name from worker URL
						const deployedWorkerName =
							result.worker_url.match(
								/https?:\/\/([^.]+)/
							)?.[ 1 ];
						if ( deployedWorkerName ) {
							const attachResult =
								await edgeService.attachWorkerToCustomDomain(
									deployedWorkerName,
									hostname,
									zoneResult.data.zoneId
								);
							if ( attachResult.success ) {
								setDomainAttached( true );
							} else {
								setDomainError( attachResult.error );
							}
						}
					} else {
						setDomainError(
							zoneResult.error ||
								__(
									'Could not find zone for domain',
									'altolith-deploy-r2'
								)
						);
					}
				} catch ( domainErr ) {
					// Don't fail deployment if custom domain attachment fails
					setDomainError( domainErr.message );
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
					__( 'Failed to deploy worker', 'altolith-deploy-r2' )
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

	const buttonContainerStyle = {
		display: 'flex',
		gap: '0.5rem',
		alignItems: 'center',
	};

	return (
		<div style={ containerStyle }>
			<div style={ buttonContainerStyle }>
				<Button
					variant="secondary"
					onClick={ handleDeploy }
					isBusy={ deploying }
					disabled={
						deploying ||
						! config?.credential_profile ||
						! config?.bucket_name
					}
				>
					{ deploying
						? __( 'Deploying…', 'altolith-deploy-r2' )
						: __( 'Deploy Worker', 'altolith-deploy-r2' ) }
				</Button>
				<Button
					variant="tertiary"
					onClick={ () => setShowManualSetup( true ) }
				>
					{ __( 'Manual Setup', 'altolith-deploy-r2' ) }
				</Button>
			</div>

			{ error && (
				<>
					<Notice
						status="error"
						isDismissible={ false }
						style={ { marginTop: '0.5rem' } }
					>
						{ error }
					</Notice>
					<DeploymentErrorHelp errorType="worker_deployment" />
				</>
			) }

			{ success && (
				<Notice
					status="success"
					isDismissible={ false }
					style={ { marginTop: '0.5rem' } }
				>
					{ __(
						'Worker deployed successfully!',
						'altolith-deploy-r2'
					) }
					{ workerUrl && (
						<div style={ { marginTop: '0.5rem' } }>
							<strong>
								{ __( 'Worker URL:', 'altolith-deploy-r2' ) }
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
					{ domainAttached && config.public_url && (
						<div style={ { marginTop: '0.5rem' } }>
							<strong>
								{ __(
									'Custom domain attached:',
									'altolith-deploy-r2'
								) }
							</strong>{ ' ' }
							<a
								href={ config.public_url }
								target="_blank"
								rel="noopener noreferrer"
							>
								{
									config.public_url
										.replace( /^https?:\/\//, '' )
										.split( '/' )[ 0 ]
								}
							</a>
						</div>
					) }
					{ domainError && (
						<>
							<div
								style={ {
									marginTop: '0.5rem',
									color: '#d63638',
								} }
							>
								<strong>
									{ __(
										'Custom domain warning:',
										'altolith-deploy-r2'
									) }
								</strong>{ ' ' }
								{ domainError }
							</div>
							<DeploymentErrorHelp
								errorType="domain_attachment"
								hostname={
									config.public_url
										?.replace( /^https?:\/\//, '' )
										.split( '/' )[ 0 ]
								}
							/>
						</>
					) }
				</Notice>
			) }

			<ManualWorkerSetupModal
				isOpen={ showManualSetup }
				onClose={ () => setShowManualSetup( false ) }
				bucketName={ config?.bucket_name }
			/>
		</div>
	);
}

/**
 * Initialize modal hooks for Cloudflare R2 provider.
 *
 * Uses filters to inject documentation and help content into the provider modal:
 * - Modal header: Setup guide with API permissions
 * - After api_token field: Token creation help
 * - After worker_endpoint field: Deploy Worker button
 *
 * @param {string} providerIdPrefix Provider ID prefix to match (e.g., 'cloudflare-r2-static-site').
 */
export function initCloudflareR2ModalHooks( providerIdPrefix ) {
	// Add setup guide at the top of the modal
	addFilter(
		'altolith.admin.provider.modal.header',
		`altolith/${ providerIdPrefix }/setup-guide`,
		( content, context ) => {
			// Only show for matching provider
			if ( ! context.providerId?.startsWith( providerIdPrefix ) ) {
				return content;
			}
			return <R2SetupGuide />;
		}
	);

	// Add API token help section after api_token field
	addFilter(
		'altolith.admin.provider.field.after',
		`altolith/${ providerIdPrefix }/api-token-help`,
		( content, context ) => {
			// Only add after api_token field for matching provider
			if (
				context.fieldId !== 'api_token' ||
				! context.providerId?.startsWith( providerIdPrefix )
			) {
				return content;
			}
			return (
				<>
					{ content }
					<APITokenHelpSection />
				</>
			);
		},
		5 // Priority 5 to run before other field.after filters
	);

	// Hook into the field-level after filter to add Deploy Worker button
	// after the worker_endpoint field
	addFilter(
		'altolith.admin.provider.field.after',
		`altolith/${ providerIdPrefix }/deploy-button`,
		( content, context ) => {
			// Only add button after worker_endpoint field for matching provider
			if (
				context.fieldId !== 'worker_endpoint' ||
				! context.providerId?.startsWith( providerIdPrefix )
			) {
				return content;
			}

			// Return the DeployWorkerButton component
			return (
				<>
					{ content }
					<DeployWorkerButton
						providerId={ context.providerId }
						config={ context.formValues || {} }
						onChange={ context.onFormChange }
					/>
				</>
			);
		},
		10 // Priority 10 (default)
	);
}
