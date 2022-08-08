import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllActivities, getCountryDetail } from "../../redux/actions";
import img from '../../img/act.jpg';
import './CardDetail.css';

const CardDetail = (props) => {
    const country = useSelector(state => state.countryDetail)
    const activity = useSelector(state => state.activities)
    const dispatch = useDispatch();
    const id = props.match.params?.id
    useEffect(() => {

        dispatch(getCountryDetail(id))
        dispatch(getAllActivities())
    }, [dispatch,id])
    let act = activity?.filter(e => {

        let x = e.Countries?.filter(f => f.fifa === id)

        if (x.length > 0) return e
        else { return 0 }
    })

    console.log('act:_', act)
    return (
        <div>
            <img className="imgact" src={img} alt="" />

            <div className="active">
                <NavLink to='/Home'><button className="btn-nice-act"><i className="fa-solid fa-square-caret-left"></i> Back</button></NavLink>
            </div>
            <div className="conteiner-act">
                <div className="countrdetail">
                    <h1>Country details</h1>
                    <h2>{country.name}</h2>
                    
                    <h2>Continent: {country.continents}</h2>
                    <img className="imgdet" src={country.flags} alt="" />
                    <h4>Capital: {country.capital}</h4>
                    <p>Subregion: {country.subRegion}</p>
                    <p>Area : {country.area} Km2</p>
                    <p>Population: {country.poblacion}</p>
                    <p>Country Code: {country.fifa}</p>
                    <br />
                </div>
                
                <div > 
                <h2 className="h22">Activities</h2>
                <div className="actdet"> 
                    {act.length > 0 ? act?.map(e => {
                        return <div className="eachAct" key={e.id}>
                            <h3>Name: {e.name}</h3>
                            <p>Difficulty: {e.difficulty}</p>
                            <p>Duration: {e.duration}</p>
                            <p>Season to do: {e.season}</p>
                        </div>
                    }) : <div className="notact">
                        This Country does not have any activities yet
                        <p>Click here to add one</p> <NavLink exact to='/CreateActivity' > <button className="btn-nice-act-a"> Create Activity</button></NavLink>
                    </div>}
                </div>
            </div>
</div>
        </div>
    )
}

export default CardDetail;