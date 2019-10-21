import React from "react";

const RangeControl = ({
  title,
  min,
  max,
  start,
  setStart,
  end,
  setEnd,
  step = 1
}) => {
  return (
    <div className="RangeControl Control">
      <h2>{title}</h2>
      <p>
        <label>Start {title}: </label>
        <input
          type="range"
          step={step}
          min={min}
          max={max}
          value={start}
          onChange={e => setStart(parseInt(e.target.value))}
        />
        <span>{start}</span>
      </p>
      <p>
        <label>End {title}: </label>
        <input
          type="range"
          step={step}
          min={min}
          max={max}
          value={end}
          onChange={e => setEnd(parseInt(e.target.value))}
        />
        <span>{end}</span>
      </p>
    </div>
  );
};

export default RangeControl;
