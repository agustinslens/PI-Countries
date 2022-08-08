import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const CLEAR_PAGE = 'CLEAR_PAGE';
export const SORT_COUNTRIES = 'SORT_COUNTRIES';
export const SORT_CONTINENT = 'SORT_CONTINENT';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const ACTIVITIES = 'ACTIVITIES';


export const getAllCountries = () => {
    return async function (dispatch) {
        return axios.get('/countries')
            .then(data => dispatch({ type: 'GET_ALL_COUNTRIES', payload: data.data }))
            .catch(error => console.log(error.response))
    }
}

export const getCountryByName = (value) => {
    return async function (dispatch) {
        return axios.get(`/countries?name=${value}`)
            .then(data =>{ dispatch({ type: 'GET_BY_NAME', payload: data.data[0] })})
            .catch(error => alert(error.response.data))
    }
}

export function clearPage() {
    return {
        type: 'CLEAR_PAGE'
    }
}

export function sortCountries(arr) {
    return {
        type: 'SORT_COUNTRIES',
        payload: arr
    }
}
export function countriesContinent(cont) {
    return async function (dispatch) {
        let data = await axios.get('/countries')
        if (cont === 'All') {
            dispatch({ type: 'SORT_CONTINENT', payload: data.data })
        }
        else {
            let filtrado = data.data.filter(e => e.continents === cont)
            dispatch({ type: 'SORT_CONTINENT', payload: filtrado })
        }
    }
}
export const getCountryDetail = (id) => {
    return  function (dispatch) {
        return axios.get(`/countries/${id}`)
            .then(data =>{ dispatch({ type: 'GET_COUNTRY_DETAIL', payload: data.data })})
            .catch(error => alert(error.response.data))
    }
}

export const createActivity = (obj) => {
    return async function (dispatch) {
        return axios.post(`/activities`, {
            name: obj.name,
            difficulty: obj.difficulty,
            duration: obj.duration,
            season: obj.season,
            countryName: obj.countryName
        })
            .then(data => {
                
                alert('Activity added!')
            }
            )
            .catch(error => alert(error.response.data))
    }
}

export const getAllActivities = () => {
    return  function (dispatch) {
        return axios.get('/activities')
            .then(data => dispatch({ type: 'GET_ALL_ACTIVITIES', payload: data.data }))
            .catch(error => console.log(error.response))
    }
}

export function activitiesFilter(f) {
    return async function (dispatch) {
        let data = await axios.get('/activities')
        if (f === 'All') {
            dispatch({ type: 'ACTIVITIES', payload: data.data })
        }
        else {
            let filtrado = data.data.filter(e => e.name === f)
            dispatch({ type: 'ACTIVITIES', payload: filtrado })
        }
    }
}