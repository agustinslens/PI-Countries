import React from 'react'
import { NavLink } from 'react-router-dom';
import video from "../../img/videoLanding.mp4";
import "./Landing.css";

export const Landing = () => {
    return (
        <div className='section'>
            <NavLink to='/Home'>
                <button className='landingbt' type='button'>
                 H<i className="fa-solid fa-earth-americas" ></i>ME 
                </button>
            </NavLink>
            <div className='VideoContainer'>
            <div class="colorOverlay"></div>
            <video autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            </div>
        </div>
    )
}
