import React from "react";

function CloseSVG({ size = 16, fill = "#ffffff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 50 50"
    >
      <rect
        width="14"
        height="50"
        x="37.728"
        y="2.373"
        fill={fill}
        rx="7"
        transform="rotate(45 37.728 2.373)"
      ></rect>
      <rect
        width="14"
        height="50"
        x="47.627"
        y="37.728"
        fill={fill}
        rx="7"
        transform="rotate(135 47.627 37.728)"
      ></rect>
    </svg>
  );
}

export default CloseSVG;
