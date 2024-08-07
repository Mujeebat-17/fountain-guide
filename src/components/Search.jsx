import { useState } from "react";
import geojson from "../markers";

const TourSearch = ({ sendDataToParent }) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fromLocationName, setFromLocationName] = useState("");
  const [toLocationName, setToLocationName] = useState("");
  const [routeProfile, setRouteProfile] = useState("walking");

  function handleClick() {
    const data = {
      fromLocation: fromLocation,
      fromLocationName: fromLocationName,
      toLocation: toLocation,
      toLocationName: toLocationName,
      routeProfile: routeProfile,
    };
    sendDataToParent(data);
  }

  // get options
  const getLocationOptions = () => {
    return geojson.features.map((feature, index) => {
      const { geometry, properties } = feature;
      return (
        <option key={index} value={geometry.coordinates} data-name={properties.title}>
          {properties.title}
        </option>
      );
    });
  };

  return (
    <>
  
      {fromLocationName} <br /> {toLocationName}
  <div className="mainprofile">
        <label htmlFor="from">From:</label>
        <select
          id="from"
          value={fromLocation}
          onChange={(e) => {
            setFromLocation(e.target.value)
            setFromLocationName(e.target.selectedOptions[0].dataset.name);
          }}
        >
          <option value="" disabled>
            Select -from location
          </option>
          <option value="currentLocation"data-name="Live Location" >
            Current Location
          </option>
          {getLocationOptions()}
        </select>

        <label htmlFor="to">To:</label>
        <select
          id="to"
          value={toLocation}
          onChange={(e) => {
            setToLocation(e.target.value)
            setToLocationName(e.target.selectedOptions[0].dataset.name);
          }}
        >
          <option value="" disabled>
            Select -to location
          </option>
          {getLocationOptions()}
        </select>

        <label htmlFor="walkingProfile"> Walking </label>
        <input
          type="radio"
          name="routeProfile"
          id="walkingProfile"
          value="walking"
          checked={routeProfile === "walking"}
          onChange={(e) => setRouteProfile(e.target.value)}
        />
        <label htmlFor="drivingProfile"> Driving </label>
        <input
          type="radio"
          name="routeProfile"
          id="drivingProfile"
          value="driving"
          checked={routeProfile === "driving"}
          onChange={(e) => setRouteProfile(e.target.value)}
        />
        <button type="submit" onClick={handleClick} className="lets-go-button">
          Let's Go
        </button>
        </div>
     
    </>
  );
};

export default TourSearch;
