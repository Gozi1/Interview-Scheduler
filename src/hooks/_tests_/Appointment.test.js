import React from 'react';

import { render, cleanup,fireEvent } from '@testing-library/react';

import { Form, Appointment } from 'components/Appointment';

afterEach(cleanup);

describe('Form', () => {
	const interviewers = [
		{
			id: 1,
			student: 'Sylvia Palmer',
			avatar: 'https://i.imgur.com/LpaY82x.png',
		},
	];
	

	it('renders without student name if not provided', () => {
		const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
	});

	it('renders with initial student name', () => {
		const { getByTestId } = render(
			<Form interviewers={interviewers} student="Lydia Miller-Jones" />
		);
		expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
	});

	it("validates that the student name is not blank", () => {
		/* 1. Create the mock onSave function */
		const onSave = jest.fn();
	
		/* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
		const { getByText } = render(
			<Form interviewers={interviewers} onSave={onSave} />
		);
	
		/* 3. Click the save button */
		fireEvent.click(getByText("Save"));
	
		expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();
	});
	
	it("validates that the interviewer cannot be null", () => {
		/* 1. Create the mock onSave function */
		const onSave = jest.fn();
	
		/* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
		const { getByText } = render(
			<Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
		);
	
		/* 3. Click the save button */
		fireEvent.click(getByText("Save"));
	
		expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();
	});
	
	it("calls onSave function when the name and interviewer is defined", () => {
		/* 1. Create the mock onSave function */
		const onSave = jest.fn();
	
		/* 2. Render the Form with interviewers, student name and the onSave mock function passed as an onSave prop */
		const { getByText, queryByText } = render(
			<Form
				interviewers={interviewers}
				onSave={onSave}
				student="Lydia Miller-Jones"
				interviewer={interviewers[0].id}
			/>
		);
	
		/* 3. Click the save button */
		fireEvent.click(getByText("Save"));
	
		expect(queryByText(/student name cannot be blank/i)).toBeNull();
		expect(queryByText(/please select an interviewer/i)).toBeNull();
		expect(onSave).toHaveBeenCalledTimes(1);
		expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
	});
});

it('renders without crashing', () => {
	render(<Appointment />);
});


describe('Appointment', () => {
	it('renders without crashing', () => {
		render(<Appointment />);
	});

	it('does something it is supposed to do', () => {
		// ...
	});

	it('does something else it is supposed to do', () => {
		// ...
	});
});
