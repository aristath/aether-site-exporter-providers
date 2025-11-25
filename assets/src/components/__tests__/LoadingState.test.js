/**
 * Tests for LoadingState Component
 *
 * @package
 */

import { render, screen } from '@testing-library/react';
import LoadingState from '../LoadingState';

describe( 'LoadingState', () => {
	it( 'should render spinner', () => {
		const { container } = render( <LoadingState /> );

		// Check for the spinner by its class or role (actual WordPress Spinner is an SVG)
		expect(
			container.querySelector( '.components-spinner' )
		).toBeInTheDocument();
	} );

	it( 'should render default loading message', () => {
		render( <LoadingState /> );

		expect( screen.getByText( 'Loading…' ) ).toBeInTheDocument();
	} );

	it( 'should render custom message', () => {
		render( <LoadingState message="Please wait..." /> );

		expect( screen.getByText( 'Please wait...' ) ).toBeInTheDocument();
	} );

	it( 'should not render message when empty string provided', () => {
		const { container } = render( <LoadingState message="" /> );

		expect( screen.queryByText( 'Loading…' ) ).not.toBeInTheDocument();
		expect(
			container.querySelector( '.components-spinner' )
		).toBeInTheDocument();
	} );
} );
