import React from 'react';
import classNames from 'classnames';
import 'components/Button.scss';

export default function Button(props) {
	const button = () => {
		const { danger, confirm, onClick, disabled, children } = props;
		const buttonClass = classNames({
			button: true,
			'button--disabled': disabled,
			'button--danger': danger,
			'button--confirm': confirm,
		});

		return (
			<button
				className={buttonClass}
				onClick={onClick}
				disabled={disabled ? true : false}
			>
				{children}
			</button>
		);
	};
	return <>{button()}</>;
}
