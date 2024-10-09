import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

const getCurrentWeather = (city) => {
    return axios.get(`${BASE_URL}/weather`, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        },
    });
};

const getForecast = (city) => {
    return axios.get(`${BASE_URL}/forecast`, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        }
    })
}

export default {
    getCurrentWeather,
    getForecast
};