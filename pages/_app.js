import "normalize.css";
import "@reach/combobox/styles.css";

import "../styles/styles.scss";

import _ from "lodash";
import App from "next/app";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { fetchCollectionsByUserName } from "../api/collectionsApi";
import { checkDBUser } from "../api/usersApi";
import auth0 from "../common/auth";
import { HTTP_STATUS } from "../common/constants";
import { useCollectionsFetch } from "../common/hooks";
import usePage from "../common/hooks/usePage";
import { APP_ROUTES } from "../common/routes";
import { redirect } from "../common/utils";
import { Nav } from "../components";
import CollectionsPanel from "../components/collectionsPanel/collectionsPanel";
import Footer from "../components/footer/footer";
import GlobalMessenger from "../components/globalMessenger/globalMessenger";
import AuthContext from "../contexts/authContext";

function VGShelf({ Component, pageProps, auth = null, initialCollections = [] }) {
  const [user] = useState(auth);
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
  const { ctx } = context;
  const { userName } = ctx.query;
  let initialCollections;
  let componentInitialProps = {};
  if (App.getInitialProps) {
    componentInitialProps = await App.getInitialProps(context);
  }

  if (userName) {
    try {
      initialCollections = await fetchCollectionsByUserName(userName);
    } catch (error) {
      console.log(error);
    }
  }

  if (ctx.req) {
    const auth = await auth0.getSession(ctx.req);
    if (auth) {
      const dbUser = await checkDBUser({ userId: auth.user.sub });
      return {
        pageProps: componentInitialProps.pageProps,
        auth: { ...auth.user, userName: dbUser.data.userName },
        initialCollections,
      };
    }
  }
  return { pageProps: componentInitialProps.pageProps };
};

export default VGShelf;
