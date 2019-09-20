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
  color: chromajs.contrast(c, "white") > 3 ? "white" : "black",
  width: "calc(100vw / 4)",
  height: "8rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

function App() {
  const [steps, setSteps] = useState(28);
  const [hueStart, setHueStart] = useState(0);
  const [hueEnd, setHueEnd] = useState(360);
  const [chromaStart, setChromaStart] = useState(100);
  const [chromaEnd, setChromaEnd] = useState(100);
  const [lumaStart, setLumaStart] = useState(50);
  const [lumaEnd, setLumaEnd] = useState(50);
  const colors = generateColors(
    parseFloat(steps),
    parseFloat(hueStart),
    parseFloat(hueEnd),
    parseFloat(chromaStart),
    parseFloat(chromaEnd),
    parseFloat(lumaStart),
    parseFloat(lumaEnd)
  );
  return (
    <div className="App">
      <h1>PerceptuaLab</h1>
      <p>
        <a href="https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC">
          Perceptual
        </a>{" "}
        color-palette tool.
      </p>
      <div className="Controls">
        <div className="StepsControl Control">
          <h2>Steps: </h2>
          <p>
            <input
              type="range"
              min={4}
              max={64}
              step={4}
              value={steps}
              onChange={e => setSteps(e.target.value)}
            />
            <span>{steps}</span>
          </p>
        </div>
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
      </div>
      <div className="Colors">
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
    <div className="RangeControl Control">
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
    </div>
  );
};
