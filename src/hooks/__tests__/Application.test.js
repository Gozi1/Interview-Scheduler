import React from 'react';
import { render,waitForElement,fireEvent} from '@testing-library/react';
import Application from 'components/Application';

describe('Application', () => {
	it('defaults to Monday and changes the schedule when a new day is selected', () => {
		const { getByText } = render(<Application />);

		return waitForElement(() => getByText("Monday")).then(()=>{
			fireEvent.click(getByText("Tuesday"));
			expect(getByText('Leopold Silvers')).toBeInTheDocument();
		});
		
	});

	it('does something it is supposed to do', () => {
		// ...
	});

	it('does something else it is supposed to do', () => {
		// ...
	});
});
