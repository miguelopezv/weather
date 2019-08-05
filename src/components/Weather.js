import React from 'react';

const Weather = ({ weather }) => {
  const { name, main: data } = weather;
  if (!name) return null;

  const kelvin = 273.15;

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>{name} weather is: </h2>
        <p className="temp">
          {parseInt(data.temp - kelvin, 10)} <span>&#x2103;</span>
        </p>
        <p>Min: {parseInt(data.temp_min - kelvin, 10)} &#x2103;</p>
        <p>Max: {parseInt(data.temp_max - kelvin, 10)} &#x2103;</p>
      </div>
    </div>
  );
};

export default Weather;
