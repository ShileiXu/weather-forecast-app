import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeCityWeather, setHomeCity } from '../redux/homeCitySlice';

const HomeCity = () => {
    const dispatch = useDispatch();
    const { data, loading, error , homeCityName } = useSelector((state) => state.homeCity);
    useEffect(() => {
        // On component mount, fetch weather for the home city if set
        if (homeCityName) {
            dispatch(fetchHomeCityWeather(homeCityName));
        }
    }, [dispatch, homeCityName]);

    const handleSetHomeCity = () => {
        const city = prompt('Enter your Home City:');
        if (city) {
            dispatch(setHomeCity(city));
            dispatch(fetchHomeCityWeather(city));
        }
    };

    return (
        <div className='home-city'>
            <button onClick={handleSetHomeCity}>Set Home City</button>
            {loading && <div>Loading Home City weather...</div>}
            {error && <div>Error: {error}</div>}
            {data && (
                <div className='current-weather'>
                    <h2>Home City: {data.name}, {data.sys.country}</h2>
                    <p>Temperature: {data.main.temp}°C</p>
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Wind Speed: {data.wind.speed} m/s</p>
                    <p>Conditions: {data.weather[0].description}</p>
                </div>
            )}

        </div>
    );
};

export default HomeCity;