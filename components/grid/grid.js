import React from "react";
import { lastItem } from "../../common/utils";

import "./grid.css";
import Modal from "../modal/modal";

const Grid = ({ data, size, handlePrompt }) => {
  return (
    <div className={`grid grid-${size} container mx-auto px-6 py-10`}>
      {data.map((item, index) => {
        return (
          <div
            key={item.name + index}
            className="grid-item bg-gray-200"
            onClick={() => {}}
          >
            <span>{item.name}</span>
          </div>
        );
      })}
      <div
        className="grid-item border border-gray-300 bg-white"
        onClick={() => handlePrompt(true)}
      >
        <span className="text-3xl">+</span>
      </div>
    </div>
  );
};

export default Grid;
