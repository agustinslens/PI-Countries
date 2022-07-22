import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";


const CardDetail = (props)=>{
    const country = useSelector(state=>state.countryDetail)
    const dispatch = useDispatch();
    useEffect(()=>{
        const id= props.match.params?.id
        dispatch(getCountryDetail(id))
    },[])


    return(
        <div>
            <NavLink to='/Home'>Back</NavLink>
            <h2>{country.name}</h2>
            <h2>Country Code: {country.fifa}</h2>
            <h3>Continent: {country.continents}</h3>
            <img src={country.flags} alt="" />
            <h4>Capital: {country.capital}</h4>
            <p>Subregion: {country.subRegion}</p>
            <p>Area : {country.area} Km2</p>
            <p>Poblation: {country.poblacion}</p>
            {/* <h2>Activities: {acti}</h2> */}

        </div>
    )
}

export default CardDetail;