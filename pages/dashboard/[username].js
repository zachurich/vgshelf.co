import get from "lodash/get";
import React from "react";
import { Meta } from "../../components/index";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import { fetchGamesByUserName } from "../../api/gamesApi";
import GamesPanel from "../../components/gamesPanel/gamesPanel";
import { useParams, useGameFetch, useCollectionFetch } from "../../common/hooks";
import { trigger } from "@zeit/swr";

const Dashboard = ({ user, initialGames = [], initialCollections = [] }) => {
  const { username } = useParams();
  const { data: games, finalUrl: gamesUrl, isLoading: isGamesLoading } = useGameFetch(
    initialGames,
    { userName: username }
  );
  const {
    data: collections,
    finalUrl: collectionsUrl,
    isLoading: isCollectionsLoading
  } = useCollectionFetch(initialCollections);
  return (
    <div className="dashboard">
      <Meta title={"Dashboard"} />
      <main className="main">
        <GamesPanel
          user={user}
          userName={username}
          games={games}
          isLoading={isGamesLoading}
          fetchKey={gamesUrl}
          refreshData={() => trigger(gamesUrl)}
        />
      </main>
      <section className="panel-right">
        <CollectionsPanel
          user={user}
          userName={username}
          collections={collections}
          isLoading={isCollectionsLoading}
          fetchKey={collectionsUrl}
          refreshData={() => trigger(collectionsUrl)}
        />
      </section>
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Dashboard.getInitialProps = async ({ req, query }) => {
  if (req) {
    let response;
    const { username } = query;
    try {
      response = await fetchGamesByUserName(username);
      return { initialGames: response.games };
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

export default Dashboard;
