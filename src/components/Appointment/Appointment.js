import React from 'react'
import Empty from './Empty'
import Header from './Header'
import Show from './Show'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'


const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETE = "DELETE"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE ="ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"
/**  A holy combinations of the components in this folder to make 
 a seamless transistion between different modes for an appointment
slot  
 Uses props: id,interview,interviewers,bookInterview,cancelInterview */

export default function Appointment(props){

  const {id,interview,interviewers,bookInterview,cancelInterview} = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING)

    bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }

  function cancel(){
    transition(DELETE,true)

    cancelInterview(id)
    .then(()=>transition(EMPTY))
    .catch(()=>transition(ERROR_DELETE,true))
  }

  return (
    <article className="appointment">
      <Header time = {props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete = {()=>transition(CONFIRM)}
          onEdit = {()=>transition(EDIT)}
        />
      )}

      {mode === CREATE && 
      <Form  
      interviewers ={interviewers} 
      onSave = {save} 
      onCancel={back} />}

        {mode === SAVING && 
        <Status message="Saving"/>
      }

      {mode === DELETE && 
        <Status message="Deleting"/>
      }

      {mode === CONFIRM &&
        <Confirm message='Delete the appointment?' onConfirm ={cancel} onCancel = {back}/>
      }

      {mode === EDIT &&
        <Form 
        student= {interview.student}
        interviewer = {interview.interviewer.id} 
        interviewers ={interviewers} 
        onSave = {save} 
        onCancel={back} />
      }

      {mode === ERROR_DELETE &&  
      <Error message = "Could not delete appointment." onClose = {back}/>
        }
      {mode === ERROR_SAVE &&  
      <Error message = "Could not save appointment." onClose = {back}/>
        }  
      
    </article>
  )
}



