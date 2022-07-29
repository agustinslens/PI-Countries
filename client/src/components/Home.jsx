import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearPage, getCountryByName, sortCountries, countriesContinent, getAllActivities, activitiesFilter } from "../redux/actions";
import CountryCards from "./CountryCards";
import CountryCard from "./CountryCard";
import Pagination from "./Pagination";
import ActivityCards from "./ActivityCards/ActivityCards";
import { NavLink } from "react-router-dom";
import './Home.css';
import imgback from '../img/backimg.png';

const Home = () => {
    const countries = useSelector(state => state.countries);
    const country = useSelector(state => state.countrybyName);
    const activities = useSelector(state => state.activities);
    const actfilter = useSelector(state => state.filterAct)
    const dispatch = useDispatch();
    const [cState, setCstate] = useState({ value: '' });
    const [state, setState] = useState();
    const [stateP, setStateP] = useState();
    let countriesWAct = []
    actfilter?.forEach((e) => e.Countries?.forEach(e => countriesWAct.push(e)))

    console.log('countact:', countriesWAct)
    useEffect(() => {
        dispatch(getAllActivities())
    }, [dispatch]);

    //paginado
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 10;
    const indexLastCard = currentPage * cardsPerPage; //10
    const indexFirstCard = indexLastCard - cardsPerPage; //10-10 =0
    const currentCard = [...countries.slice(indexFirstCard, indexLastCard)] // slice(10,20)
    const paginate = (page) => setCurrentPage(page)
    //busqueda por nombre
    const handleChange = (e) => {
        setCstate({
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getCountryByName(cState.value))
    }
    //clear button
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(clearPage())
    }
    //ordenamiento por alfabeto
    const handleChangeA = (e) => {
        e.preventDefault();
        if (e.target.value === 'A-Z') {
            function SortArray(x, y) {
                if (x.name < y.name) { return -1; }
                if (x.name > y.name) { return 1; }
                return 0;
            }
            setState(true)
            let c = countries.sort(SortArray);
            dispatch(sortCountries(c))

        } else if (e.target.value === 'Z-A') {
            function SortArray(x, y) {
                if (x.name < y.name) { return 1; }
                if (x.name > y.name) { return -1; }
                return 0;
            }
            setState(false)
            let c = countries.sort(SortArray);
            dispatch(sortCountries(c))
        }
    }
    //ordenamiento por poblacion
    const handleChangeP = (e) => {
        e.preventDefault();
        if (e.target.value === 'Mayor') {
            function SortArray(x, y) {
                if (x.poblacion < y.poblacion) { return 1; }
                if (x.poblacion > y.poblacion) { return -1; }
                return 0;
            }
            setStateP(true)
            let c = countries.sort(SortArray);
            dispatch(sortCountries(c))

        } else if (e.target.value === 'Minor') {
            function SortArray(x, y) {
                if (x.poblacion < y.poblacion) { return -1; }
                if (x.poblacion > y.poblacion) { return 1; }
                return 0;
            }
            setStateP(false)
            let c = countries.sort(SortArray);
            dispatch(sortCountries(c))
        }
    }
    //filtrado por continente
    const handleChangeC = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        dispatch(countriesContinent(e.target.value));
    }
    const handleChangeAct = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        dispatch(activitiesFilter(e.target.value));

    }
    const act = [...activities]
    return (


        <div >
            <img className="backimg" src={imgback} alt="" />
            <div className="inputs">
                <div className="active">
                    <NavLink to='/' > <button className="btn-nice"><i className="fa-solid fa-square-caret-left"></i> Back</button></NavLink>
                </div>
                <div>
                    <NavLink exact to='/CreateActivity'><button className="btn-nice"><i className="fa-solid fa-person-skiing-nordic"></i> Create Activity</button> </NavLink>
                </div>
                {/* busdcador de paises*/}
                <div className="topnav">
                    <form className="formhome" onSubmit={handleSubmit}>
                        <label className="blanco" > Search your Country: </label>
                        <input className="search-box" type="search" pattern=".*\S.*" 
                        name="value" placeholder="Write your country..." onChange={handleChange} required />
                        
                        <button className="bs" type="submit" >
                            <i className="fa-solid fa-magnifying-glass-location"></i></button>
                    </form>
                </div>
                {/* button */}
                <div>
                    <button className="btn-nice" type="button" onClick={handleClick}><i className="fa-solid fa-arrow-rotate-right"></i> Reset</button>
                </div>

                <div >
                    {/* Ordenado por alfabetico*/}
                    <p className="blanco">Choose an alphabetical order</p>
                    <select className="selectors" onChange={(e) => handleChangeA(e)}>
                        
                        <option className="opt">Choose Order</option>
                        <option className="opt" value="A-Z">A-Z</option>
                        <option className="opt" value="Z-A">Z-A</option>
                    </select>
                </div>
                <div >
                    {/* Ordenado por poblacion*/}
                    <p className="blanco">Choose a poblational order</p>
                    <select  className="selectors" onChange={(e) => handleChangeP(e)}>
                        <option >Choose Order</option>
                        <option value="Mayor">Mayor poblation first</option>
                        <option value="Minor">Minor poblation first</option>
                    </select>
                </div>
                <div >
                    {/* Filtrado por Continente */}

                    <p className="blanco"> <i className="fa-solid fa-globe"></i> Select a continent</p>
                    <select className="selectors" onChange={(e) => handleChangeC(e)}>
                        <option >Choose Continent</option>
                        <option value="All">All</option>
                        <option value="Africa">Africa</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                <div >
                    {/* Filtrado por Actividad */}
                    <p className="blanco">Select an Activity</p>
                    <select className="selectors" onChange={(e) => handleChangeAct(e)}>
                        <option >Choose Activity</option>
                        <option value="All">All</option>
                        {act?.map(e => {
                            return <option value={e.name}>{e.name}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className="cards">

                {actfilter.length > 0 ?
                    countriesWAct.map(e => {
                        return (
                            <ActivityCards
                                key={e.fifa}
                                id={e.fifa}
                                name={e.name}
                                flags={e.flags}
                                continents={e.continents}
                                poblacion={e.poblacion}
                                capital={e.capital}
                            />
                        )
                    })
                    :
                    Object.keys(country).length > 0 ?
                        <CountryCard
                            key={country.fifa}
                            id={country.fifa}
                            name={country.name}
                            continents={country.continents}
                            flags={country.flags}
                            poblacion={country.poblacion}
                            capital={country.capital}
                        /> :
                        <div>
                            <div>
                                <Pagination
                                    current={currentPage}
                                    cardsPerPage={cardsPerPage}
                                    totalCards={countries.length}
                                    paginate={paginate}
                                />
                            </div>
                            <div className="card">
                                {currentCard?.map(e => {
                                    return (
                                        <CountryCards
                                            key={e.fifa}
                                            id={e.fifa}
                                            area={e.area}
                                            capital={e.capital}
                                            continents={e.continents}
                                            flags={e.flags}
                                            name={e.name}
                                            poblacion={e.poblacion}
                                            subRegion={e.subRegion}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                }
            </div>

        </div>

    )
}

export default Home;