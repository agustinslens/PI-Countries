import React from 'react'
import { NavLink } from 'react-router-dom'
import './ActivityCards.css';

 const ActivityCards = (props) => {
    console.log(props.key)
  return (
    <div className="card">
      <div class="grid-item">
        <div className="theCard">
          <div className="front">
             <h3>{props.name}</h3>
            <h4>{props.continents}</h4>
            <img className="imggg" src={props.flags} alt=''></img>
            <p>Pop.: {props.poblacion}</p>
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


export default ActivityCards

{/* <div className="card">
      <div class="grid-item">
        <div className="theCard">
          <div className="front">
             <h3>{props.name}</h3>
            <h4>{props.continents}</h4>
            <img className="imggg" src={props.flags} alt=''></img>
            <p>Pop.: {props.poblacion}</p>
          </div>
          <div className="back">
            <h2>{props.name}</h2>
            <h3>Capital: {props.capital}</h3>
            {<NavLink exact to={`/Home/${props.id}`}>  <p>See more</p></NavLink>}
          </div>
        </div>
      </div>
    </div> */}