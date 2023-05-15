import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// Async functions in React are a way to handle asynchronous operations such as fetching data from an API, updating state, and rendering the component with the updated data.

// An async function returns a Promise object, which resolves with the return value of the function when it completes. This allows us to use the await keyword to wait for the Promise to resolve before continuing with the execution of the code.

// In React, we can use async functions in conjunction with the useState and useEffect hooks to update the state of a component with data fetched from an API. Here is an example:

// jsx
// Copy code
// import React, { useState, useEffect } from 'react';

// function MyComponent() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('https://api.example.com/data');
//       const json = await response.json();
//       setData(json);
//     }

//     fetchData();
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{data.title}</h1>
//       <p>{data.body}</p>
//     </div>
//   );
// }
// In this example, we define a state variable data using the useState hook and initialize it to null. We also use the useEffect hook to fetch data from an API when the component mounts.

// Inside the useEffect hook, we define an async function fetchData that fetches data from the API and updates the data state using the setData function. We then call fetchData inside the useEffect hook.

// Finally, we render the component with the data state, but we first check if data is null to display a loading message until the data is fetched.

// Overall, using async functions in React allows us to write more concise and readable code that handles asynchronous operations more elegantly.
