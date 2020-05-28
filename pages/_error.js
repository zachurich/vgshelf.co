import React from "react";

import auth0 from "../common/auth";
import { APP_ROUTES } from "../common/routes";
import { redirect } from "../common/utils";
import { Meta } from "../components/index";

const Error = ({ user }) => {
  return (
    <div className="error-page">
      <Meta title={"Error"} />
      <div className="container">
        <div className="error-page-content">
          <h1>Something went wrong...</h1>
        </div>
      </div>
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Error.getInitialProps = async ({ req, res, query, err }) => {
  // if (res && res.statusCode === 404) {
  //   return redirect(res, APP_ROUTES.MISSING);
  // }
  if (req.url === APP_ROUTES.APP) {
    const { user } = await auth0.getSession(req);
    if (user) {
      return redirect(res, APP_ROUTES.APP.replace("[userName]", user.nickname));
    }
  }
  return { error: {} };
};

export default Error;
