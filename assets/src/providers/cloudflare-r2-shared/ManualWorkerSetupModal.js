/**
 * Manual Worker Setup Modal Component
 *
 * Shows detailed instructions for manually creating a Cloudflare Worker
 * for R2 storage, including the worker code to paste.
 *
 * @package
 */

import { useState, useEffect } from '@wordpress/element';
import { Modal, Button, Notice, TextareaControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CLOUDFLARE_DOCS } from './documentation';

/**
 * Manual Worker Setup Modal component.
 *
 * @param {Object}   props            Component props.
 * @param {boolean}  props.isOpen     Whether modal is open.
 * @param {Function} props.onClose    Function to close the modal.
 * @param {string}   props.bucketName Optional bucket name to show in instructions.
 * @return {JSX.Element|null}         Modal component or null if not open.
 */
export function ManualWorkerSetupModal( { isOpen, onClose, bucketName } ) {
	const [ copied, setCopied ] = useState( false );
	const [ workerCode, setWorkerCode ] = useState( '' );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ error, setError ] = useState( null );

	// Fetch worker code when modal opens
	useEffect( () => {
		if ( ! isOpen || workerCode ) {
			return;
		}

		const fetchWorkerCode = async () => {
			setIsLoading( true );
			setError( null );

			try {
				// Get plugin URL from global variable set by PHP
				const pluginUrl = window.aetherSepPluginUrl || '';
				if ( ! pluginUrl ) {
					throw new Error( 'Plugin URL not available' );
				}

				const response = await fetch(
					pluginUrl + 'assets/workers/CloudflareR2Worker.js'
				);

				if ( ! response.ok ) {
					throw new Error( `Failed to fetch worker code: ${ response.status }` );
				}

				const code = await response.text();
				setWorkerCode( code );
			} catch ( err ) {
				setError( err.message );
			} finally {
				setIsLoading( false );
			}
		};

		fetchWorkerCode();
	}, [ isOpen, workerCode ] );

	if ( ! isOpen ) {
		return null;
	}

	const handleCopyCode = async () => {
		if ( ! workerCode ) {
			return;
		}

		try {
			await navigator.clipboard.writeText( workerCode );
			setCopied( true );
			setTimeout( () => setCopied( false ), 3000 );
		} catch {
			// Fallback for older browsers
			const textarea = document.createElement( 'textarea' );
			textarea.value = workerCode;
			document.body.appendChild( textarea );
			textarea.select();
			document.execCommand( 'copy' );
			document.body.removeChild( textarea );
			setCopied( true );
			setTimeout( () => setCopied( false ), 3000 );
		}
	};

	const modalStyle = {
		maxWidth: '800px',
		width: '90vw',
	};

	const sectionStyle = {
		marginBottom: '1.5rem',
	};

	const headingStyle = {
		fontSize: '1rem',
		fontWeight: '600',
		marginBottom: '0.5rem',
		marginTop: 0,
	};

	const listStyle = {
		margin: '0.5rem 0',
		paddingLeft: '1.5rem',
	};

	const listItemStyle = {
		marginBottom: '0.5rem',
		lineHeight: '1.6',
	};

	const codeBlockStyle = {
		position: 'relative',
		marginTop: '0.5rem',
	};

	const copyButtonContainerStyle = {
		display: 'flex',
		justifyContent: 'flex-end',
		marginBottom: '0.5rem',
	};

	const noteStyle = {
		backgroundColor: '#f0f6fc',
		padding: '0.75rem 1rem',
		borderLeft: '4px solid #2271b1',
		borderRadius: '2px',
		marginTop: '1rem',
		fontSize: '0.875rem',
	};

	const loadingStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '2rem',
		gap: '0.5rem',
	};

	return (
		<Modal
			title={ __(
				'Manual Worker Setup Instructions',
				'aether-site-exporter-r2'
			) }
			onRequestClose={ onClose }
			style={ modalStyle }
			className="aether-manual-worker-modal"
		>
			<div className="aether-manual-worker-modal__content">
				{ /* Step 1: Create Worker */ }
				<div style={ sectionStyle }>
					<h3 style={ headingStyle }>
						{ __(
							'Step 1: Create a Worker',
							'aether-site-exporter-r2'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __( 'Go to', 'aether-site-exporter-r2' ) }{ ' ' }
							<a
								href="https://dash.cloudflare.com/?to=/:account/workers-and-pages"
								target="_blank"
								rel="noopener noreferrer"
							>
								Cloudflare Dashboard &gt; Workers & Pages
							</a>
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Click "Create" and select "Create Worker"',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Name your worker (e.g., "aether-r2-mysite")',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Click "Deploy" to create the worker with default code',
								'aether-site-exporter-r2'
							) }
						</li>
					</ol>
				</div>

				{ /* Step 2: Add R2 Binding */ }
				<div style={ sectionStyle }>
					<h3 style={ headingStyle }>
						{ __(
							'Step 2: Add R2 Bucket Binding',
							'aether-site-exporter-r2'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __(
								'In your worker, go to Settings > Variables',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Scroll down to "R2 Bucket Bindings"',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Click "Add binding"',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							<strong>
								{ __(
									'Variable name:',
									'aether-site-exporter-r2'
								) }
							</strong>{ ' ' }
							<code>R2_BUCKET</code>{ ' ' }
							{ __(
								'(must be exactly this name)',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							<strong>
								{ __(
									'R2 bucket:',
									'aether-site-exporter-r2'
								) }
							</strong>{ ' ' }
							{ bucketName ? (
								<>
									{ __(
										'Select',
										'aether-site-exporter-r2'
									) }{ ' ' }
									<code>{ bucketName }</code>
								</>
							) : (
								__(
									'Select your R2 bucket',
									'aether-site-exporter-r2'
								)
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Click "Save" to save the binding',
								'aether-site-exporter-r2'
							) }
						</li>
					</ol>
				</div>

				{ /* Step 3: Replace Worker Code */ }
				<div style={ sectionStyle }>
					<h3 style={ headingStyle }>
						{ __(
							'Step 3: Replace Worker Code',
							'aether-site-exporter-r2'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __(
								'Go to your worker\'s "Code" tab',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Delete all existing code',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Paste the code below:',
								'aether-site-exporter-r2'
							) }
						</li>
					</ol>

					<div style={ codeBlockStyle }>
						{ isLoading && (
							<div style={ loadingStyle }>
								<Spinner />
								<span>{ __( 'Loading worker code...', 'aether-site-exporter-r2' ) }</span>
							</div>
						) }
						{ error && (
							<Notice status="error" isDismissible={ false }>
								{ error }
							</Notice>
						) }
						{ ! isLoading && ! error && workerCode && (
							<>
								<div style={ copyButtonContainerStyle }>
									<Button
										variant="secondary"
										onClick={ handleCopyCode }
										disabled={ copied }
									>
										{ copied
											? __(
													'Copied!',
													'aether-site-exporter-r2'
											  )
											: __(
													'Copy Code',
													'aether-site-exporter-r2'
											  ) }
									</Button>
								</div>
								<TextareaControl
									value={ workerCode }
									readOnly
									rows={ 15 }
									style={ {
										fontFamily: 'monospace',
										fontSize: '12px',
										backgroundColor: '#1e1e1e',
										color: '#d4d4d4',
									} }
								/>
							</>
						) }
					</div>
				</div>

				{ /* Step 4: Deploy and Copy URL */ }
				<div style={ sectionStyle }>
					<h3 style={ headingStyle }>
						{ __(
							'Step 4: Deploy and Copy URL',
							'aether-site-exporter-r2'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __(
								'Click "Save and Deploy" to deploy your worker',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Copy the worker URL (e.g., https://aether-r2-mysite.your-subdomain.workers.dev)',
								'aether-site-exporter-r2'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Paste it in the "Worker Endpoint URL" field in this form',
								'aether-site-exporter-r2'
							) }
						</li>
					</ol>
				</div>

				{ /* Important Note */ }
				<Notice status="info" isDismissible={ false }>
					<strong>
						{ __( 'Important:', 'aether-site-exporter-r2' ) }
					</strong>{ ' ' }
					{ __(
						'The R2 bucket binding variable name MUST be exactly "R2_BUCKET" (case-sensitive). The worker will not work without this binding.',
						'aether-site-exporter-r2'
					) }
				</Notice>

				<div style={ noteStyle }>
					<strong>
						{ __(
							'Need more help?',
							'aether-site-exporter-r2'
						) }
					</strong>
					<br />
					<a
						href={ CLOUDFLARE_DOCS.workersBindings }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ __(
							'R2 Bucket Bindings Documentation',
							'aether-site-exporter-r2'
						) }
					</a>
					{ ' | ' }
					<a
						href={ CLOUDFLARE_DOCS.r2Overview }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ __(
							'R2 Overview',
							'aether-site-exporter-r2'
						) }
					</a>
				</div>

				{ /* Close Button */ }
				<div
					style={ {
						marginTop: '1.5rem',
						display: 'flex',
						justifyContent: 'flex-end',
					} }
				>
					<Button variant="primary" onClick={ onClose }>
						{ __( 'Close', 'aether-site-exporter-r2' ) }
					</Button>
				</div>
			</div>
		</Modal>
	);
}
