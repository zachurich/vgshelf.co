import React from "react";

import { Meta } from "../components/index";

const Register = ({ user }) => {
  return (
    <main className="main register page-root">
      <Meta title={"Register"} />
      Register plz
    </main>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Register.getInitialProps = async ({ req, res, query }) => {
  return { data: {} };
};

export default Register;
