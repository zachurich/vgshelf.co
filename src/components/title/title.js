import React from "react";

import "./title.css";

const Title = ({ header }) => {
  return (
    <div className="container text-center mx-auto px-6 py-10">
      <h1 className="inline-block px-4 text-xl font text-purple-600 border-b-4 border-purple-600">
        {header.toLowerCase()}
      </h1>
    </div>
  );
};

export default Title;
