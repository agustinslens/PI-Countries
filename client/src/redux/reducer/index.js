import {
    GET_ALL_COUNTRIES, GET_BY_NAME,
    CLEAR_PAGE, SORT_COUNTRIES,
    SORT_CONTINENT, GET_COUNTRY_DETAIL,
    GET_ALL_ACTIVITIES,ACTIVITIES

} from '../actions';


const initialState = {
    countries: [],
    countrybyName: {},
    countryDetail: {},
    activities: [],
    filterAct:[]
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: state.countries.concat(action.payload)
            }
        case GET_BY_NAME:
            return {
                ...state,
                countrybyName: action.payload
            }
        case CLEAR_PAGE:
            return {
                ...state,
                countrybyName: {},
                filterAct:[]
            }
        case SORT_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case SORT_CONTINENT:
            return {
                ...state,
                countries: action.payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: state.activities.filter(e => {
                    return e.id === action.payload.id
                })
                    .concat(action.payload)
            }

        case ACTIVITIES:
            return {
                ...state,
                filterAct: action.payload
            }

        default:
            return state;
    }
}
export default rootReducer;