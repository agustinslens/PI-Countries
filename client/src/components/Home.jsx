import React, {   useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearPage, getCountryByName, sortCountries, countriesContinent } from "../redux/actions";
import CountryCards from "./CountryCards";
import Nav from "./Nav";
import CountryCard from "./CountryCard";
import Pagination from "./Pagination";




const Home = () => {
    const countries = useSelector(state => state.countries);
    const country = useSelector(state => state.countrybyName);
    const dispatch = useDispatch();
    const [cState, setCstate] = useState({ value: '' })
    const [state, setState] = useState()
    const [stateP, setStateP] = useState()
    const [stateC, setStateC] = useState()

    
    
    
    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    
    const cardsPerPage = countries.length / Math.ceil(countries.length * 0.1); // 10
    const indexLastCard = currentPage * cardsPerPage; //10
    const indexFirstCard = indexLastCard - cardsPerPage; //10-10 =0
    const currentCard = [...countries.slice(indexFirstCard, indexLastCard)] // slice(10,20)
    const paginate = (page) =>setCurrentPage(page)
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
        dispatch(countriesContinent(e.target.value))
        setStateC(true)
    }
    console.log(countries)
    return (

        <div>
            <Nav />
            <form onSubmit={handleSubmit}>
                Search your Country: <input type="search" name="value" placeholder="Write your country..." onChange={handleChange} />
                <button type="submit" >Search</button>
            </form>
            <button type="button" onClick={handleClick}>Clear</button>

            <div>
                {/* Ordenado por alfabetico*/}
                <p>Choose an alfabetical order</p>
                <select onChange={(e) => handleChangeA(e)}>
                    <option >Choose Order</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <br />
                {/* Ordenado por poblacion*/}
                <p>Choose an poblational order</p>
                <select onChange={(e) => handleChangeP(e)}>
                    <option >Choose Order</option>
                    <option value="Mayor">Mayor poblation first</option>
                    <option value="Minor">Minor poblation first</option>
                </select>
            </div>
            <br />
            {/* Filtrado por Continente */}
            <p>Select a continent</p>
            <select onChange={(e) => handleChangeC(e)}>
                <option >Choose Continent</option>
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            <br />
            {/* Filtrado por Actividad */}
            {/* <p>Select an Activity</p>
            <select onChange={(e) => handleChangeA(e)}>
                <option >Choose Activity</option>
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select> */}
            <div>

                {Object.keys(country).length > 0 ?
                    <CountryCard
                        key={country.fifa}
                        id={country.fifa}
                        name={country.name}
                        continents={country.continents}
                        flags={country.flags}
                    /> :
                    <div>
                        <h1>Countries</h1>
                        <div>
                            <Pagination
                                cardsPerPage={cardsPerPage}
                                totalCards={countries.length}
                                paginate={paginate}
                            />
                        </div>
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
                }
            </div>


        </div>
    )

}

export default Home;