import React, { Fragment, useState } from "react";
import chromajs from "chroma-js";

import "./App.css";

function generateColors(
  length,
  hueStart,
  hueEnd,
  chromaStart,
  chromaEnd,
  lumaStart,
  lumaEnd
) {
  const remain = hueEnd - hueStart;
  const angle = remain / length;
  const chromaStep = (chromaEnd - chromaStart) / length;
  const lumaStep = (lumaEnd - lumaStart) / length;
  return Array.from({ length }, (_, i) => {
    const hue = hueStart + i * angle;
    const chroma = chromaStart + i * chromaStep;
    const luma = lumaStart + i * lumaStep;
    return chromajs.hcl(hue, chroma, luma);
  });
}

const colorStyle = c => ({
  backgroundColor: c,
  color: "white",
  width: "calc(100vw / 4)",
  height: "8rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

function App() {
  const [steps, setSteps] = useState(64);
  const [hueStart, setHueStart] = useState(0);
  const [hueEnd, setHueEnd] = useState(360);
  const [chromaStart, setChromaStart] = useState(100);
  const [chromaEnd, setChromaEnd] = useState(100);
  const [lumaStart, setLumaStart] = useState(50);
  const [lumaEnd, setLumaEnd] = useState(50);
  const colors = generateColors(
    parseInt(steps),
    parseInt(hueStart),
    parseInt(hueEnd),
    parseInt(chromaStart),
    parseInt(chromaEnd),
    parseInt(lumaStart),
    parseInt(lumaEnd)
  );
  return (
    <div className="App">
      <h2>Steps: </h2>
      <p>
        <input
          type="range"
          min={2}
          max={128}
          value={steps}
          onChange={e => setSteps(e.target.value)}
        />
        <span>{steps}</span>
      </p>
      <RangeControl
        title={"Hue"}
        min={0}
        max={360}
        start={hueStart}
        end={hueEnd}
        setStart={setHueStart}
        setEnd={setHueEnd}
      />
      <RangeControl
        title={"Chroma"}
        min={0}
        max={100}
        start={chromaStart}
        end={chromaEnd}
        setStart={setChromaStart}
        setEnd={setChromaEnd}
      />
      <RangeControl
        title={"Luminance"}
        min={0}
        max={100}
        start={lumaStart}
        end={lumaEnd}
        setStart={setLumaStart}
        setEnd={setLumaEnd}
      />
      <div className="App-header">
        {colors.map(c => (
          <div style={colorStyle(c)}>{c.hex()}</div>
        ))}
      </div>
    </div>
  );
}

export default App;

const RangeControl = ({ title, min, max, start, setStart, end, setEnd }) => {
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>
        <label>Start {title}: </label>
        <input
          type="range"
          min={min}
          max={max}
          value={start}
          onChange={e => setStart(e.target.value)}
        />
        <span>{start}</span>
      </p>
      <p>
        <label>End {title}: </label>
        <input
          type="range"
          min={min}
          max={max}
          value={end}
          onChange={e => setEnd(e.target.value)}
        />
        <span>{end}</span>
      </p>
    </Fragment>
  );
};
