import "normalize.css";

import "../styles/styles.scss";

import _ from "lodash";
import App from "next/app";
import Router from "next/router";
import React, { useState } from "react";

import auth0 from "../common/auth";
import { Nav } from "../components";
import Footer from "../components/footer/footer";
import GlobalMessenger from "../components/globalMessenger/globalMessenger";
import AuthContext from "../contexts/authContext";

function VGShelf({ Component, pageProps, auth = {} }) {
  const [user] = useState(auth.user);
  return (
    <AuthContext.Provider value={{ user }}>
      <GlobalMessenger>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </GlobalMessenger>
    </AuthContext.Provider>
  );
}

VGShelf.getInitialProps = async (context) => {
  let componentInitialProps = {};
  if (App.getInitialProps) {
    componentInitialProps = await App.getInitialProps(context);
  }

  if (context.ctx.req) {
    const auth = await auth0.getSession(context.ctx.req);
    if (auth) {
      return { pageProps: componentInitialProps.pageProps, auth };
    }
  }
  return { pageProps: componentInitialProps.pageProps };
};

export default VGShelf;
