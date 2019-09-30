import _ from "lodash";

import React from "react";
import { Nav, Meta } from "../components/index";
import Grid from "../components/grid/grid";

import "../styles/index.css";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";
import { fetchGames, createGame, deleteGame } from "../api/gamesApi";
import Router from "next/router";

const Games = ({ intialGames = [], user }) => {
  const [games, setGames] = React.useState(intialGames);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const handleToggleModal = toggle => {
    setShowModal(() => toggle);
    setTitle(() => "");
  };

  const handleCreateGame = async () => {
    if (title.length > 0) {
      handleToggleModal(false);
      await createGame(null, {
        id: user.id,
        name: title,
        games: []
      });
      const newGames = await fetchGames(null, user.id);
      setGames(() => newGames);
      setTitle(() => "");
    }
  };

  const handleDeleteGame = async id => {
    await deleteGame(null, { id });
    const newGames = await fetchGames(null, user.id);
    setGames(() => newGames);
  };

  React.useEffect(() => {
    const fetchInitialGames = async () => {
      const collections = await fetchGames(null, user.id);
      setGames(() => collections);
    };
    if (games.length < 1 && user) {
      fetchInitialGames();
    }
  }, [user]);

  return (
    <div>
      <Meta title={"Games"} />
      <Title header={"Games"} />
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
        <form className="mb-6 w-full" onSubmit={handleCreateGame}>
          <label className="block mb-2" htmlFor="collection-title">
            Title
          </label>
          <input
            className="shadow rounded w-full appearance-none border py-2 px-3 leading-tight text-base"
            name="collection-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Games.getInitialProps = async ({ req, res }) => {
  const userId = _.get(req, "user.id", null);
  if (req && userId) {
    try {
      const games = await fetchGames(req, userId);
      return { games };
    } catch (e) {
      console.log(e);
    }
  }
};

export default Games;
