import React from "react";

import { Meta } from "../components/index";

const Missing404 = ({ user }) => {
  return (
    <div className="error-page">
      <Meta title={"Page Not Found"} />
      <div className="container">
        <div className="error-page-content">
          <h1>Sorry, that page doesn't exist...</h1>
        </div>
      </div>
    </div>
  );
};

export default Missing404;
