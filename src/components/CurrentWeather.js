import React from 'react';
import { useSelector } from 'react-redux';

const CurrentWeather = () => {
    const { current, loading, error } = useSelector((state) => state.weather);
     if (loading){
        return <div>Loading current weather...</div>
     }

     if (error) {
         return <div>Error: {error}</div>
     }
      if (!current){
        return <div>Please enter the name of a city</div>
      }

      return (
        <div className='current-weather'>
            <h2>
                {current.name}, {current.sys.country}
            </h2>
            <p>Temperature: {current.main.temp}°C</p>
            <p>Humidity: {current.main.humidity}%</p>
            <p>Wind Speed: {current.wind.speed} m/s</p>
            <p>Conditions: {current.weather[0].description}</p>
        </div>
      );
};

export default CurrentWeather;