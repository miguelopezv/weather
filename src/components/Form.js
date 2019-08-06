import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const Form = ({ dataQuery }) => {
  const [searchValues, setSearchValues] = useState({
    city: '',
    country: ''
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://restcountries.eu/rest/v2/all');
      setCountries(await response.json());
      M.AutoInit();
    };

    requestAPI();
  }, []);

  const handleChange = e => {
    setSearchValues({
      ...searchValues,
      [e.target.name]: e.target.value
    });
  };

  const weatherQuery = e => {
    e.preventDefault();
    dataQuery(searchValues);
  };

  return (
    <form onSubmit={weatherQuery}>
      <div className="input-field col s12">
        <input type="text" name="city" id="city" onChange={handleChange} />
        <label htmlFor="city">City: </label>
      </div>
      <div className="input-field col s12">
        <select onChange={handleChange} name="country">
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country.alpha2Code} value={country.alpha2Code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4"
        >
          Get Weather
        </button>
      </div>
    </form>
  );
};

export default Form;
