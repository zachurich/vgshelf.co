import "./grid.scss";
import React from "react";
import Link from "next/link";

const Grid = ({
  data = [],
  size, // ["small", "med", "large"]
  handlePrompt = null,
  destRoute,
  prettyRoute,
  handleToggle = () => {},
  handleDelete,
  compareItems = [],
  canAdd = false,
  gridItem = () => {}
}) => {
  if (!data && !data.length > 0) return null;
  return (
    <ul className={`grid grid-${size}`}>
      {data.map((item, index) => {
        const itemAlreadyToggled = compareItems.map(item => item.id).includes(item.id);
        return (
          <React.Fragment key={item.id}>
            {gridItem({ item, itemAlreadyToggled, handleToggle })}
          </React.Fragment>
        );
      })}
      {canAdd && handlePrompt && (
        <div className="grid-item item-add" onClick={() => handlePrompt(true)}>
          <span className="">+</span>
        </div>
      )}
    </ul>
  );
};

export default Grid;
