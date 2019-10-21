import React, { useState } from "react";
import chromajs from "chroma-js";

const ROTATION = 15;

const shapes = [
  "M42.95405,23.70423A27.24507,27.24507,0,0,1,50,22.77827L49.99988,0A50.05774,50.05774,0,0,0,37.05669,1.69526Z",
  "M36.3908,26.42818a27.04734,27.04734,0,0,1,6.56325-2.724l-5.89736-22.009a49.69545,49.69545,0,0,0-12.0602,4.99757Z",
  "M14.64461,14.64477,30.75136,30.75132a27.324,27.324,0,0,1,5.63944-4.32314L24.99645,6.69283A50.197,50.197,0,0,0,14.64461,14.64477Z",
  "M26.42818,36.39076a27.32616,27.32616,0,0,1,4.32314-5.63944L14.64461,14.64477A50.19337,50.19337,0,0,0,6.69275,24.99665Z",
  "M23.70423,42.95409a27.0438,27.0438,0,0,1,2.724-6.56329L6.69271,24.99668A49.695,49.695,0,0,0,1.69518,37.05692Z",
  "M22.77827,50a27.2453,27.2453,0,0,1,.926-7.04591l-22.009-5.89717A50.06079,50.06079,0,0,0,0,50v.0002L22.77827,50Z",
  "M23.70423,57.046a27.24538,27.24538,0,0,1-.926-7.046L0,50.0002A50.057,50.057,0,0,0,1.69529,62.94343Z",
  "M23.70438,57.04611a27.04378,27.04378,0,0,0,2.72388,6.56328L6.69275,75.00347A49.69837,49.69837,0,0,1,1.69529,62.94319Z",
  "M26.42826,63.60943a27.32327,27.32327,0,0,0,4.32314,5.63949L14.64453,85.35547a50.19342,50.19342,0,0,1-7.95178-10.352Z",
  "M36.39092,73.5719a27.32433,27.32433,0,0,1-5.63949-4.32314L14.64488,85.35555a50.19525,50.19525,0,0,0,10.352,7.95186Z",
  "M42.95424,76.29581a27.04655,27.04655,0,0,1-6.56332-2.72391L24.99684,93.30741a49.69585,49.69585,0,0,0,12.06032,4.99745Z",
  "M50.00043,100l-.00019-22.77827H50a27.24569,27.24569,0,0,1-7.04576-.92592L37.05716,98.30486A50.05728,50.05728,0,0,0,50,100Z",
  "M57.04619,76.2957a27.24416,27.24416,0,0,1-7.04592.926L50.00043,100A50.06071,50.06071,0,0,0,62.9437,98.30467Z",
  "M63.60939,73.5717a27.04352,27.04352,0,0,1-6.5632,2.724l5.89751,22.009A49.69665,49.69665,0,0,0,75.00386,93.307Z",
  "M85.35571,85.355,69.24884,69.24845a27.323,27.323,0,0,1-5.63937,4.32325L75.00386,93.307A50.198,50.198,0,0,0,85.35571,85.355Z",
  "M73.572,63.609a27.32287,27.32287,0,0,1-4.32313,5.63949L85.35571,85.355a50.19377,50.19377,0,0,0,7.95178-10.352Z",
  "M76.29585,57.04564A27.04338,27.04338,0,0,1,73.572,63.60892L93.30749,75.003a49.69874,49.69874,0,0,0,4.99745-12.06028Z",
  "M77.22173,50a27.24649,27.24649,0,0,1-.92588,7.04564l22.00909,5.897A50.05918,50.05918,0,0,0,100,50v-.0002l-22.77827.00008Z",
  "M98.30478,37.05661,76.29577,42.954a27.24392,27.24392,0,0,1,.926,7.04576L100,49.99949A50.06077,50.06077,0,0,0,98.30478,37.05661Z",
  "M73.57182,36.39072a27.04734,27.04734,0,0,1,2.724,6.56325l22.009-5.89736a49.69685,49.69685,0,0,0-4.99761-12.06016Z",
  "M73.57182,36.39069,93.30717,24.99645a50.19235,50.19235,0,0,0-7.95194-10.35188L69.2486,30.75128A27.325,27.325,0,0,1,73.57182,36.39069Z",
  "M63.60916,26.42814a27.32269,27.32269,0,0,1,5.63944,4.32314L85.35523,14.64453A50.19415,50.19415,0,0,0,75.00332,6.69267Z",
  "M57.04588,23.70423a27.04406,27.04406,0,0,1,6.56328,2.72391L75.00332,6.69267A49.6972,49.6972,0,0,0,62.94316,1.69518Z",
  "M49.99988,0,50,22.77827h0a27.24436,27.24436,0,0,1,7.04584.926l5.8972-22.009A50.05807,50.05807,0,0,0,50,0Z"
].reverse();

const WheelSlider = ({ color, hue, chroma, luma, onChange }) => {
  const [clickPos, setClickPos] = useState([0.5, 0.5]);
  const handleClick = event => {
    const { clientX, clientY } = event;
    const geom = event.target.getBoundingClientRect();
    const { top, left, width, height } = geom;
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    const { distance, radians } = cartesianToPolar(x - 0.5, y - 0.5);
    console.log(clientX, x, y, radians);
    debugger;
    if (onChange) {
      onChange((radians / Math.PI) * 180);
    }
    setClickPos([x, y]);
  };
  const { x, y } = polarToCartesian(38, ((hue - 90) / 360) * Math.PI * 2);
  return (
    <svg className="WheelSlider" onClick={handleClick} viewBox="0 0 100 100">
      {shapes.map((shape, index) => (
        <DonutSlice
          hue={index * ROTATION}
          chroma={chroma}
          luma={luma}
          d={shape}
        />
      ))}
      <circle
        fill={color.toString()}
        cx={x + 50}
        cy={y + 50}
        r={5}
        stroke={"white"}
      />
    </svg>
  );
};

const DonutSlice = ({ hue, chroma, luma, ...props }) => {
  const fill = chromajs.hcl(hue, chroma, luma);
  return <path fill={fill} {...props} />;
};

function polarToCartesian(r, theta) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta)
  };
}

function cartesianToPolar(x, y) {
  const distance = Math.sqrt(x * x + y * y);
  const radians = Math.atan2(y, x); //This takes y first
  return { distance, radians };
}

export default WheelSlider;
