import axios from "axios";
import { useState,useEffect } from 'react'
import { getAppointmentsForDay } from "helpers/selectors";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  function updateSpots (currentState){
    const spots = getAppointmentsForDay(currentState, currentState.day).
    filter(appointment => appointment.interview === null)
    .length

    console.log(spots)

    // console.log(getAppointmentsForDay(currentState, currentState.day))
    const dayIndex =currentState['days'].findIndex(thisDay => thisDay.name === currentState.day)

    const days = [...currentState.days,]
    
    days[dayIndex] = {...currentState.days[dayIndex],spots}
    console.log(days)
    return days
    // setState({...currentState,days})
    
    
  }
  function bookInterview(id, interview) {
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
      
      setState((prev)=>{
        const days = updateSpots({...prev,appointments})
        return{...prev,appointments,days}
      })
      
     
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
    .then(()=>{
      setState((prev)=>{
        const days = updateSpots({...prev,appointments})
        return{...prev,appointments,days}})
    })
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