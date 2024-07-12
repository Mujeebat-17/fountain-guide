import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import TourSearch from "../components/Search";
import geojson from "../markers";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { GeoPoint, Timestamp } from "firebase/firestore";
import getLocation from "../geoLocation";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWJyb296OTQiLCJhIjoiY2x0d3RmNTJhMDJzNTJsbHNiN2IzOHF0dSJ9.CI9Yh7Hgyz20mgorFtU36g";

import { collection, addDoc } from "firebase/firestore";
// Add a new document with a generated id.

function Location() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(4.547032);
  const [lat, setLat] = useState(7.742966);
  const [zoom, setZoom] = useState(15);
  const [activeRoute, setActiveRoute ] = useState(false)

  async function getRoute(param) {
    // make a directions request using walking profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const start = param.fromLocation === "currentLocation"
    ? await getLocation()
    : param.fromLocation.split(",");
    const end = param.toLocation.split(",");
    console.log("end", end)
    let routeProfile = param.routeProfile;

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const directions_geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    // send data to firestore
    const newLocationData = {
      user_id: auth.currentUser.uid,
      to_location: {
        coordinates: new GeoPoint(start[0], start[1]),
        name: param.toLocationName,
      },
      from_location: {
        coordinates: new GeoPoint(end[0], end[1]),
        name: param.fromLocationName,
      },
      createdAt: Timestamp.now(), // Timestamp of location recording
      total_time_spent: 0, // Optional, can be updated later
      status: "completed", // Or "cancelled"
    };
    setActiveRoute(true);

    try {
      const docRef = await addDoc(collection(db, "location"), newLocationData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(directions_geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: directions_geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "red",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    // get the sidebar and add the instructions
    const instructions = document.getElementById("instructions");
    instructions.style.display = "block";
    const steps = data.legs[0].steps;

    let tripInstructions = "";
    for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
      data.duration / 60
    )} min 🚶‍♂️ </strong></p><ol>${tripInstructions}</ol>`;
  }

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // Add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );


    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add it to the map

      const marker = new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3>
            <p>${feature.properties.description}</p>`
              // <button onClick=${navigateHere(feature.geometry.coordinates)} > Navigate Here </button>
            )
        )
        .addTo(map.current);
    }

  }, []);

  return (
    <>
      <Navbar />
      <div className="search">
        <TourSearch sendDataToParent={getRoute} />
        <div ref={mapContainer} className="map-container" />
      </div>
      <div id="instructions"></div>
    </>
  );
}

export default Location;
