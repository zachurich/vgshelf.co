import "normalize.css";
import "@reach/combobox/styles.css";

import "../styles/styles.scss";

import _ from "lodash";
import App from "next/app";
import React from "react";
import { getSession, UserProvider } from "@auth0/nextjs-auth0";

import { fetchCollectionsByUserName } from "../api/collectionsApi";
import { checkDBUser } from "../api/usersApi";
import { HTTP_STATUS } from "../common/constants";
import { useCollectionsFetch } from "../common/hooks";
import usePage from "../common/hooks/usePage";
import { APP_ROUTES } from "../common/routes";
import { redirect } from "../common/utils";
import { Nav } from "../components";
import CollectionsPanel from "../components/collectionsPanel/collectionsPanel";
import Footer from "../components/footer/footer";
import GlobalMessenger from "../components/globalMessenger/globalMessenger";

function RootApp({
  Component,
  pageProps,
  auth = null,
  initialCollections = [],
}) {
  console.log(pageProps);
  return (
    <UserProvider>
      <GlobalMessenger>
        <Nav />
        <div className="page-wrapper">
          <Component {...pageProps} initialCollections={initialCollections} />
        </div>
        <Footer />
      </GlobalMessenger>
    </UserProvider>
  );
}

// Prob don't need this anymore
// export const getServerSideProps = async (context) => {
//   const auth = await getSession(ctx.req);
// };

export default RootApp;
