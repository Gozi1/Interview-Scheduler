import React from 'react'
import Empty from './Empty'
import Header from './Header'
import Show from './Show'



export default function Appointment(props){
  const {interview} = props;
  return (
    <article className="appointment">
      <Header time = {props.time} />
      {interview ? <Show student = {interview.student} interviewer = {interview.interviewer} />: <Empty/> }
    </article>
  )
}



