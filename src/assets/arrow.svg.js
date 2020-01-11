import react from "react";

function ArrowSVG({
  width = "16",
  height = width,
  fill = "none",
  stroke = "#282822",
  rotate = "0deg"
}) {
  return (
    <svg
      style={{
        transform: `rotate(${rotate})`
      }}
      width={width}
      height={height}
      viewBox="0 0 55 86"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43 12L12 43L43 74"
        stroke={stroke}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowSVG;
