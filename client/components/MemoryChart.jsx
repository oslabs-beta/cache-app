import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';

const GaugeChart = ({
  width = 550,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}) => {
  const [data, setData] = useState({ usedMemory: 0, peakUsedMemory: 0 });

  //get evicted/expired keys
  const fetchData = async () => {
    try {
      const res = await fetch('/api/memory');
      const newData = await res.json();
      return newData;
    } catch (error) {
      console.log(error);
    }
  };

  //everytime data is updated, set timeout is called again
  useEffect(() => {
    setTimeout(() => {
      fetchData().then((data) => {
        setData(() => data);
      });
    }, 1000);
  }, [data]);

  let percentageUsed = (data.usedMemory / 30) * 100;
  let percentagePeakUsed = (data.peakUsedMemory / 30) * 100;
  //   const gx = useRef();
  //   const gy = useRef();

  //create scales for x and y axes
  // Domain --> abstract index values of the data
  // Range --> visible pixel range that those indices will map to
  //   const x = d3
  //     .scaleUtc()
  //     .domain([Date.now() - 60 * 1000 * dataTimeRange, Date.now()])
  //     .range([marginLeft, width - marginRight]);
  //   const y = d3
  //     .scaleLinear()
  //     .domain([0, d3.max(formattedData, (d) => d.totalKeys)])
  //     .range([height - marginBottom, marginTop]);

  //   const line = d3
  //     .line()
  //     .x((d) => x(d.timestamp))
  //     .y((d) => y(d.expired));

  //   useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  //   useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  if (data) {
    return (
      <svg width={width} height={height}>
        <circle cx={100} cy={100} r={50} fill="none" stroke="#e0e0e0" strokeWidth={10} />
        <circle
          cx={100}
          cy={100}
          r={50}
          fill="none"
          stroke="#3498db"
          strokeWidth={10}
          strokeDasharray={100 * Math.PI}
          strokeDashoffset={100 * Math.PI * (1 - percentageUsed / 100)}
          strokeLinecap="round"
        />
        <circle cx={400} cy={100} r={50} fill="none" stroke="#e0e0e0" strokeWidth={10} />
        <circle
          cx={400}
          cy={100}
          r={50}
          fill="none"
          stroke="#3498db"
          strokeWidth={10}
          strokeDasharray={100 * Math.PI}
          strokeDashoffset={100 * Math.PI * (1 - percentagePeakUsed / 100)}
          strokeLinecap="round"
        />
        <text x={100} y={100} textAnchor="middle" dy="0.3em" fontSize="16" fill="#3498db">
          {`${percentageUsed.toFixed(2)}%`}
        </text>
        <text x={400} y={100} textAnchor="middle" dy="0.3em" fontSize="16" fill="#e74c3c">
          {`${percentagePeakUsed.toFixed(2)}% \n(Peak)`}
        </text>
        {/* <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} /> */}
        {/* <path fill="none" stroke="blue" strokeWidth="1.5" d={line(formattedData)} />
        <g fill="none" stroke="blue" strokeWidth="1.5">
          {formattedData.map((d, i) => (
            <circle key={i} cx={x(d.timestamp)} cy={y(d.expired)} r=".75" />
          ))}
        </g>
        <path fill="none" stroke="red" strokeWidth="1.5" d={line(formattedData)} />
        <g fill="none" stroke="red" strokeWidth="1.5">
          {formattedData.map((d, i) => (
            <circle key={i} cx={x(d.timestamp)} cy={y(d.evicted)} r=".75" />
          ))}
        </g> */}
      </svg>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default GaugeChart;
