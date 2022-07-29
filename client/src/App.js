import './App.css';
import React, { useEffect } from "react";
import { Route } from 'react-router-dom';
import Home from '../src/components/Home';
import CountryCard from './components/CountryCard';
import CardDetail from '../src/components/CardDetail/CardDetail';
import { useDispatch } from 'react-redux';
import {  getAllCountries } from './redux/actions';
import CreateActivity from './components/CreateActivity/CreateActivity';
import { Landing } from './components/Landing/Landing';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllCountries())
}, [dispatch])


  return (
    <React.Fragment>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/Home/Country' component={CountryCard}></Route>
      <Route exact path='/Home' component={Home}></Route>
      <Route exact path='/Home/:id' component={CardDetail}></Route>
      <Route exact path='/CreateActivity' component={CreateActivity}></Route>

    </React.Fragment>
  );
}

export default App;
