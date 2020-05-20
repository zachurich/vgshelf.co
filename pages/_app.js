import "normalize.css";

import "../styles/index.scss";

import _ from "lodash";
import App from "next/app";
import Router from "next/router";
import React from "react";

import auth0 from "../common/auth";
import { APP_ROUTES } from "../common/routes";
import { Nav } from "../components";
import Footer from "../components/footer/footer";
import GlobalMessanger from "../components/globalMessenger/globalMessenger";
import GlobalMessageContext from "../contexts/globalMessage";

class VGShelf extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req) {
      const auth = await auth0.getSession(ctx.req);
      if (auth) {
        return { pageProps, user: auth.user };
      }
    }

    return { pageProps };
  }

  state = {
    user: this.props.user,
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalMessanger>
          <Nav user={this.state.user} />
          <Component user={this.state.user} {...pageProps} />
          <Footer />
        </GlobalMessanger>
      </>
    );
  }
}

export default VGShelf;
