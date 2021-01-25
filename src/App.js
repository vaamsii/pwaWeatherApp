import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({}); //we are setting the weather to the data we recieve from API
    
    const search = async (e) => {
        if(e.key === 'Enter') { //once the search is done this will run
            const data = await fetchWeather(query); //we will fetch the weather data based of the search

            setWeather(data);
            setQuery(''); //this will reset the query
        }
    }

    return (
        <div className="main-container">
             <h1 className="Heading">
                        <span>Weather Around the Globe</span>
                    </h1>
            <input
                type="text"
                className="search"
                placeholder="Enter the City Name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}onKeyPress={search}
            />
            {weather.main && ( 
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="city-feels-like">
                        <span>Feels like: </span>
                        {Math.round(weather.main.feels_like)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="city-temp-minmax">
                        <span> High: </span>
                        {Math.round(weather.main.temp_max)}
                        <sup>&deg;C </sup>
                        <span> Low: </span>
                        {Math.round(weather.main.temp_min)}
                        <sup>&deg;C </sup>
                    </div>
                    <div className="city-humidity">
                        <span>Humidity: </span>
                        {Math.round(weather.main.humidity)}
                        <span>% </span>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                    <div className="city-temp-latlog">
                        <span> Longitude: </span>
                        {weather.coord.lon}
                        <sup>&deg; </sup>
                        <span> Lattitude: </span>
                        {weather.coord.lat}
                        <sup>&deg; </sup>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;