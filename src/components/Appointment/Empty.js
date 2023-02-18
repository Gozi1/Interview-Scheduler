import React from 'react';

// Component to show when there is an empty slot
// Uses onAdd function from props
export default function Empty(props) {
	return (
		<main className='appointment__add'>
			<img
				className='appointment__add-button'
				src='images/add.png'
				alt='Add'
				onClick={props.onAdd}
			/>
		</main>
	);
}
