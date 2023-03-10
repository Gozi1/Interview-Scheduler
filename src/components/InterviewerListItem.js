import React from 'react';
import 'components/InterviewerList.scss';
import classNames from 'classnames';

const InterviewListItem = (props) => {
	const { name, avatar, setInterviewer, selected } = props;
	const interviewerClass = classNames({
		interviewers__item: true,
		'interviewers__item--selected': selected,
	});
	return (
		<li className={interviewerClass} 
		onClick={setInterviewer}
		data-testid="interview" >
			<img className='interviewers__item-image' src={avatar} alt={name} />
			{selected && name}
		</li>
	);
};

export default InterviewListItem;
