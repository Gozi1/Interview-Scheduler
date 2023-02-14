import React from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'
import { useState } from 'react';

export default function Form(props){

  const [student, setStudent] = useState(props.student || "")
  
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const reset = ()=>{ setStudent("") 
                      setInterviewer(null)}

  const cancel = ()=>{ props.onCancel()
                       reset()}
  
  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange ={(e)=> setStudent(e.target.value)}
        value = {student}
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers}
      value = {interviewer}
      onChange = {setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger  onClick = {cancel} >Cancel</Button>
      <Button confirm onClick = {()=>props.onSave(student,interviewer)}>Save</Button>
    </section>
  </section>
</main>
  )
}

