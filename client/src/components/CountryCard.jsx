import React from "react";
import { NavLink } from "react-router-dom";

const CountryCard =(props)=>{

  return (
    <div>
      {<NavLink exact to={`/Home/${props.id}`}>  <h3>{props.name}</h3></NavLink>}
                <h3>{props.continents}</h3>
                <img src={props.flags}></img>

    </div>
  )
}

export default CountryCard