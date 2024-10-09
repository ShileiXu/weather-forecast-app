import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Forecast = () => {
    const { data, loading, error } = useSelector((state) => state.forecast);

    if (loading) {
        return <div>Loading forecast...</div>;
    }

    if (error) {
         return <div>Error: {error}</div>;
    }

    if (!data || data.length === 0){
        return null;
    }

    const dailyForecast = data.filter((reading) =>
        reading.dt_txt.includes('12:00:00')
    );

    return (
        <div className='forecast'>
            <h3>5-Day Forecast</h3>
            <div className='forecast-container'>
                {dailyForecast.map((day) => (
                    <div key={day.dt} className='forecast-day'>
                        <h4>{moment(day.dt_txt).format('dddd')}</h4>
                        <p>Temp: {day.main.temp}°C</p>
                        <p>{day.weather[0].description}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Forecast;