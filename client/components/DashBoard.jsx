import React, { useState } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import LinePlot from './LinePlot.jsx';

const DashBoard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //setInteral takes:
    //1. Callback to execute
    //2. interval to wait between executions in ms
    const interval = setInterval(
      () => {
        //call to backend
        fetch('/api')
          //grab data from response
          .then((res) => {
            res.json();
            //add'l parsing??
          })
          .then((newPoint) => {
            //add new datapoint to state
            setData((prevData) => [...prevData, newPoint]);
          });
      },
      1000, //frequency in milliseconds
    );
    // a setInterval object will run until you actually tell it to stop.
    //in this case, we want it to stop if / when we unmount the component
    //consider how we can set it differently if needed --but likely only while the graphs are rendering do we need to do this?
  });

  // const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  // function onMouseMove(event) {
  //   const [x, y] = d3.pointer(event);
  //   setData(data.slice(-200).concat(Math.atan2(x, y)));
  // }
  return (
    <div>
      <header>
        <div>
          <h1>Cache App</h1>
        </div>
        <div className="header-left">
          <button>about</button>
          <button>contact</button>
          <a href="/login">
            <button>logout</button>
          </a>
        </div>
      </header>
      <div className="widget-container">
        <div className="widget" onMouseMove={onMouseMove}>
          <LinePlot data={data}></LinePlot>
        </div>
        <div className="widget" onMouseMove={onMouseMove}>
          <LinePlot data={data}></LinePlot>
        </div>
        <div className="widget" onMouseMove={onMouseMove}>
          <LinePlot data={data}></LinePlot>
        </div>
        <div className="widget" onMouseMove={onMouseMove}>
          <LinePlot data={data}></LinePlot>
        </div>
      </div>
      <button id="add-widget-button">+</button>
    </div>
  );
};

export default DashBoard;
