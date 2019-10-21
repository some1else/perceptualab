import React, { Fragment, useState } from "react";
import chromajs from "chroma-js";

import RangeControl from "./components/RangeControl";
import RangeSlider from "./components/RangeSlider";
import WheelSlider from "./components/WheelSlider";

import "./App.css";

// function generateColors(
//   length,
//   hueStart,
//   hueEnd,
//   chromaStart,
//   chromaEnd,
//   lumaStart,
//   lumaEnd
// ) {
//   const remain = hueEnd - hueStart;
//   const angle = remain / length;
//   const chromaStep = (chromaEnd - chromaStart) / length;
//   const lumaStep = (lumaEnd - lumaStart) / length;
//   return Array.from({ length }, (_, i) => {
//     const hue = hueStart + i * angle;
//     const chroma = chromaStart + i * chromaStep;
//     const luma = lumaStart + i * lumaStep;
//     return chromajs.hcl(hue, chroma, luma);
//   });
// }

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

  const startColor = chromajs.hcl(hueStart, chromaStart, lumaStart);
  const endColor = chromajs.hcl(hueEnd, chromaEnd, lumaEnd);

  const scale = chromajs
    .scale([startColor, endColor])
    .mode("lab")
    .correctLightness();

  // const colors = generateColors(
  //   parseFloat(steps),
  //   parseFloat(hueStart),
  //   parseFloat(hueEnd),
  //   parseFloat(chromaStart),
  //   parseFloat(chromaEnd),
  //   parseFloat(lumaStart),
  //   parseFloat(lumaEnd)
  // );

  return (
    <div className="App">
      <h1>PerceptuaLab</h1>
      <p>
        <a href="https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC">
          Perceptual
        </a>{" "}
        color-palette tool.
      </p>
      <ColorControl
        color={startColor}
        chroma={chromaStart}
        luma={lumaStart}
        hue={hueStart}
        onHueChange={val => setHueStart(val)}
        onChromaChange={val => setChromaStart(val)}
        onLumaChange={val => setLumaStart(val)}
      />
      <ColorControl
        color={endColor}
        chroma={chromaEnd}
        luma={lumaEnd}
        hue={hueEnd}
        onHueChange={val => setHueEnd(val)}
        onChromaChange={val => setChromaEnd(val)}
        onLumaChange={val => setLumaEnd(val)}
      />
      <ColorMap steps={steps} scale={scale} />
      <div className="Controls Old">
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
          step={1}
          start={lumaStart}
          end={lumaEnd}
          setStart={setLumaStart}
          setEnd={setLumaEnd}
        />
      </div>
    </div>
  );
}

export default App;

const ColorControl = ({
  hue,
  chroma,
  luma,
  onHueChange,
  onChromaChange,
  onLumaChange
}) => {
  const color = chromajs.hcl(hue, chroma, luma);
  const chromaStart = chromajs.hcl(hue, 0, luma);
  const chromaEnd = chromajs.hcl(hue, 100, luma);
  const chromaScale = chromajs.scale([chromaStart, chromaEnd]).mode("lab");
  const lumaStart = chromajs.hcl(hue, chroma, 0);
  const lumaEnd = chromajs.hcl(hue, chroma, 100);
  const lumaScale = chromajs.scale([lumaStart, lumaEnd]).mode("lab");
  return (
    <div className="ColorControl">
      <WheelSlider
        color={color}
        hue={hue}
        chroma={chroma}
        luma={luma}
        onChange={t => onHueChange(t)}
      />
      <div className="RangeControls">
        <RangeSlider
          color={color}
          value={chroma}
          scale={chromaScale}
          onChange={x => onChromaChange(x * 100)}
        />
        <RangeSlider
          color={color}
          value={luma}
          scale={lumaScale}
          onChange={x => onLumaChange(x * 100)}
        />
      </div>
    </div>
  );
};

const ColorMap = ({ steps, scale }) => {
  const stepSize = 1 / steps;
  const colors = Array.from({ length: steps }, (v, i) => scale(i * stepSize));

  return (
    <div className="Colors">
      {colors.map(c => (
        <div style={colorStyle(c)}>{c.hex()}</div>
      ))}
    </div>
  );
};
