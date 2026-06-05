import React from "react";

export const PriceRangeSlider = ({ min = 0, max = 3500, value, onChange }) => {
  const [minVal, maxVal] = value || [min, max];

  const handleMinChange = (e) => {
    const nextMin = Math.min(Number(e.target.value), maxVal - 50);
    onChange([nextMin, maxVal]);
  };

  const handleMaxChange = (e) => {
    const nextMax = Math.max(Number(e.target.value), minVal + 50);
    onChange([minVal, nextMax]);
  };

  const minPct = ((minVal - min) / (max - min)) * 100;
  const maxPct = ((maxVal - min) / (max - min)) * 100;

  return (
    <div>
      {/* Price labels */}
      <div className="d-flex justify-content-between mb-2">
        <span className="font-sm color-brand-3 font-medium">${minVal}</span>
        <span className="font-sm color-brand-3 font-medium">${maxVal}</span>
      </div>

      {/* Slider track container */}
      <div style={{ position: "relative", height: "6px", margin: "10px 0" }}>
        {/* Background track */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#e0e0e0",
            borderRadius: "3px"
          }}
        />
        {/* Active/highlighted track */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${minPct}%`,
            right: `${100 - maxPct}%`,
            height: "6px",
            background: "#3BB77E",
            borderRadius: "3px"
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={minVal}
          onChange={handleMinChange}
          style={{
            position: "absolute",
            width: "100%",
            top: "-5px",
            height: "16px",
            opacity: 0,
            cursor: "pointer",
            zIndex: minVal > max - 50 ? 5 : 3,
            pointerEvents: "auto"
          }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={maxVal}
          onChange={handleMaxChange}
          style={{
            position: "absolute",
            width: "100%",
            top: "-5px",
            height: "16px",
            opacity: 0,
            cursor: "pointer",
            zIndex: 4,
            pointerEvents: "auto"
          }}
        />

        {/* Min thumb visible dot */}
        <div
          style={{
            position: "absolute",
            top: "-5px",
            left: `calc(${minPct}% - 8px)`,
            width: "16px",
            height: "16px",
            background: "#fff",
            border: "2px solid #3BB77E",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 2
          }}
        />

        {/* Max thumb visible dot */}
        <div
          style={{
            position: "absolute",
            top: "-5px",
            left: `calc(${maxPct}% - 8px)`,
            width: "16px",
            height: "16px",
            background: "#fff",
            border: "2px solid #3BB77E",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 2
          }}
        />
      </div>

      {/* Range text */}
      <div className="mt-2">
        <span className="font-xs color-gray-500">
          Range: <strong>${minVal}</strong> — <strong>${maxVal}</strong>
        </span>
      </div>
    </div>
  );
};
export default PriceRangeSlider;
