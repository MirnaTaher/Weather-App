import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import loader from "../../sample.gif";

const Linechart = ({ info}) => {
  const [weatherC, setWeatherC] = useState(null);
  const [weatherF, setWeatherF] = useState(null);
  const [time, setTime] = useState(null);
  const svgRef = useRef();
  useEffect(() => {
    if (info) {
      setWeatherC(info.data.weather[0].hourly.map((elem) => elem.tempC));
      setWeatherF(info.data.weather[0].hourly.map((elem) => elem.tempF));
      setTime(info.data.weather[0].hourly.map((elem) => elem.time));
    }
  }, [info]);

  useEffect(() => {
    if (info && weatherC) {
      /* d3 steps */
      // svg
      const width = 400;
      const height = 150;
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .style("background", "rgb(208 238 241)")
        .style("overflow", "visible");
      // scaling
      const xScale = d3
        .scaleLinear()
        .domain([0, weatherC.length - 1])
        .range([0, width]);
      const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);
      const generateScaledLine = d3
        .line()
        .x((d, i) => xScale(i))
        .y(yScale)
        .curve(d3.curveCardinal);
      // axes
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(time.length)
        .tickFormat((i) => time[i]);
      const yAxis = d3.axisLeft(yScale).ticks(4)
      svg.append("g").call(xAxis).attr("transform", `translate(0,${height})`);
      svg.append("g").call(yAxis);
      // data for svg
      svg
        .selectAll(".line")
        .data([weatherC])
        .join("path")
        .attr("d", (d) => generateScaledLine(d))
        .attr("fill", "none")
        .attr("stroke", "rgb(53, 36, 100)");
      
    }
  }, [weatherC, weatherF]);
  return (
    <div>
      
      {weatherC ? (
        <svg ref={svgRef} className="svg"></svg>
      ) : (
        <div className="loader">
          <img src={loader} alt="weather data is loading" />
        </div>
      )}
    </div>
  );
};

export default Linechart;
