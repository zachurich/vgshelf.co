import _ from "lodash";

import React from "react";
import { Nav, Meta } from "../components/index";
import Grid from "../components/grid/grid";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";
import { fetchGames, createGame, deleteGame } from "../api/gamesApi";
import { useRouter } from "next/router";
import { Search } from "../components/search/search";
import { ROUTES } from "../common/constants";
import { formatUserName } from "../common/utils";

const Games = ({ initialGames = [], user }) => {
  const [games, setGames] = React.useState(initialGames);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const router = useRouter();
  const { id: collectionId, title: collectionTitle } = router.query;

  const handleToggleModal = toggle => {
    setShowModal(() => toggle);
    setTitle(() => "");
  };

  const handleCreateGame = async value => {
    if (value.length > 0) {
      handleToggleModal(false);
      await createGame(null, {
        id: user.id,
        title: value,
        ...(collectionId && { collection: collectionId })
      });
      await updateGamesState();
      // setTitle(() => "");
    }
  };

  const handleDeleteGame = async id => {
    await deleteGame(null, { id, user: user.id });
    await updateGamesState();
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
    <div>
      <Meta title={"Games"} />
      <Title header={collectionTitle || `${formatUserName(user)}'s Games`} />
      <Grid
        data={games}
        size="small"
        handleDelete={handleDeleteGame}
        handlePrompt={() => handleToggleModal(true)}
      />
      <Modal
        open={showModal}
        closeText="Close"
        submitText="Submit"
        dismissModal={() => handleToggleModal(false)}
        handleSubmit={handleCreateGame}
      >
        <Search inputName="Search" handleSubmit={handleCreateGame} />
      </Modal>
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Games.getInitialProps = async ({ req, res }) => {
  if (req) {
    const collectionId = req.query.id;
    const userId = req.user.id;
    try {
      const games = await fetchGames(req, userId, collectionId);
      return { initialGames: games };
    } catch (e) {
      console.log(e);
    }
  }
};

export default Games;
