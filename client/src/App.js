import './App.css';
import React, { useEffect } from "react";
import { Route } from 'react-router-dom';
import Home from '../src/components/Home';
import { NavLink } from 'react-router-dom';
import CountryCard from './components/CountryCard';
import CardDetail from '../src/components/CardDetail/CardDetail';
import { useDispatch } from 'react-redux';
import { getAllCountries } from './redux/actions';
import CreateActivity from './components/CreateActivity/CreateActivity';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllCountries())
}, [])
 
  return (
    <React.Fragment>
      <Route exact path='/'>
        <NavLink to='/Home'>
          <button type='button'>
            Home
          </button>
        </NavLink>
      </Route>
      
      <Route exact path='/Home/Country' component={CountryCard}></Route>
      <Route exact path='/Home' component={Home}></Route>
      <Route exact path='/Home/:id' component={CardDetail}></Route>
      <Route exact path='/CreateActivity' component={CreateActivity}></Route>

    </React.Fragment>
  );
}

export default App;
