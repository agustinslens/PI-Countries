import React from "react";
import { NavLink } from "react-router-dom";

const CountryCard = (props) => {


  return (
    <div className="card">
      <div class="grid-item">
        <div className="theCard">
          <div className="front">
            {<NavLink exact to={`/Home/${props.id}`}>  <h3>{props.name}</h3></NavLink>}
            <h4>Continent: {props.continents}</h4>
            <img className="imggg" src={props.flags} alt=''></img>
            <p>Population: {props.poblacion}</p>
          </div>
          <div className="back">
            <h2>{props.name}</h2>
            <h3>Capital: {props.capital}</h3>
            {<NavLink exact to={`/Home/${props.id}`}>  <p>See more</p></NavLink>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryCard
