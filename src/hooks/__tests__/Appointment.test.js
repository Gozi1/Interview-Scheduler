import React from 'react';
import { render,waitForElement,fireEvent} from '@testing-library/react';
import { Appointment } from 'components/Appointment';
import { getByText,prettyDOM,getAllByTestId,getByAltText,getByPlaceholderText,queryByText,queryByAltText } from "@testing-library/react";

describe('Appointment', () => {
	it('renders ', () => {
		const { getByPlaceholderText } = render(<Appointment/>);
	});

});
