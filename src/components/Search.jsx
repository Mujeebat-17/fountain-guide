import React, { useState } from 'react';
import geojson from '../markers';

const TourSearch = ({ sendDataToParent, map }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  function handleClick() {
    const data = {
      "fromLocation": fromLocation, "toLocation": toLocation
    }
    sendDataToParent(data);
  }

  const getLocationOptions = () => {
    return geojson.features.map((feature, index) => {
      const { geometry, properties } = feature;
      return (
        <option key={index} value={geometry.coordinates}>
          {properties.title}
        </option>
      );
    });
  };

  
  return (
    <div>
      <label htmlFor="from">From:</label>
      <select
        id="from"
        value={fromLocation}
        onChange={(e) => setFromLocation(e.target.value)}
      >
        <option value="" disabled>Select -from location</option>
        {getLocationOptions()}
      </select>

      <label htmlFor="to">To:</label>
      <select
        id="to"
        value={toLocation}
        onChange={(e) => setToLocation(e.target.value)}
      >
        <option value="" disabled>Select -to location</option>
        {getLocationOptions()}
      </select>

      <button type='submit' onClick={handleClick}>  Let's Go</button>
    </div>
  );
};

export default TourSearch;
