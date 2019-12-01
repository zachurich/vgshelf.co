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
  handleDelete
}) => {
  let imageSize;
  if (size === "large") {
    imageSize = "cover_big";
  } else if (size === "med") {
    imageSize = "cover_big";
  } else {
    imageSize = "cover_big";
  }
  return (
    <ul className={`grid grid-${size}`}>
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <li key={item.id} className="grid-item" onClick={() => handleToggle(item.id)}>
              <div className="grid-item-content">
                <span className="grid-item-image-wrap">
                  <div className="grid-item-image">
                    {item.imageUrl && (
                      <img
                        className=""
                        src={`${item.imageUrl.replace("thumb", imageSize)}`}
                      />
                    )}
                  </div>
                </span>
                <span className="grid-item-text">{item.title}</span>
              </div>
            </li>
          );
        })}
      {handlePrompt && (
        <div className="grid-item item-add" onClick={() => handlePrompt(true)}>
          <span className="">+</span>
        </div>
      )}
    </ul>
  );
};

export default Grid;
