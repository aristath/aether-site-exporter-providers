/**
 * R2 Setup Guide Component
 *
 * Displays important setup information at the top of the provider modal.
 * Collapsible to avoid overwhelming users who already know the setup.
 *
 * @package
 */

import { useState } from '@wordpress/element';
import { Button, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { REQUIRED_PERMISSIONS } from './documentation';

/**
 * Collapsible setup guide showing required API permissions.
 *
 * @return {JSX.Element} Setup guide component.
 */
export function R2SetupGuide() {
	const [ isExpanded, setIsExpanded ] = useState( false );

	const containerStyle = {
		marginBottom: '1rem',
		padding: '0.75rem 1rem',
		backgroundColor: '#f0f6fc',
		borderLeft: '4px solid #2271b1',
		borderRadius: '2px',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 0,
	};

	const toggleButtonStyle = {
		padding: 0,
		height: 'auto',
		minHeight: 'auto',
	};

	const contentStyle = {
		marginTop: '0.75rem',
		fontSize: '13px',
		lineHeight: '1.6',
	};

	const listStyle = {
		margin: '0.5rem 0 0.75rem',
		paddingLeft: '1.5rem',
	};

	const listItemStyle = {
		marginBottom: '0.25rem',
	};

	return (
		<div style={ containerStyle }>
			<div style={ headerStyle }>
				<strong>
					{ __( 'Before you begin', 'altolith-deploy-r2' ) }
				</strong>
				<Button
					variant="link"
					onClick={ () => setIsExpanded( ! isExpanded ) }
					style={ toggleButtonStyle }
					aria-expanded={ isExpanded }
				>
					{ isExpanded
						? __( 'Hide details', 'altolith-deploy-r2' )
						: __( 'Show details', 'altolith-deploy-r2' ) }
				</Button>
			</div>

			{ ! isExpanded && (
				<p style={ { margin: '0.5rem 0 0', fontSize: '13px' } }>
					{ __(
						'You need a Cloudflare API token with R2, Workers, and Zone permissions.',
						'altolith-deploy-r2'
					) }{ ' ' }
					<ExternalLink href={ REQUIRED_PERMISSIONS.createTokenUrl }>
						{ __( 'Create API Token', 'altolith-deploy-r2' ) }
					</ExternalLink>
				</p>
			) }

			{ isExpanded && (
				<div style={ contentStyle }>
					<p style={ { margin: '0 0 0.5rem' } }>
						{ __(
							'Create a Cloudflare API token with these permissions:',
							'altolith-deploy-r2'
						) }
					</p>
					{ REQUIRED_PERMISSIONS.sections.map(
						( section, sectionIndex ) => (
							<div
								key={ sectionIndex }
								style={ { marginBottom: '0.5rem' } }
							>
								<strong
									style={ {
										fontSize: '12px',
										color: '#50575e',
									} }
								>
									{ section.title }
								</strong>
								<ul style={ listStyle }>
									{ section.items.map(
										( item, itemIndex ) => (
											<li
												key={ itemIndex }
												style={ listItemStyle }
											>
												<code>{ item.permission }</code>
												{ ' - ' }
												{ item.description }
											</li>
										)
									) }
								</ul>
							</div>
						)
					) }
					<p style={ { margin: 0 } }>
						<ExternalLink
							href={ REQUIRED_PERMISSIONS.createTokenUrl }
						>
							{ __(
								'Create API Token in Cloudflare Dashboard',
								'altolith-deploy-r2'
							) }
						</ExternalLink>
					</p>
				</div>
			) }
		</div>
	);
}
