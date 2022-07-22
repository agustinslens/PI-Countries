import React from "react";
import { NavLink } from "react-router-dom";
import './CountryCards.css';

const CountryCards =(props)=>{

  return (
    <div className="card">
      {<NavLink exact to={`/Home/${props.id}`}>  <h2>{props.name}</h2></NavLink>}
        <h3>Continent: {props.continents}</h3>
        <img src={props.flags}></img>

    </div>
  )
}

export default CountryCards