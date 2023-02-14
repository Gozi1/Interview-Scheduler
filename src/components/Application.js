import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment"
import { useState,useEffect } from 'react'
import { Appointment } from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay,getInterview,getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {

  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
    
    console.log(interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, {interview} )
    .then(()=>{
      setState({...state,appointments})
     
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview:null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    .then()
  }

  const setDay = day => setState({ ...state, day });



  useEffect(()=>{

    const daysUrl ='/api/days'
    const appointmentsUrl = '/api/appointments'
    const interviewersUrl = '/api/interviewers'

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
      
    ]).then((all)=>{

      
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,interviewers:all[2].data}))
    })
    
  },[]);

  const dailyAppointments = getAppointmentsForDay(state,state.day)
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  onChange={day =>setDay(day)}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment)=>{
          const interview = getInterview(state, appointment.interview); 
          return (<Appointment 
            key = {appointment.id} {...appointment} 
            interviewers = {getInterviewersForDay(state,state.day)} bookInterview = {bookInterview}
            cancelInterview ={cancelInterview}
            id={appointment.id}
            time={appointment.time}
            interview={interview}

            />)
        })}
      </section>
    </main>
  );
}
