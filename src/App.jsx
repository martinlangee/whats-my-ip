import React, { useState, useEffect } from "react";
import Axios from "axios";
import MyMap from "./myMap";
import "./styles/App.css";

function App() {
  const [localIP, setLocalIP] = useState("");
  const [location, setLocation] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [countryFlag, setCountryFlag] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const countryKey = await getGeoData();
    getCountryData(countryKey);
  };

  const getGeoData = () => {
    return new Promise((resolve) => {
      Axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`
      )
        .then((resp) => {
          console.log(resp);
          setLocalIP(resp.data.ip);
          setLocation(resp.data.location);
          resolve(resp.data.location.country);
        })
        .catch((e) => console.log(e));
    });
  };

  const getCountryData = (countryKey) => {
    console.log({ countryKey });

    Axios.get(`https://restcountries.com/v3.1/alpha/${countryKey}`)
      .then((resp) => {
        console.log(resp);
        setCountryName(resp.data[0].name.common);
        setCountryFlag(resp.data[0].flags.png);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="App-header">What's My IP?</header>
      <main id="body">
        <div id="infos">
          <p>
            <b>Infos about the location</b>
          </p>
          <p>My current IP: {localIP}</p>
          <p>Country name: {countryName}</p>
          <br></br>
          <p>
            <b>Generic information</b>
          </p>
          {location
            ? Object.keys(location).map((key, idx) => (
                <p key={idx}>
                  {key}: {Object.values(location)[idx]}
                </p>
              ))
            : ""}
          <div id="flag">
            <img src={countryFlag} alt="Flag" />
          </div>
        </div>
        <div id="mapCol">
          <p>
            <b>Map </b>
          </p>
          {location ? (
            <MyMap id="map" lng={location.lng} lat={location.lat} />
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
