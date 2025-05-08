import React, { useState } from 'react';
import './Weather.css';
import search from '../img/search.png';
import Rainy from '../img/Rainy.jpeg';
import Sun from '../img/Sun.png';
import Cloud from '../img/Cloud.jpeg';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [error, setError] = useState('');

  const apiKey = "bd5e378503939ddaee76f12ad7a97608";

  const imageMap = {
    Rain: Rainy,
    Thunderstorm: Rainy,
    Drizzle: Rainy,
    Clear: Sun,
    Clouds: Cloud,
  };

  const fetchWeather = () => {
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        const condition = data.weather[0].main;
        setWeatherIcon(imageMap[condition] || Rainy);
        setError(''); // Clear previous error
      })
      .catch((err) => {
        console.error(err.message);
        setWeatherData(null);
        setWeatherIcon(null);
        setError("City not found. Please try again.");
      });
  };

  return (
    <div className="weather">
      <form className="weather-box" onSubmit={(e) => e.preventDefault()}>
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <img src={search} alt="Search" onClick={fetchWeather} />
        </div>

        {error && <p className="error">{error}</p>}

        {weatherIcon && <img src={weatherIcon} alt="Weather" className="weather-icon" />}

        {weatherData && (
          <>
            <p className="temp">{weatherData.main.temp}°C</p>
            <p className="city">{weatherData.name}</p>
          </>
        )}
      </form>
    </div>
  );
};

export default Weather;
