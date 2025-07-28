import React, { useState } from "react";
import axios from "axios";
import './style.css'

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = () => {
    const apiKey = "514c10b7b1e05cb7ba2f5b4b96326cbc";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        setErrorMsg("");
      })
      .catch(() => {
        setWeatherData(null);
        setErrorMsg("City not found!");
      });
  };

  return (
    <div className="container">
      <h1>WeatherApp</h1>
      <input
        type="text"
        placeholder="Search city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {errorMsg && <p>{errorMsg}</p>}

      {weatherData && (
        <div className="weather-info">
          <h1>City: {weatherData.name}</h1>
          <h2>Tempreture: {weatherData.main.temp} °C</h2>
          <h2>Humidity: {weatherData.main.humidity}%</h2>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
