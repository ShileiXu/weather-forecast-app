import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentWeather } from '../redux/weatherSlice';
import { fetchForecast } from '../redux/forecastSlice';

const SearchBar = () => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (city.trim() === '') return;
        dispatch(fetchCurrentWeather(city));
        dispatch(fetchForecast(city));
        setCity('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter'){
            handleSearch();
        }
    };

    return (
        <div className='search-bar'>
            <input
            type="text"
            placeholder='Enter city name'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>

        </div>

    );
};

export default SearchBar;