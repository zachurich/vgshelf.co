import React from "react";
import "./grid.css";
import Link from "next/link";

const Grid = ({ data = [], size, handlePrompt, destRoute, handleDelete }) => {
  return (
    <div className={`grid grid-${size} container mx-auto px-6 py-10`}>
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <div key={item.id} className="grid-item rounded shadow bg-white">
              {destRoute ? (
                <Link
                  href={{
                    pathname: destRoute,
                    query: { id: item.id, title: item.title }
                  }}
                  as={`${destRoute}/${item.title}`}
                >
                  <a>
                    <span>{item.title}</span>
                  </a>
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
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
