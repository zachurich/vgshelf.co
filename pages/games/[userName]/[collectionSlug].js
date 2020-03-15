import get from "lodash/get";

import React, { useState } from "react";
import { mutate } from "@zeit/swr";

import { Meta } from "../../../components/index";
import {
  fetchGamesUserNameCollectionSlug,
  fetchGamesByUserName
} from "../../../api/gamesApi";
import GameTogglePanel from "../../../components/gameTogglePanel/gameTogglePanel";
import { updateCollection } from "../../../api/collectionsApi";
import GamesPanel from "../../../components/gamesPanel/gamesPanel";

import { formatUserName, toggleItemInArray, scrollTop } from "../../../common/utils";
import { useParams, useGamesFetchByUserAndCollection } from "../../../common/hooks";

import "../../../styles/games.scss";

const Games = ({ user, initialGames = [], initialCollection = [] }) => {
  const [showTogglePanel, setShowTogglePanel] = useState(true);
  const { userName, collectionSlug } = useParams();
  const { data: collectionGames, finalUrl } = useGamesFetchByUserAndCollection(
    initialCollection
  );

  const handleToggleTogglePanel = () => {
    if (collectionSlug) {
      scrollTop();
      setShowTogglePanel(() => !showTogglePanel);
    }
  };

  const handleToggleGame = async game => {
    // Compose array with added/removed game
    const { newItems, newItemsProps } = toggleItemInArray(collectionGames, game, "id");

    // Go ahead and update the data client side
    mutate(finalUrl, { games: newItems }, false);

    // Fire and forget the server request
    try {
      await updateCollection({
        userName,
        collectionSlug,
        games: newItemsProps
      });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <main className="games">
      <Meta title={"Games"} />
      {collectionSlug && showTogglePanel && user && (
        <GameTogglePanel
          user={user}
          currentCollectionGames={collectionGames}
          initialGames={initialGames}
          handleClosePanel={() => handleToggleTogglePanel(false)}
          handleToggleGame={handleToggleGame}
        />
      )}
      <div className="games-panel-wrapper container">
        {/* This component should contain all games IN THE CURRENT COLLECTION */}
        <GamesPanel
          title={`${collectionSlug} Shelf` || `${formatUserName(user)}'s Games`}
          user={user}
          userName={userName}
          collectionId={collectionSlug}
          parentControlled={true}
          games={collectionGames || initialCollection}
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
    const { collectionSlug, userName } = query;
    try {
      const { games: initialCollection } = await fetchGamesUserNameCollectionSlug(
        collectionSlug,
        userName
      );
      const { games: initialGames } = await fetchGamesByUserName(userName);
      return { initialGames, initialCollection };
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

export default Games;