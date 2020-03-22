import _ from "lodash";
import React from "react";
import App from "next/app";
import { Nav } from "../components";
import Footer from "../components/footer/footer";
import Router from "next/router";
import { APP_ROUTES } from "../common/routes";
import auth0 from "../common/auth";

import "normalize.css";
import "../styles/index.scss";
import GlobalMessageContext from "../contexts/globalMessage";
import GlobalMessanger from "../components/globalMessenger/globalMessenger";

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

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalMessanger>
          <Nav user={this.props.user} />
          <Component user={this.props.user} {...pageProps} />
          <Footer />
        </GlobalMessanger>
      </>
    );
  }
}

export default VGShelf;
