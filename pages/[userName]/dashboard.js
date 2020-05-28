import _ from "lodash";
import React from "react";

import { fetchCollectionsByUserName } from "../../api/collectionsApi";
import { fetchGamesByUserName } from "../../api/gamesApi";
import { useCollectionsFetch, useParams } from "../../common/hooks";
import useAuth from "../../common/hooks/useAuth";
import useCheckAuth from "../../common/hooks/useCheckAuth";
import useGamesFetchByUserName from "../../common/hooks/useGameFetchByUserName";
import useModal from "../../common/hooks/useModal";
import { handleServerError, scrollTop } from "../../common/utils";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import GamesPanel from "../../components/gamesPanel/gamesPanel";
import { Meta } from "../../components/index";

const Dashboard = ({ initialGames = [], initialCollections = [] }) => {
  const user = useAuth();
  const {
    data: games,
    finalUrl: gamesCacheKey,
    isLoading: isGamesLoading,
  } = useGamesFetchByUserName(initialGames);

  return (
    <>
      <main className="main dashboard with-sidebar">
        <Meta title={"Dashboard"} />
        <GamesPanel
          user={user}
          games={games}
          gamesCacheKey={gamesCacheKey}
          isGamesLoading={isGamesLoading}
        />
      </main>
      <CollectionsPanel user={user} initialCollections={initialCollections} />
    </>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Dashboard.getInitialProps = async ({ req, res, query }) => {
  if (req) {
    const { userName } = query;
    try {
      const { games: initialGames } = await fetchGamesByUserName(userName);
      return { initialGames };
    } catch (e) {
      return handleServerError(e, res);
    }
  }
  return {};
};

export default Dashboard;
