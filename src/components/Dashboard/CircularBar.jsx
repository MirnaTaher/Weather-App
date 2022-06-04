import { useRef, useState,useEffect } from "react";
import loader from "../../sample.gif";
import "./CircularBar.css";
const CircularBar = ({ info }) => {
  const humidityRef = useRef(0);

  const [humidity, setHumidity] = useState(
    info.data.current_condition[0].humidity
  );
  useEffect(()=>{
    humidityRef.current.style.background = `conic-gradient(rgb(53, 36, 100) ${humidity * 3.6}deg, rgb(209 201 201) ${humidity * 3.6}deg)`
    setHumidity(info.data.current_condition[0].humidity)
  },[info])
  
  return (
    <div className="circular-bar">
    <h3>Humidity</h3>
      {humidity ? (
        <div ref={humidityRef} className="humidity">
          <div className="percentage">
            <span>{humidity}%</span>
          </div>
        </div>
      ) : (
        <div className="loader">
          <img src={loader} alt="weather data is loading" />
        </div>
      )}
    </div>
  );
};

export default CircularBar;
