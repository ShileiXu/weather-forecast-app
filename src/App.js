import logo from './logo.svg';
import React from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HomeCity from './components/HomeCity';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Current Weather</h1>
      <HomeCity></HomeCity><SearchBar></SearchBar>
      
      <CurrentWeather />
      <Forecast/>
    </div>
  );
};

export default App;
