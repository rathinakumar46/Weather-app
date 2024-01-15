import React, { useState } from "react";
import "./weatherapp.css";
import searchIcon from "../Assets/search.png";
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import axios from "axios";

function WeatherApp() {
  const [city, setCity] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);

  function handleCityChange(evt) {
    setCity(evt.target.value);
  }

  function getWeather() {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e345a8363cdb6f22fd3fc7f4bce60b4a`)
      .then((response) => {
          setWeatherData(response.data);
        })
      .catch((error) => {
          console.error("Error fetching weather data", error);
        });
  }

  let weatherIcon;
  if (weatherData) {
    const { main } = weatherData.weather[0];
    switch (main) {
      case "Clear":
        weatherIcon = clearIcon;
        break;
      case "Clouds":
        weatherIcon = cloudIcon;
        break;
      case "Drizzle":
        weatherIcon = drizzleIcon;
        break;
      case "Rain":
        weatherIcon = rainIcon;
        break;
      case "Snow":
        weatherIcon = snowIcon;
        break;
      default:
        weatherIcon = cloudIcon;
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          label="Search city"
          placeholder="Enter city name..."
          value={city}
          onChange={handleCityChange}
        />
        <button
          className="search-icon"
          onClick={getWeather}
          aria-label="Search">
          <img src={searchIcon} alt="Search symbol" />
        </button>
      </div>
      <div className="weather-image">
        {weatherIcon && <img src={weatherIcon} alt="weather condition" />}
      </div>
      {weatherData && (
        <>
          <div className="weather-temp">{weatherData.main.temp}°C</div>
          <div className="weather-description">{weatherData.weather[0].description}</div>
          <div className="weather-location">{weatherData.name}</div>
        </>
      )}
    </div>
  );
}

export default WeatherApp;