/**
 * Deployment Error Help Component
 *
 * Shows expandable "How to fix" instructions when worker
 * deployment or domain attachment fails.
 *
 * @package
 */

import { useState } from '@wordpress/element';
import { Button, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	MANUAL_WORKER_DEPLOYMENT,
	MANUAL_DOMAIN_ATTACHMENT,
	CLOUDFLARE_DOCS,
} from './documentation';

/**
 * Expandable help section for deployment errors.
 *
 * @param {Object} props           Component props.
 * @param {string} props.errorType Type of error: 'worker_deployment' or 'domain_attachment'.
 * @param {string} props.hostname  Optional hostname for domain attachment errors.
 * @return {JSX.Element|null} Help section or null if invalid error type.
 */
export function DeploymentErrorHelp( { errorType, hostname } ) {
	const [ isExpanded, setIsExpanded ] = useState( false );

	const containerStyle = {
		marginTop: '0.5rem',
	};

	const toggleButtonStyle = {
		padding: 0,
		height: 'auto',
		minHeight: 'auto',
		fontSize: '12px',
		color: '#2271b1',
	};

	const contentStyle = {
		marginTop: '0.5rem',
		padding: '0.75rem',
		backgroundColor: '#fff8e5',
		borderRadius: '4px',
		fontSize: '12px',
		lineHeight: '1.6',
	};

	const listStyle = {
		margin: '0.5rem 0',
		paddingLeft: '1.25rem',
	};

	const listItemStyle = {
		marginBottom: '0.35rem',
	};

	const noteStyle = {
		marginTop: '0.5rem',
		fontStyle: 'italic',
		color: '#50575e',
	};

	if ( errorType === 'worker_deployment' ) {
		return (
			<div style={ containerStyle }>
				<Button
					variant="link"
					onClick={ () => setIsExpanded( ! isExpanded ) }
					style={ toggleButtonStyle }
					aria-expanded={ isExpanded }
				>
					{ isExpanded
						? __(
								'Hide manual instructions',
								'aether-site-exporter-r2'
						  )
						: __(
								'How to deploy manually',
								'aether-site-exporter-r2'
						  ) }
				</Button>

				{ isExpanded && (
					<div style={ contentStyle }>
						<p style={ { margin: '0 0 0.5rem' } }>
							{ __(
								'If automatic deployment fails, you can deploy the worker manually:',
								'aether-site-exporter-r2'
							) }
						</p>
						<ol style={ listStyle }>
							{ MANUAL_WORKER_DEPLOYMENT.steps.map(
								( step, index ) => (
									<li key={ index } style={ listItemStyle }>
										{ step }
									</li>
								)
							) }
						</ol>
						<ExternalLink
							href={ MANUAL_WORKER_DEPLOYMENT.workersUrl }
						>
							{ __(
								'Open Workers & Pages',
								'aether-site-exporter-r2'
							) }
						</ExternalLink>
						{ ' | ' }
						<ExternalLink href={ CLOUDFLARE_DOCS.workersBindings }>
							{ __(
								'View Bindings Documentation',
								'aether-site-exporter-r2'
							) }
						</ExternalLink>
					</div>
				) }
			</div>
		);
	}

	if ( errorType === 'domain_attachment' ) {
		return (
			<div style={ containerStyle }>
				<Button
					variant="link"
					onClick={ () => setIsExpanded( ! isExpanded ) }
					style={ toggleButtonStyle }
					aria-expanded={ isExpanded }
				>
					{ isExpanded
						? __(
								'Hide manual instructions',
								'aether-site-exporter-r2'
						  )
						: __(
								'How to attach domain manually',
								'aether-site-exporter-r2'
						  ) }
				</Button>

				{ isExpanded && (
					<div style={ contentStyle }>
						<p style={ { margin: '0 0 0.5rem' } }>
							{ __(
								'If custom domain attachment fails, configure it manually:',
								'aether-site-exporter-r2'
							) }
						</p>
						<ol style={ listStyle }>
							{ MANUAL_DOMAIN_ATTACHMENT.steps.map(
								( step, index ) => (
									<li key={ index } style={ listItemStyle }>
										{ index === 4 && hostname
											? `${ step }: ${ hostname }`
											: step }
									</li>
								)
							) }
						</ol>
						<p style={ noteStyle }>
							{ MANUAL_DOMAIN_ATTACHMENT.note }
						</p>
						<ExternalLink href={ MANUAL_DOMAIN_ATTACHMENT.docsUrl }>
							{ __(
								'View Custom Domains Documentation',
								'aether-site-exporter-r2'
							) }
						</ExternalLink>
					</div>
				) }
			</div>
		);
	}

	return null;
}
