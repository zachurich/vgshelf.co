import _ from "lodash";
import React from "react";

import { fetchGameBySlug } from "../../api/gamesApi";
import {
  useCollectionsFetch,
  useGameFetch,
  useParams,
} from "../../common/hooks";
import useAuth from "../../common/hooks/useAuth";
import { desluggify, handleServerError, userCanEdit } from "../../common/utils";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import GameDetails from "../../components/gameDetails/gameDetails";
import { decideBreadCrumb } from "../../components/gamesGrid/util";
import { Meta } from "../../components/index";
import Title from "../../components/title/title";

const Game = ({ initialGame = {}, initialCollections = [] }) => {
  const { userName, gameSlug } = useParams();
  const user = useAuth();
  const {
    data: game,
    finalUrl: gameCacheKey,
    isLoading,
  } = useGameFetch(initialGame, {
    gameSlug,
  });
  const {
    data: collections,
    finalUrl: collectionsCacheKey,
    isLoading: isCollectionsLoading,
  } = useCollectionsFetch(initialCollections);
  return (
    <>
      <main className="main game with-sidebar">
        <Meta title={desluggify(gameSlug)} />
        <Title
          header={game.title}
          breadCrumb={decideBreadCrumb(
            game.title,
            userCanEdit(user, userName),
            userName
          )}
        />
        <GameDetails game={game} />
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

export const getServerSideProps = async ({ req, res, query }) => {
  if (req) {
    const { gameSlug } = query;
    try {
      const initialGame = await fetchGameBySlug(gameSlug);
      return { initialGame };
    } catch (e) {
      return handleServerError(e, res);
    }
  }
  return {};
};

export default Game;
