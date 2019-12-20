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

  state = {
    user: this.props.pageProps.user,
    showNavMenu: false
  };

  componentDidMount() {
    if (document) {
      document.body.addEventListener("click", this.toggleMenu);
    }
  }

  componentWillUnmount() {
    if (document) {
      document.body.removeEventListener("click", this.toggleMenu);
    }
  }

  toggleMenu = e => {
    const { target } = e;
    if (target.classList.contains("menu-toggle")) {
      this.setState({ showNavMenu: !this.state.showNavMenu });
    } else if (this.state.showNavMenu) {
      this.setState({ showNavMenu: false });
    }
  };

  render() {
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user
    };

    return (
      <Container>
        <Nav user={this.state.user} menuVisible={this.state.showNavMenu} />
        <Component {...props} />
        <Footer />
      </Container>
    );
  }
}

export default MyApp;
