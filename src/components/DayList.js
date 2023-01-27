import React from 'react'
import DayListItem from './DayListItem'

const DayList = (props) => {
  const daysList = props.days.map((day)=>{
  return (<DayListItem name={day.name} spots={day.spots} key ={day.name}   selected={day.name === props.day} />)}
  )

  return (
    <ul>{daysList}</ul>
  )
}

export default DayList