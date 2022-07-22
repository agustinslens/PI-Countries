import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createActivity } from "../../redux/actions";
import './CreateActivity.css';


const CreateActivity = () => {
    const [state, setState] = useState({
        name: '',
        difficulty: 1,
        duration: '00:00',
        season: 'Verano',
        countryName: []
    })
    const dispatch = useDispatch();
    const handleChange = (e) => {
        if (e.target.name === 'difficulty') {
            setState({
                ...state,
                [e.target.name]: parseInt(e.target.value)
            })
        } else if(e.target.name==='countryName'){
            setState({
                ...state,
                [e.target.name]: [e.target.value]
            })
        }else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createActivity(state))
    }

    console.log(state)
    return (
        <div>
            <NavLink to='/Home' >Back</NavLink>

            <h1>Actividad</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name='name' onChange={handleChange} />
                <label>Difficulty: </label>
                <select name="difficulty" onChange={handleChange}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label>Aprox duration: </label>
                <input type="time" name='duration' onChange={handleChange} />
                <label>Season: </label>
                <select name="season" onChange={handleChange}>
                    <option value="Verano">Summer</option>
                    <option value="Otoño">Autumn</option>
                    <option value="Invierno">Winter</option>
                    <option value="Primavera">Spring</option>
                    <option value="5">All Seasons</option>
                </select>
                <label>Country: </label>
                <input type="text" name='countryName' onChange={handleChange} />
                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
}

export default CreateActivity;