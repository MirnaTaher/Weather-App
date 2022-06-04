import "./Location.css";
import loader from "../../sample.gif";
import { Link } from "react-router-dom";
import { useState } from "react";
const Location = ({ latitude, longitude, info }) => {
  const [unit, setUnit] = useState("c");
  const handleChange = (event) => {
    setUnit(event.target.value);
  };
  return (
    <div className="location">
      <label htmlFor="degree">Please select unit of temperature </label>
      <input
        type="radio"
        value="c"
        name="degree"
        checked={unit === "c"}
        onChange={handleChange}
      />
      °C
      <input
        type="radio"
        value="f"
        name="degree"
        checked={unit === "f"}
        onChange={handleChange}
      />
      °F
      {latitude != null ? (
        <>
          {info ? (
            <>
              <div className="weather-today">
                {unit == "c" ? (
                  <p>{info.data.current_condition[0].temp_C}°C</p>
                ) : (
                  <p>{info.data.current_condition[0].temp_F}°F</p>
                )}
                <p>{info.data.current_condition[0].weatherDesc[0].value}</p>
                <img
                  className="weatherIcon"
                  src={`${info.data.current_condition[0].weatherIconUrl[0].value}`.replace(
                    "http",
                    "https"
                  )}
                  alt={`weather conditon is ${info.data.current_condition[0].weatherDesc[0].value}`}
                />
              </div>


              <div className="weather-container">
                {info.data.weather.map((day, index) => {
                  
                  return (
                    <div className="weather-card" key={index}>
                      {index == 0 ? (
                        <p className="date">Today</p>
                      ) : (
                        <>
                          {index == 1 ? (
                            <p className="date">Tomorrow</p>
                          ) : (
                            <p className="date">
                              {day.date.split("-").reverse().join("-")}
                            </p>
                          )}
                        </>
                      )}

                      {unit == "c" ? (
                        <>
                          <p className="temp">
                            {day.maxtempC} / {day.mintempC}°C
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="temp">
                            {day.maxtempF} / {day.mintempF} °F
                          </p>
                        </>
                      )}
                      <p className="desc">
                        {day.hourly[4].weatherDesc[0].value}
                      </p>
                      <div className="icon">
                        <img
                          className="weatherIcon"
                          src={`${day.hourly[4].weatherIconUrl[0].value}`.replace(
                            "http",
                            "https"
                          )}
                          alt={`weather conditon is ${day.hourly[4].weatherDesc[0].value}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="loader">
              <img src={loader} alt="weather data is loading" />
            </div>
          )}
          <Link className="dashboard-link" to="/dashboard">Go to dashboard</Link>
        </>
      ) : (
        <>
          <p>please grant permission to access location</p>
        </>
      )}
    </div>
  );
};

export default Location;
