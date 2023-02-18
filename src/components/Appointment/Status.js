import React from 'react';

// Loading components shown when in-between modes/ when transistioning
export default function Status(props) {
	return (
		<main className='appointment__card appointment__card--status'>
			<img
				className='appointment__status-image'
				src='images/status.png'
				alt='Loading'
			/>
			<h1 className='text--semi-bold'>{props.message}</h1>
		</main>
	);
}
