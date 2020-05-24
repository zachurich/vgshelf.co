import React from "react";

import { Meta } from "../components/index";
import Landing from "../components/landing/landing";

const Home = ({ user }) => {
  return (
    <div className="home">
      <Meta title={"Home"} />
      <Landing user={user} />
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Home.getInitialProps = async ({ req, res, query }) => {
  return { data: {} };
};

export default Home;
