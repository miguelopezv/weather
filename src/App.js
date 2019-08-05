import React, { useState, useEffect } from 'react';
import { Header, Form, Error, Weather } from './components';

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (!city || !country) return;

    const requestAPI = async () => {
      const appId = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

      const request = await fetch(url);
      setWeather(await request.json());
    };

    requestAPI();
  }, [city, country]);

  const dataQuery = data => {
    const { city, country } = data;

    if (!city || !country) {
      setError(true);
      return;
    }

    setCity(city);
    setCountry(country);
    setError(false);
  };

  let component;
  if (error) {
    component = <Error message="both fields are required" />;
  } else if (weather.cod === '404') {
    component = <Error message="City doesn't exist. Try again." />;
  } else {
    component = <Weather weather={weather} />;
  }

  return (
    <div className="App">
      <Header title="Weather App" />

      <div className="container-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Form dataQuery={dataQuery} />
            </div>
            <div className="col s12 m6">{component}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
