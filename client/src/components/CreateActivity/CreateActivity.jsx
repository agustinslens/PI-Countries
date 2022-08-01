import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createActivity } from "../../redux/actions";
import './CreateActivity.css';
import imagen from "../../img/creatact.jpg";

export function validate(state) {
    let errors = {};
    if (!state.name) {
        errors.name = 'Activity name is required';
    }

    return errors;
}
const CreateActivity = () => {
    const data = useSelector(state => state.countries)
    const [filterData, setFilterData] = useState([])
    const [errors, setError] = useState({})
    const [state, setState] = useState({
        name: '',
        difficulty: 1,
        duration: '00:00',
        season: 'Verano',
        countryName: []
    })
    const dispatch = useDispatch();
    /* creacion del form  */
    const handleChange = (e) => {

        setError(validate({ ...state, [e.target.name]: e.target.value }))
        if (e.target.name === 'difficulty') {
            setState({
                ...state,
                [e.target.name]: parseInt(e.target.value)
            })
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }
    /* submit del form */
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createActivity(state))
        setState({
            name: '',
            difficulty: 1,
            duration: '00:00',
            season: 'Verano',
            countryName: []
        })
    }
    /* seleccionador del dropdown de paises */
    const handleClick = (e) => {
        e.preventDefault();
        console.log("entro al click de seleecccionar paises")
        if (!state.countryName.includes(e.target.value)) {
            setState({
                ...state,
                countryName: [...state.countryName, e.target.value]
            })
        }
        else {
            alert('can not repeat countries')
            return setState({ ...state });

        }
        setFilterData([])

    }
    /* autocompletado */
    const handlefilter = (e) => {
        e.preventDefault();
        const searchW = e.target.value;
        const newFilter = data.filter(e => {
            return e.name.toLowerCase().includes(searchW.toLowerCase());
        });
        if (searchW === "") setFilterData([])
        else {
            setFilterData(newFilter);
        }
    }
    /* Eraser de paises seleccionados */
    const handleErase = (e) => {
        e.preventDefault();
        console.log("entro al click de eliminar paises")
        console.log(e.target.value)
        const p = e.target.value
        return setState({
            ...state,
            countryName: state.countryName.filter(e => e !== p)
        })
    }
    console.log('state: ', state)
    return (
        <div>
            <img className="imgcreat" src={imagen} alt="" />
            <div className="active">
                <NavLink to='/Home'><button className="btn-nice-crea"><i className="fa-solid fa-square-caret-left"></i> Back</button></NavLink>
            </div>
            <div className="cont">
                <div>
                    <h1>Create your activity</h1>
                </div>
                <div className="cont">
                    <div>
                        <form className="formC" onSubmit={handleSubmit}>
                            <label>Name: </label>
                            <input className={errors.name && 'danger'} type="text" name='name' value={state.name} onChange={handleChange} />
                            <label>Difficulty: </label>
                            <select name="difficulty" value={state.difficulty} onChange={handleChange}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <label>Aprox duration: </label>
                            <input type="time" name='duration' value={state.duration} onChange={handleChange} />
                            <label>Season: </label>
                            <select name="season" value={state.season} onChange={handleChange}>
                                <option value="Summer">Summer</option>
                                <option value="Autumn">Autumn</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="All Seasons">All Seasons</option>
                            </select>
                            <label>Los paises seleccionados son: </label>{state.countryName?.map((e, key) => {
                                return <div className='clear' key={key}> <div className="xx">{e} <img className="imgcreate" src={data.find(f => f.name === e)?.flags} alt="" /></div>
                                    <div key={key}><button key={key} className="btn-nice-crea-clear" value={e} onClick={handleErase}>X</button></div></div>
                            })}

                            <button className="btn-nice-crea-creatactt" type="submit">Create Activity</button>
                        </form>
                    </div>
                </div>
                <div className="search">
                    Search Countries to add:
                    <div className="searchInputs">
                        <input className="search-box-crea" type="text" placeholder="Search a country" name="countryName" onChange={handlefilter} />
                        <div className="searchIcon"> </div>
                    </div>
                    {filterData.length !== 0 && (
                        <div className="dataResult">
                            {filterData.slice(0, 5).map((e) => {
                                return <button type="button" className="btn-nice-crea" key={e.fifa} value={e.name} onClick={handleClick}>
                                    {e.name}
                                    <img className="imgcreate" src={e?.flags} alt="" />
                                </button>
                            })}
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default CreateActivity;