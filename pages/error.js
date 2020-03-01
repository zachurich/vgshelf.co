import get from "lodash/get";
import React from "react";
import { Meta } from "../components/index";

const Error = ({ user }) => {
  return (
    <div className="home">
      <Meta title={"Home"} />
      <div className="container">
        <h1>Something went wrong...</h1>
      </div>
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Error.getInitialProps = async ({ req, res, query }) => {
  return {};
};

export default Error;
