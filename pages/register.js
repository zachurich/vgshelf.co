import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

import { registerUser } from "../api/fetchers/usersApi";
import { APP_ROUTES } from "../common/routes";
import { Meta } from "../components/index";
import GlobalMessageContext from "../contexts/globalMessage";

const Register = ({ user }) => {
  const [userName, setUserName] = useState("");
  const { promptMessage } = useContext(GlobalMessageContext);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ userName });
      router.push(APP_ROUTES.APP.replace("[userName]", userName));
    } catch (error) {
      promptMessage({
        header: "Error",
        message: `Nickname ${_.get(error, "response.data.msg", "already exists!")}`,
      });
    }
  };
  return (
    <main className="main register page-root">
      <Meta title={"Register"} />
      <div className="container comfy-margin">
        <h1>Complete Registration</h1>
        <form className="form registration-form" onSubmit={handleSubmit}>
          <label htmlFor="nickname">Choose a nickname</label>
          <input
            name="nickname"
            type="text"
            placeholder="Nickname..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="button button-primary comfy-margin" type="submit">
            Submit
          </button>
        </form>
      </div>
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
