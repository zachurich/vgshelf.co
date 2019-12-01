import React from "react";

import "./title.scss";

const Title = ({ header, borderColor }) => {
  return (
    <div className="title">
      <h3 className={`title-text ${borderColor}`}>{header.toLowerCase()}</h3>
    </div>
  );
};

export default Title;
