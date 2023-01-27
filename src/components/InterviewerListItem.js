import React from 'react'
import "components/InterviewerList.scss";
import classNames from "classnames";


const InterviewListItem = (props) => {
  const{id,name,avatar,setInterviewer,selected} = props
  return (
    <>{selected? 
      <li onClick={()=>setInterviewer(id)} className="interviewers__item--selected">
        <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
      {name}
    </li>

    :
    <li onClick={()=>setInterviewer(id)} className="interviewers__item">
    <img
  className="interviewers__item-image"
  src={avatar}
  alt={name}
/>
</li>}
    </>
    
    
  )
}

export default InterviewListItem