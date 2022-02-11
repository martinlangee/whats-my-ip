import React, { useState, useEffect } from "react";
import Axios from "axios";
import MyMap from "./myMap";
import "./styles/App.css";

function App() {
  const [localIP, setLocalIP] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`;
    Axios.get(url)
      .then((resp) => {
        console.log(resp);
        setLocalIP(resp.data.ip);
        setLocation(resp.data.location);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">What's My IP?</header>
      <main id="body">
        <div id="infos">
          <p>Infos about the location</p>
          <p>My current IP: {localIP}</p>
          {location
            ? Object.keys(location).map((key, idx) => (
                <p key={idx}>
                  {key}: {Object.values(location)[idx]}
                </p>
              ))
            : ""}
        </div>
        <div id="mapCol">
          <p>Map frame</p>
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
