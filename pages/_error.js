import get from "lodash/get";
import React from "react";
import { Meta } from "../components/index";
import { APP_ROUTES } from "../common/routes";
import auth0 from "../common/auth";
import { Router } from "next/router";

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
  if (req.url === APP_ROUTES.APP) {
    const { user } = await auth0.getSession(req);
    if (user) {
      res.writeHead(302, {
        Location: APP_ROUTES.APP + "/" + user.nickname
      });
      res.end();
      return;
    }
  }
  return {};
};

export default Error;
