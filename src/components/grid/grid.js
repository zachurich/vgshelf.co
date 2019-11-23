import "./grid.css";
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
    <ul className={`grid grid-${size} flex flex-wrap container mx-auto px-6 py-10`}>
      {data.length > 0 &&
        data.map((item, index) => {
          const itemAlreadyToggled = compareItems.map(item => item.id).includes(item.id);
          return (
            <li
              key={item.id}
              className="grid-item flex justify-center"
              onClick={() => handleToggle(item.id)}
            >
              {destRoute ? (
                <Link
                  href={{
                    pathname: destRoute,
                    query: { id: item.id, title: item.title }
                  }}
                  as={`${prettyRoute}/${item.title}/${item.id}`}
                >
                  <a className="bg-gray-200 hover:bg-gray-300">
                    <span>{item.title}</span>
                  </a>
                </Link>
              ) : (
                <div className="grid-item-content flex justify-center  flex-wrap rounded-lg">
                  <span
                    className={`inline-block grid-item-image border-white border-8 hover:border-blue-500 rounded-lg shadow-md ${
                      itemAlreadyToggled ? "border-blue-500" : "border-white"
                    }`}
                  >
                    <img
                      // className="h-full w-auto"
                      src={`${item.imageUrl.replace("thumb", imageSize)}`}
                    />
                  </span>
                  <span className="grid-item-text mt-2">{item.title}</span>
                </div>
              )}
            </li>
          );
        })}
      {handlePrompt && (
        <div
          className="grid-item grid-item-last border-4 border-dashed border-gray-300 hover:bg-gray-300"
          onClick={() => handlePrompt(true)}
        >
          <span className="text-3xl">+</span>
        </div>
      )}
    </ul>
  );
};

export default Grid;
