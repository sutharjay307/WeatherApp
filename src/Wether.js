import React, { useEffect, useState } from 'react';
import './Weather.css'; // Ensure this path is correct
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import clear_icon from '../src/Weatherapp/clear.png';
import wind_icon from '../src/Weatherapp/wind.png';
import humidity_icon from '../src/Weatherapp/humidity.png';

function Weatherapp() {
  const [city, setCity] = useState('Ahmedabad');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '75cc097c7ee28df76a0b2a366f745d17'; // Consider moving to environment variables

  const fetchWeatherData = (cityName) => {
    setLoading(true);
    setError('');
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
      .then(res => {
        console.log('Weather data:', res.data); // Debugging line
        setWeatherData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching weather data:', err); // Debugging line
        setError('Failed to fetch data. Please check your city name or try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData(city);
    }
  };

  return (
    <div className='weather'>
      <div className='card'>
        <h1 className='title'>The Weather App</h1>
        <div className='searchbar'>
          <input
            type="text"
            placeholder='Search'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className='searchicon' onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData.main && (
          <div className='section2'>
            <img
              src={clear_icon}
              alt='clear'
              className='weathericon'
            />
            <p>{weatherData.main.temp}°C</p>
            <p>{weatherData.name}</p>
            <div className='weather-data'>
              <div className='col'>
                <img src={humidity_icon} alt='humidity icon' />
                <div>
                  <p>{weatherData.main.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className='col'>
                <img src={wind_icon} alt='wind icon' />
                <div>
                  <p>{weatherData.wind.speed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weatherapp;