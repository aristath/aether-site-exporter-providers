/**
 * Loading State Component
 *
 * @package
 */

import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { spacing, colors } from '../utils/styles';

export default function LoadingState( {
	message = __( 'Loading…', 'altolith-deploy' ),
} ) {
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: spacing.md,
		padding: spacing[ '2xl' ],
	};

	const messageStyle = {
		margin: 0,
		color: colors.textMuted,
	};

	return (
		<div className="altolith-loading-state" style={ containerStyle }>
			<Spinner className="altolith-loading-state__spinner" />
			{ message && (
				<p
					className="altolith-loading-state__message"
					style={ messageStyle }
				>
					{ message }
				</p>
			) }
		</div>
	);
}
