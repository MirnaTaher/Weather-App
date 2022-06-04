import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import home from "./home.png";
import dashboard from "./dashboard.png";
import "./Header.css";
const Header = () => {
  const [countryData, setCountryData] = useState(null);
  const [day, setDay] = useState(new Date());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  useEffect(() => {
    getCountryName();
  }, []);
  setInterval(() => {
    setDay(new Date());
  }, 3600);
  async function getCountryName() {
    await fetch(`https://ipapi.co/json/`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setCountryData(json));
  }
  return (
    <>
      <ul className="header">
        <li>
        <Link to="/" className="navLink">
          <img src={home} alt="go to home page" />
          <span>Home</span>
        </Link>
        </li>
        <li className="time-container">
          {countryData ? <h4>{countryData.country_name}</h4> : <></>}
          <h4>
            {day.getDate()} {monthNames[day.getMonth()]} {day.getFullYear()}
          </h4>
          <h4>{days[day.getDay()]}</h4>
          {day.getHours() > 12 ? (
            <h4>
              {day.getHours() - 12}:
              {day.getMinutes() < 10
                ? `0${day.getMinutes()}`
                : day.getMinutes()}{" "}
              PM
            </h4>
          ) : day.getHours() != 0 ? (
            <h4>
              {day.getHours()}:
              {day.getMinutes() < 10
                ? `0${day.getMinutes()}`
                : day.getMinutes()}{" "}
              AM
            </h4>
          ) : (
            <h4>
              12:
              {day.getMinutes() < 10
                ? `0${day.getMinutes()}`
                : day.getMinutes()}{" "}
              AM
            </h4>
          )}
        </li>
        <li>
          <Link to="/dashboard" className="navLink">
            <img src={dashboard} alt="go to dashboard page" />
            <span>Dashboard</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
