import React, { useState } from "react";

const STEPS = 20;
const WIDTH = 400;
const HEIGHT = 50;

const RangeSlider = ({ scale, color, value, onChange }) => {
  const [clickPos, setClickPos] = useState([0.5, 0.5]);
  const handleClick = event => {
    const { clientX, clientY } = event;
    const geom = event.currentTarget.getBoundingClientRect();
    const { top, left, width, height } = geom;
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    if (onChange) {
      if (x < 0) {
        onChange(0);
      } else if (x > 1) {
        onChange(1);
      } else {
        onChange(x);
      }
    }
    setClickPos([x, y]);
  };
  const steps = Array.from({ length: STEPS }).map((s, i) => i);
  const rectWidth = WIDTH / STEPS;
  return (
    <svg
      className="RangeSlider"
      onClick={handleClick}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      style={{ enableBackground: `new 0 0 ${WIDTH} ${HEIGHT}` }}
      // preserveAspectRatio="none"
    >
      {steps.map(s => (
        <rect
          x={s * rectWidth}
          width={rectWidth}
          height={HEIGHT}
          fill={scale(s / STEPS).toString()}
        />
      ))}
      <ellipse
        fill={color.toString()}
        cx={value * (WIDTH / 100)}
        cy={HEIGHT / 2}
        rx={5}
        ry={5}
        stroke={"white"}
      />
    </svg>
  );
};

export default RangeSlider;
