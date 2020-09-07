import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { fetchCollectionsByUserName } from "../../api/fetchers/collectionsApi";
import { fetchGamesByUserName } from "../../api/fetchers/gamesApi";
import { checkDBUser } from "../../api/fetchers/usersApi";
import { HTTP_STATUS } from "../../common/constants";
import { useCollectionsFetch, useParams } from "../../common/hooks";
import useAuth from "../../common/hooks/useAuth";
import useCheckAuth from "../../common/hooks/useCheckAuth";
import { useCheckRegisteredUser } from "../../common/hooks/useCheckRegisteredUser";
import useGamesFetchByUserName from "../../common/hooks/useGameFetchByUserName";
import useModal from "../../common/hooks/useModal";
import { APP_ROUTES } from "../../common/routes";
import { handleServerError, scrollTop } from "../../common/utils";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import GamesPanel from "../../components/gamesPanel/gamesPanel";
import { Meta } from "../../components/index";
import checkAuth from "../api/check-auth";

const Dashboard = ({ initialGames = [], initialCollections = [] }) => {
  const user = useAuth();
  const {
    data: games,
    finalUrl: gamesCacheKey,
    isLoading: isGamesLoading,
  } = useGamesFetchByUserName(initialGames);

  const {
    data: collections,
    finalUrl: collectionsCacheKey,
    isLoading: isCollectionsLoading,
  } = useCollectionsFetch(initialCollections);

  useCheckRegisteredUser();

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
      <CollectionsPanel
        user={user}
        collections={collections}
        collectionsCacheKey={collectionsCacheKey}
        isCollectionsLoading={isCollectionsLoading}
      />
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
