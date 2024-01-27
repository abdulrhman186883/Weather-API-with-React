// App.js

import React, { useState } from "react";
import "./App.css";

const api = {
  key: "b37f40e840ed87abd8068af68436c572",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter" || evt.type === "click") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  let hour = 0;
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    hour = d.getHours();

    return `${day} ${date} ${month} ${year} ${hour} `;
  };

  const hours = (d) => {
    return d.getHours();
  };
  hour = hours(new Date());

  console.log(weather.main);
  return (
    <div>
      <main className="bg">
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button className="search-button" onClick={search}>
            Search
          </button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {" "}
                {weather.name}, {weather.sys.country}{" "}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">
                {" "}
                feels like : {weather.main.feels_like}°C
              </div>
              <div className="weather">
                {" "}
                Humidity : {weather.main.humidity} HA
              </div>
              <div className="weather">
                {" "}
                Max Temp : {weather.main.temp_max}°C{" "}
              </div>
              <div className="weather">
                {" "}
                Min Temp : {weather.main.temp_min}°C{" "}
              </div>
              <div className="weather"> Status : {weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <h1>Please Enter Your City</h1>
        )}
      </main>
    </div>
  );
}

export default App;
