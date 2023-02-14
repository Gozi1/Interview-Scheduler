import React from 'react'
import InterviewListItem from './InterviewerListItem'
import "components/InterviewerList.scss";

const InterviewList = (props) => {

  const interviewers = props.interviewers.map((interviewer)=>{
    
    return (
    <InterviewListItem 
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={()=> props.onChange(interviewer.id)}
      selected = {interviewer.id === props.value}
      />)
  })
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
    
  )
}

export default InterviewList