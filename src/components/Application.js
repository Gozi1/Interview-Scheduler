import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment"
import { useState,useEffect } from 'react'
import { Appointment } from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay,getInterview } from "helpers/selectors";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };
export default function Application(props) {

  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

//   const setDays = (days) => {
//     setState({...state,days})
// }

  useEffect(()=>{

    const daysUrl ='/api/days'
    const appointmentsUrl = '/api/appointments'
    const interviewersUrl = '/api/interviewers'

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)

    ]).then((all)=>{
 
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,interviewers:all[2].data}));
    })
    
  },[]);
//   const appointments = getAppointmentsForDay(state, day);

// const schedule = appointments.map((appointment) => {
//   const interview = getInterview(state, appointment.interview);

//   return (
//     <Appointment
//       key={appointment.id}
//       id={appointment.id}
//       time={appointment.time}
//       interview={interview}
//     />
//   );
// });
  const dailyAppointments = getAppointmentsForDay(state,state.day);

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
          return (<Appointment key = {appointment.id} {...appointment}/>)
        })}
      </section>
    </main>
  );
}
