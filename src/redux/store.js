import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import forecastReducer from './forecastSlice';
import homeCityReducer from './homeCitySlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        forecast: forecastReducer,
        homeCity: homeCityReducer
    },
});

export default store;