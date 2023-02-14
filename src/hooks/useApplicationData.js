import axios from "axios";
import { useState,useEffect } from 'react'

export default function useApplicationData() {
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
    .then(()=>setState({...state,appointments}))
  }
  const setDay = (day) => setState({ ...state, day })

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}