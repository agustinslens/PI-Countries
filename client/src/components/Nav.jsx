import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ()=>{
    return(
        <div>
            <NavLink to='/' >Back</NavLink>
                <br/>
            <NavLink exact to='/CreateActivity'>Create Activity</NavLink>
            
        </div>
    )
}
export default Nav;