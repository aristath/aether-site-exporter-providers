/**
 * Manual Worker Setup Modal Component
 *
 * Shows detailed instructions for manually creating a Cloudflare Worker
 * for R2 storage, including the worker code to paste.
 *
 * @package
 */

import { useState } from '@wordpress/element';
import { Modal, Button, Notice, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CLOUDFLARE_DOCS } from './documentation';

/**
 * The worker code that users need to paste.
 * This is a simplified version that works for static site serving.
 */
const WORKER_CODE = `/* eslint-disable no-console */
/**
 * Cloudflare Worker for R2 Static Site Serving
 *
 * Deploy this worker and add an R2 bucket binding named "R2_BUCKET"
 */

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, X-R2-Key, X-R2-Content-Type, X-R2-Cache-Control, X-API-Key, X-R2-Action, X-R2-Upload-Id, X-R2-Part-Number',
	'Access-Control-Max-Age': '86400',
};

export default {
	async fetch(request, env) {
		// Handle CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: CORS_HEADERS });
		}

		// Handle GET requests (serve static files)
		if (request.method === 'GET') {
			return handleGet(request, env);
		}

		// Handle POST requests (uploads)
		if (request.method === 'POST') {
			return handlePost(request, env);
		}

		return new Response(JSON.stringify({ error: 'Method not allowed' }), {
			status: 405,
			headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
		});
	},
};

async function handleGet(request, env) {
	const url = new URL(request.url);
	let path = url.pathname.slice(1); // Remove leading /

	// Handle directory index
	if (!path || path.endsWith('/')) {
		path = path + 'index.html';
	}

	// Try to get the file
	let object = await env.R2_BUCKET.get(path);

	// If not found and no extension, try as directory
	if (!object && !path.split('/').pop().includes('.')) {
		object = await env.R2_BUCKET.get(path + '/index.html');
	}

	if (!object) {
		return new Response('Not found', { status: 404 });
	}

	const contentType = object.httpMetadata?.contentType || getContentType(path);
	return new Response(object.body, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*',
		},
	});
}

async function handlePost(request, env) {
	const action = request.headers.get('X-R2-Action');
	const key = request.headers.get('X-R2-Key');

	// Handle different actions
	if (action === 'delete') {
		const body = await request.json();
		await env.R2_BUCKET.delete(body.key);
		return jsonResponse({ success: true });
	}

	if (action === 'list') {
		const body = await request.json();
		const listed = await env.R2_BUCKET.list({ prefix: body.prefix || '' });
		return jsonResponse({
			success: true,
			objects: listed.objects.map(o => ({ key: o.key, size: o.size })),
		});
	}

	// Default: file upload
	if (!key) {
		return jsonResponse({ success: false, error: 'Missing X-R2-Key header' }, 400);
	}

	const contentType = request.headers.get('X-R2-Content-Type') || 'application/octet-stream';
	const data = await request.arrayBuffer();

	await env.R2_BUCKET.put(key, data, {
		httpMetadata: { contentType, cacheControl: 'public, max-age=3600' },
	});

	return jsonResponse({ success: true, key, size: data.byteLength });
}

function jsonResponse(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
	});
}

function getContentType(path) {
	const ext = path.split('.').pop().toLowerCase();
	const types = {
		html: 'text/html', css: 'text/css', js: 'application/javascript',
		json: 'application/json', png: 'image/png', jpg: 'image/jpeg',
		jpeg: 'image/jpeg', gif: 'image/gif', svg: 'image/svg+xml',
		webp: 'image/webp', woff: 'font/woff', woff2: 'font/woff2',
	};
	return types[ext] || 'application/octet-stream';
}`;

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

	if ( ! isOpen ) {
		return null;
	}

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText( WORKER_CODE );
			setCopied( true );
			setTimeout( () => setCopied( false ), 3000 );
		} catch {
			// Fallback for older browsers
			const textarea = document.createElement( 'textarea' );
			textarea.value = WORKER_CODE;
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

	return (
		<Modal
			title={ __(
				'Manual Worker Setup Instructions',
				'aether-site-exporter-providers'
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
							'aether-site-exporter-providers'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __( 'Go to', 'aether-site-exporter-providers' ) }{ ' ' }
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
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Name your worker (e.g., "aether-r2-mysite")',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Click "Deploy" to create the worker with default code',
								'aether-site-exporter-providers'
							) }
						</li>
					</ol>
				</div>

				{ /* Step 2: Add R2 Binding */ }
				<div style={ sectionStyle }>
					<h3 style={ headingStyle }>
						{ __(
							'Step 2: Add R2 Bucket Binding',
							'aether-site-exporter-providers'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __(
								'In your worker, go to Settings > Variables',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Scroll down to "R2 Bucket Bindings"',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Click "Add binding"',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							<strong>
								{ __(
									'Variable name:',
									'aether-site-exporter-providers'
								) }
							</strong>{ ' ' }
							<code>R2_BUCKET</code>{ ' ' }
							{ __(
								'(must be exactly this name)',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							<strong>
								{ __(
									'R2 bucket:',
									'aether-site-exporter-providers'
								) }
							</strong>{ ' ' }
							{ bucketName ? (
								<>
									{ __(
										'Select',
										'aether-site-exporter-providers'
									) }{ ' ' }
									<code>{ bucketName }</code>
								</>
							) : (
								__(
									'Select your R2 bucket',
									'aether-site-exporter-providers'
								)
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Click "Save" to save the binding',
								'aether-site-exporter-providers'
							) }
						</li>
					</ol>
				</div>

				{ /* Step 3: Replace Worker Code */ }
				<div style={ sectionStyle }>
					<h3 style={ headingStyle }>
						{ __(
							'Step 3: Replace Worker Code',
							'aether-site-exporter-providers'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __(
								'Go to your worker\'s "Code" tab',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Delete all existing code',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Paste the code below:',
								'aether-site-exporter-providers'
							) }
						</li>
					</ol>

					<div style={ codeBlockStyle }>
						<div style={ copyButtonContainerStyle }>
							<Button
								variant="secondary"
								onClick={ handleCopyCode }
								disabled={ copied }
							>
								{ copied
									? __(
											'Copied!',
											'aether-site-exporter-providers'
									  )
									: __(
											'Copy Code',
											'aether-site-exporter-providers'
									  ) }
							</Button>
						</div>
						<TextareaControl
							value={ WORKER_CODE }
							readOnly
							rows={ 15 }
							style={ {
								fontFamily: 'monospace',
								fontSize: '12px',
								backgroundColor: '#1e1e1e',
								color: '#d4d4d4',
							} }
						/>
					</div>
				</div>

				{ /* Step 4: Deploy and Copy URL */ }
				<div style={ sectionStyle }>
					<h3 style={ headingStyle }>
						{ __(
							'Step 4: Deploy and Copy URL',
							'aether-site-exporter-providers'
						) }
					</h3>
					<ol style={ listStyle }>
						<li style={ listItemStyle }>
							{ __(
								'Click "Save and Deploy" to deploy your worker',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Copy the worker URL (e.g., https://aether-r2-mysite.your-subdomain.workers.dev)',
								'aether-site-exporter-providers'
							) }
						</li>
						<li style={ listItemStyle }>
							{ __(
								'Paste it in the "Worker Endpoint URL" field in this form',
								'aether-site-exporter-providers'
							) }
						</li>
					</ol>
				</div>

				{ /* Important Note */ }
				<Notice status="info" isDismissible={ false }>
					<strong>
						{ __( 'Important:', 'aether-site-exporter-providers' ) }
					</strong>{ ' ' }
					{ __(
						'The R2 bucket binding variable name MUST be exactly "R2_BUCKET" (case-sensitive). The worker will not work without this binding.',
						'aether-site-exporter-providers'
					) }
				</Notice>

				<div style={ noteStyle }>
					<strong>
						{ __(
							'Need more help?',
							'aether-site-exporter-providers'
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
							'aether-site-exporter-providers'
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
							'aether-site-exporter-providers'
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
						{ __( 'Close', 'aether-site-exporter-providers' ) }
					</Button>
				</div>
			</div>
		</Modal>
	);
}
