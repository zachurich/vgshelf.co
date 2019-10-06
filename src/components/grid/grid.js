import React from "react";
import "./grid.css";

const Grid = ({ data = [], size, handlePrompt, handleDelete }) => {
  return (
    <div className={`grid grid-${size} container mx-auto px-6 py-10`}>
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <div
              key={item.id}
              className="grid-item rounded shadow bg-white"
              onClick={() => handleDelete(item.id)}
            >
              <span>{item.title}</span>
            </div>
          );
        })}
      <div
        className="grid-item border border-gray-300 bg-gray-100"
        onClick={() => handlePrompt(true)}
      >
        <span className="text-3xl">+</span>
      </div>
    </div>
  );
};

export default Grid;
