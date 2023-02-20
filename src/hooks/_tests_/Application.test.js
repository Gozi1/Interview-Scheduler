import React from 'react';
import { render,waitForElement} from '@testing-library/react';
import Application from 'components/Application';

describe('Appointment', () => {
	it('defaults to Monday and changes the schedule when a new day is selected', () => {
		const { getByText } = render(<Application />);

		return waitForElement(() => getByText("Monday"));
		
	});

	it('does something it is supposed to do', () => {
		// ...
	});

	it('does something else it is supposed to do', () => {
		// ...
	});
});
