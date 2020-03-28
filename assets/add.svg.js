import React from "react";

function AddSVG({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 50 50"
    >
      <rect width="14" height="50" x="18" fill="#ffffff" rx="7"></rect>
      <rect
        width="14"
        height="50"
        x="50"
        y="18"
        fill="#ffffff"
        rx="7"
        transform="rotate(90 50 18)"
      ></rect>
    </svg>
  );
}

export default AddSVG;
