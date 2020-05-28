import React from "react";

import { Meta } from "../components/index";
import Landing from "../components/landing/landing";

const Home = ({ user }) => {
  return (
    <main className="main home page-root">
      <Meta title={"Home"} />
      <Landing user={user} />
    </main>
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
