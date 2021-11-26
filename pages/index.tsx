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

export const getServerSideProps = async ({ req, res, query }) => {
  return { props: {} };
};

export default Home;
