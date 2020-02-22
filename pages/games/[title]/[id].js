import get from "lodash/get";

import React from "react";
import { trigger, mutate } from "@zeit/swr";

import { Nav, Meta } from "../../../components/index";
import { fetchGames, createGame, deleteGame } from "../../../api/gamesApi";
import GameTogglePanel from "../../../components/gameTogglePanel/gameTogglePanel";
import { updateCollection } from "../../../api/collectionsApi";
import GamesPanel from "../../../components/gamesPanel/gamesPanel";

import { formatUserName, toggleItemInArray, scrollTop } from "../../../common/utils";
import { useParams, useDataFetch } from "../../../common/hooks";
import { ENDPOINTS } from "../../../common/routes";

import "../../../styles/games.scss";

const Games = ({ initialGames = [], user, username }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showTogglePanel, setShowTogglePanel] = React.useState(true);
  const { id: collectionId, title: collectionTitle } = useParams();

  let fetchUrl = ENDPOINTS.GAME;
  const { data, isValidating, finalUrl } = useDataFetch(
    { user: get(user, "id"), collection: collectionId },
    fetchUrl
  );

  const games = data ? data.games : null;

  const handleToggleTogglePanel = () => {
    if (collectionId) {
      scrollTop();
      setShowTogglePanel(() => !showTogglePanel);
    }
  };

  const handleToggleGame = async game => {
    // Compose array with added/removed game
    const { newItems, newItemsProps } = toggleItemInArray(games, game, "id");

    // Go ahead and update the data client side
    mutate(finalUrl, { games: newItems }, false);

    // Fire and forget the server request
    try {
      await updateCollection(null, {
        id: collectionId,
        games: newItemsProps
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="games">
      <Meta title={"Games"} />
      {collectionId && showTogglePanel && user && (
        <GameTogglePanel
          user={user}
          currentCollectionGames={games}
          handleClosePanel={() => handleToggleTogglePanel(false)}
          handleToggleGame={handleToggleGame}
        />
      )}
      <div className="games-panel-wrapper container">
        {/* This component should contain all games IN THE CURRENT COLLECTION */}
        <GamesPanel
          title={`${collectionTitle} Shelf` || `${formatUserName(user)}'s Games`}
          user={user}
          userName={username}
          collectionId={collectionId}
          parentControlled={true}
          initialGames={games || initialGames}
          showTogglePanel={showTogglePanel}
          handlePrompt={handleToggleTogglePanel}
        />
      </div>
    </main>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Games.getInitialProps = async ({ req, query }) => {
  if (req) {
    const { id: collectionId } = query;
    const userId = get(req, "user.id");
    try {
      const { games, username } = await fetchGamesByUserId(req, userId, collectionId);
      return { initialGames: games, username };
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

export default Games;
