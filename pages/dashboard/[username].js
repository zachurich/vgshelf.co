import { mutate, trigger } from "@zeit/swr";
import _ from "lodash";
import React from "react";

import { fetchCollectionsByUserName } from "../../api/collectionsApi";
import { fetchGamesByUserName } from "../../api/gamesApi";
import { useCollectionsFetch, useParams } from "../../common/hooks";
import useCheckAuth from "../../common/hooks/useCheckAuth";
import useGamesFetchByUserName from "../../common/hooks/useGameFetchByUserName";
import useModal from "../../common/hooks/useModal";
import { handleServerError, scrollTop } from "../../common/utils";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import GamesPanel from "../../components/gamesPanel/gamesPanel";
import { Meta } from "../../components/index";

const Dashboard = ({ user, initialGames = [], initialCollections = [] }) => {
  const { userName } = useParams();
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
  const { showModal, setShowModal } = useModal();
  const { performAuthCheck } = useCheckAuth();

  const handleToggleModal = async (toggle) => {
    const authed = await performAuthCheck();
    if (!authed) return;
    scrollTop();
    setShowModal(() => toggle || !showModal);
  };
  return (
    <div className="dashboard">
      <Meta title={"Dashboard"} />
      <GamesPanel
        user={user}
        games={games}
        gamesCacheKey={gamesCacheKey}
        isGamesLoading={isGamesLoading}
      />
      <CollectionsPanel
        user={user}
        collections={collections}
        collectionsCacheKey={collectionsCacheKey}
        isCollectionsLoading={isCollectionsLoading}
      />
    </div>
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
      const initialCollections = await fetchCollectionsByUserName(userName);
      return { initialGames, initialCollections };
    } catch (e) {
      return handleServerError(e, res);
    }
  }
  return {};
};

export default Dashboard;
