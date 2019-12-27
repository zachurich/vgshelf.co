import _ from "lodash";

import React from "react";
import { Nav, Meta } from "../components/index";
import Grid from "../components/grid/grid";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";
import { fetchGames, createGame, deleteGame } from "../api/gamesApi";
import { formatUserName } from "../common/utils";
import { SearchForm } from "../components/searchForm/searchForm";
import { fetchCover } from "../api/search";
import GameTogglePanel from "../components/gameTogglePanel/gameTogglePanel";
import { updateCollection } from "../api/collectionsApi";
import GamesPanel from "../components/gamesPanel/gamesPanel";
import { useParams, useDataFetch } from "../common/hooks";
import { trigger } from "@zeit/swr";
import { ENDPOINTS } from "../../common/routes";

import "../styles/games.scss";

const Games = ({ initialGames = [], user }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showTogglePanel, setShowTogglePanel] = React.useState(false);
  const { id: collectionId, title: collectionTitle, userName } = useParams();

  let fetchUrl = ENDPOINTS.GAME;
  const { data: games, error, finalUrl } = useDataFetch(
    { user: user.id, collection: collectionId, userName },
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
    let currentGames = games.map(game => game.id);
    if (currentGames.includes(game)) {
      currentGames = currentGames.filter(currentGame => currentGame !== game);
    } else {
      currentGames = currentGames.concat(game);
    }
    const response = await updateCollection(null, {
      id: collectionId,
      games: currentGames
    });
    trigger(finalUrl);
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
      <div className="games-panel-wrapper">
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
Games.getInitialProps = async ({ req, res, query }) => {
  if (req && req.user) {
    const collectionId = query.id;
    const userId = req.user.id;
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
