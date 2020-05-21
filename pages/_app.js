import "normalize.css";

import "../styles/index.scss";

import _ from "lodash";
import App from "next/app";
import Router from "next/router";
import React, { useState } from "react";

import auth0 from "../common/auth";
import { Nav } from "../components";
import Footer from "../components/footer/footer";
import GlobalMessanger from "../components/globalMessenger/globalMessenger";

function VGShelf({ Component, pageProps, auth = {} }) {
  const [user, setUser] = useState(auth.user);
  return (
    <>
      <GlobalMessanger>
        <Nav user={user} />
        <Component user={user} {...pageProps} />
        <Footer />
      </GlobalMessanger>
    </>
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
