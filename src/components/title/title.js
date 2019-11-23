import React from "react";

import "./title.scss";

const Title = ({ header }) => {
  return (
    <div className="title">
      <h1 className="title-text">{header.toLowerCase()}</h1>
    </div>
  );
};

export default Title;
