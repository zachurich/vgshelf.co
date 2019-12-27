import react from "react";

function ArrowSVG({ width = "16", height = "16", fill = "none", stroke = "" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 55 86"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43 12L12 43L43 74"
        stroke={stroke}
        stroke-width="24"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ArrowSVG;
