import get from "lodash/get";
import React from "react";
import { Meta } from "../components/index";
import CollectionsPanel from "../components/collectionsPanel/collectionsPanel";
import Grid from "../components/grid/grid";
import { formatUserName } from "../common/utils";
import Title from "../components/title/title";
import { fetchGames, createGame } from "../api/gamesApi";
import { SearchForm } from "../components/searchForm/searchForm";
import Modal from "../components/modal/modal";
import { fetchCover } from "../api/search";
import GamesPanel from "../components/gamesPanel/gamesPanel";

const Home = ({ initialGames = [], initialCollections = [], user }) => {
  return (
    <div className="flex">
      <Meta title={"Home"} />
      {user ? (
        <>
          <main className="w-3/4">
            <GamesPanel user={user} initialGames={initialGames} />
          </main>
          <CollectionsPanel user={user} initialCollections={initialCollections} />
        </>
      ) : (
        <div className="flex justify-center container">
          <div className="h-64 flex items-center">
            <h1 className="mx-auto text-center">Welcome to Video Game Shelf</h1>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Home.getInitialProps = async ({ req, res, query }) => {
  if (req && req.user) {
    const collectionId = query.id;
    const userId = get(req, "user.id");
    try {
      const games = await fetchGames(req, userId, collectionId);
      return { initialGames: games };
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

export default Home;
