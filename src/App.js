import logo from "./logo.svg";
import "./App.css";
import Location from "./components/Home/Location"
import Header from "./components/Common/Header";
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [info, setInfo] = useState(null);

  const api_key = "1848a51a549e42df89d10557222905";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      navigator.geolocation.watchPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
    if (latitude) {
      fetchInfo(latitude, longitude);
    }
  }, [latitude, longitude]);

  async function fetchInfo(latitude, longitude) {
    const response = await fetch(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${api_key}&q=${latitude},${longitude}&num_of_days=7&tp=3&format=json`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setInfo(json));
  }

  return (
    <>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Location latitude={latitude} longitude={longitude} info={info} />} />
          <Route path="dashboard" element={<Dashboard latitude={latitude} longitude={longitude} info={info} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
