/**
 * Secret Field Component
 *
 * Replaces the altolith-secret web component with a React component.
 *
 * @package
 */

import { useState } from '@wordpress/element';
import { TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { spacing } from '../utils/styles';

export default function SecretField( {
	value = '',
	onChange,
	label,
	help,
	placeholder,
	...props
} ) {
	const [ isVisible, setIsVisible ] = useState( false );

	const containerStyle = {
		position: 'relative',
	};

	const toggleStyle = {
		marginTop: spacing.sm,
	};

	return (
		<div className="altolith-secret-field" style={ containerStyle }>
			<TextControl
				className="altolith-secret-field__input"
				label={ label }
				help={ help }
				value={ value }
				onChange={ onChange }
				type={ isVisible ? 'text' : 'password' }
				placeholder={ placeholder }
				__next40pxDefaultSize={ true }
				__nextHasNoMarginBottom={ true }
				{ ...props }
			/>
			<Button
				className="altolith-secret-field__toggle"
				variant="secondary"
				onClick={ () => setIsVisible( ! isVisible ) }
				style={ toggleStyle }
			>
				{ isVisible
					? __( 'Hide', 'altolith-deploy' )
					: __( 'Show', 'altolith-deploy' ) }
			</Button>
		</div>
	);
}
