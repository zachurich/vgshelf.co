import "normalize.css";

import "../styles/styles.scss";

import _ from "lodash";
import App from "next/app";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { fetchCollectionsByUserName } from "../api/collectionsApi";
import auth0 from "../common/auth";
import { useCollectionsFetch } from "../common/hooks";
import usePage from "../common/hooks/usePage";
import { Nav } from "../components";
import CollectionsPanel from "../components/collectionsPanel/collectionsPanel";
import Footer from "../components/footer/footer";
import GlobalMessenger from "../components/globalMessenger/globalMessenger";
import AuthContext from "../contexts/authContext";

function VGShelf({ Component, pageProps, auth = {}, initialCollections = [] }) {
  const [user] = useState(auth.user);
  const { isIndex } = usePage();
  return (
    <AuthContext.Provider value={{ user }}>
      <GlobalMessenger>
        <Nav />
        <div className="page-wrapper">
          <Component {...pageProps} initialCollections={initialCollections} />
        </div>
        <Footer />
      </GlobalMessenger>
    </AuthContext.Provider>
  );
}

VGShelf.getInitialProps = async (context) => {
  const { userName } = context.ctx.query;
  let initialCollections;
  let componentInitialProps = {};
  if (App.getInitialProps) {
    componentInitialProps = await App.getInitialProps(context);
  }

  if (userName) {
    initialCollections = await fetchCollectionsByUserName(userName);
  }

  if (context.ctx.req) {
    const auth = await auth0.getSession(context.ctx.req);
    if (auth) {
      return { pageProps: componentInitialProps.pageProps, auth, initialCollections };
    }
  }
  return { pageProps: componentInitialProps.pageProps };
};

export default VGShelf;
