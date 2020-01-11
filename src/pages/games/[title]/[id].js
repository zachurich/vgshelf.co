import get from "lodash/get";

import React from "react";
import { Nav, Meta } from "../../../components/index";
import { fetchGames, createGame, deleteGame } from "../../../api/gamesApi";
import { formatUserName, toggleItemInArray } from "../../../common/utils";
import GameTogglePanel from "../../../components/gameTogglePanel/gameTogglePanel";
import { updateCollection } from "../../../api/collectionsApi";
import GamesPanel from "../../../components/gamesPanel/gamesPanel";
import { useParams, useDataFetch } from "../../../common/hooks";
import { trigger, mutate } from "@zeit/swr";
import { ENDPOINTS } from "../../../../common/routes";

import "../../../styles/games.scss";

const Games = ({ initialGames = [], user }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showTogglePanel, setShowTogglePanel] = React.useState(false);
  const { id: collectionId, title: collectionTitle, userName } = useParams();

  let fetchUrl = ENDPOINTS.GAME;
  const { data: games, error, isValidating, finalUrl } = useDataFetch(
    { user: get(user, "id"), collection: collectionId, userName },
    fetchUrl
  );
  const handleToggleTogglePanel = () => {
    if (collectionId) {
      setShowTogglePanel(() => !showTogglePanel);
    }
  };

  const handleDeleteGame = async id => {
    await deleteGame(null, { id, user: user.id });
    trigger(finalUrl);
  };

  const handleToggleGame = async game => {
    // Compose array with added/removed game
    const { newItems, newItemsProps } = toggleItemInArray(games, game, "id");

    // Go ahead and update the data client side
    mutate(finalUrl, newItems, false);

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
      {collectionId && showTogglePanel && (
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
          userName={userName}
          collectionId={collectionId}
          initialGames={games || initialGames}
          handlePrompt={() => handleToggleTogglePanel(true)}
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
      const games = await fetchGames(req, userId, collectionId);
      return { initialGames: games };
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

export default Games;
