import React from "react";
import "components/DaylistItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  return (
    
      <li className="day-list__item" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}spots remaining</h3>
    </li>
  );
}