import _ from "lodash";

import React from "react";
import { Nav, Meta } from "../components/index";
import Grid from "../components/grid/grid";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";
import { fetchGames, createGame, deleteGame } from "../api/gamesApi";
import { useRouter } from "next/router";
import { formatUserName } from "../common/utils";
import { SearchForm } from "../components/searchForm/searchForm";
import { fetchCover } from "../api/search";
import GameTogglePanel from "../components/gameTogglePanel/gameTogglePanel";
import { updateCollection } from "../api/collectionsApi";

const Games = ({ initialGames = [], user }) => {
  const [games, setGames] = React.useState(initialGames);
  const [showModal, setShowModal] = React.useState(false);
  const [showTogglePanel, setShowTogglePanel] = React.useState(false);

  const router = useRouter();
  const { id: collectionId, title: collectionTitle } = router.query;

  const handleToggleTogglePanel = toggle => {
    if (collectionId) {
      setShowTogglePanel(() => toggle);
    }
  };

  const handleDeleteGame = async id => {
    await deleteGame(null, { id, user: user.id });
    await updateGamesState();
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
    updateGamesState();
  };

  const updateGamesState = async () => {
    const games = await fetchGames(null, user.id, collectionId);
    setGames(() => games);
  };

  React.useEffect(() => {
    if (games.length < 1 && user) {
      updateGamesState();
    }
  }, [user]);

  return (
    <div className="games">
      <Meta title={"Games"} />
      {collectionId && showTogglePanel && (
        <GameTogglePanel
          user={user}
          currentCollectionGames={games}
          handleClosePanel={() => handleToggleTogglePanel(false)}
          handleToggleGame={handleToggleGame}
        />
      )}
      <main className={`shelf-games ${showTogglePanel ? "w-3/4" : "w-full"}`}>
        {/* This component should contain all games IN THE CURRENT COLLECTION */}
        <Title header={collectionTitle || `${formatUserName(user)}'s Games`} />
        <Grid
          data={games}
          size="med"
          handleDelete={handleDeleteGame}
          handlePrompt={() => handleToggleTogglePanel(true)}
        />
      </main>
    </div>
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
