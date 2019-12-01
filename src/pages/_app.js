import _ from "lodash";
import React from "react";
import App, { Container } from "next/app";
import { Nav } from "../components";

import "normalize.css";
import "../styles/index.scss";
import Footer from "../components/footer/footer";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user
    };

    return (
      <Container>
        <Nav user={this.state.user} />
        <Component {...props} />
        <Footer />
      </Container>
    );
  }
}

export default MyApp;
