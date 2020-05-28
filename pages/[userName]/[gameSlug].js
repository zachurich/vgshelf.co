import _ from "lodash";
import React from "react";

import { fetchGameBySlug } from "../../api/gamesApi";
import { useGameFetch, useParams } from "../../common/hooks";
import useAuth from "../../common/hooks/useAuth";
import { handleServerError } from "../../common/utils";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import GameDetails from "../../components/gameDetails/gameDetails";
import { decideBreadCrumb } from "../../components/gamesGrid/util";
import { Meta } from "../../components/index";
import Title from "../../components/title/title";

const Game = ({ initialGame = {}, initialCollections = [] }) => {
  const { userName, gameSlug } = useParams();
  const user = useAuth();
  const { data: game, finalUrl: gameCacheKey } = useGameFetch(initialGame, { gameSlug });
  return (
    <>
      <main className="main game with-sidebar">
        <Meta title={game.title} />
        {/* <code>{JSON.stringify(game)}</code> */}
        <Title
          header={game.title}
          breadCrumb={decideBreadCrumb(game.title, !!user, userName)}
        />
        <GameDetails game={game} />
      </main>
      <CollectionsPanel user={user} initialCollections={initialCollections} />
    </>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Game.getInitialProps = async ({ req, res, query }) => {
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
