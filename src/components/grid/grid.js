import "./grid.scss";
import React from "react";
import Link from "next/link";

const Grid = ({
  data = [],
  size, // ["small", "med", "large", "row"]
  handlePrompt = null,
  destRoute,
  prettyRoute,
  handleToggle = () => {},
  handleDelete,
  compareItems = []
}) => {
  let imageSize;
  if (size === "large") {
    imageSize = "720p";
  } else if (size === "med") {
    imageSize = "cover_big";
  } else {
    imageSize = "cover_big";
  }
  return (
    <ul className={`grid grid-${size}`}>
      {data.length > 0 &&
        data.map((item, index) => {
          const itemAlreadyToggled = compareItems.map(item => item.id).includes(item.id);
          return (
            <li key={item.id} className="grid-item" onClick={() => handleToggle(item.id)}>
              {destRoute ? (
                <Link
                  href={{
                    pathname: destRoute,
                    query: { id: item.id, title: item.title }
                  }}
                  as={`${prettyRoute}/${item.title}/${item.id}`}
                >
                  <a className="">
                    <span>{item.title}</span>
                  </a>
                </Link>
              ) : (
                <div className="grid-item-content">
                  <span className={`grid-item-image`}>
                    <div className="game-cover-wrap">
                      <img
                        className=""
                        src={`${item.imageUrl.replace("thumb", imageSize)}`}
                      />
                    </div>
                  </span>
                  <span className="grid-item-text">{item.title}</span>
                </div>
              )}
            </li>
          );
        })}
      {handlePrompt && (
        <div className="grid-item" onClick={() => handlePrompt(true)}>
          <span className="text-3xl">+</span>
        </div>
      )}
    </ul>
  );
};

export default Grid;
