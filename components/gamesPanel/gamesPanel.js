import _ from "lodash";
import React from "react";

import Title from "../title/title";
import Grid from "../grid/grid";
import { SearchForm } from "../searchForm/searchForm";
import { createGame, deleteGame } from "../../api/gamesApi";
import { fetchCover } from "../../api/search";
import { handleServerResponse, scrollTop, userCanEdit } from "../../common/utils";
import GameItem from "../gameItem/gameItem";
import { decideHeader, decideBreadCrumb } from "./util";
import { ButtonToggle } from "../buttons/buttons";
import Loader from "../loader/loader";
import { MODAL_DEFAULT } from "../../common/hooks/useModal";
import useCheckAuth from "../../common/hooks/useCheckAuth";

function GamesPanel({
  games = [],
  collectionId = null,
  user = null,
  userName = null,
  showModal,
  setShowModal,
  setModalContent,
  handlePrompt = null,
  showTogglePanel = false,
  title = null,
  isLoading = false,
  refreshData = () => {},
}) {
  const { performAuthCheck } = useCheckAuth();
  const clearModalData = () => {
    setModalContent(() => MODAL_DEFAULT);
  };

  const handleError = (response) => {
    const message = handleServerResponse(response);
    if (message) {
      setModalContent(() => ({
        header: "Error",
        component: <p>{message}</p>,
      }));
    }
  };

  const handleAddGames = async (games) => {
    let message;
    for (const game of games) {
      const coverData = await fetchCover(game.id);
      game.cover = _.get(coverData[0], "url");
      try {
        const response = await createGame({
          userId: user.sub,
          title: game.name,
          igdbId: game.id,
          slug: game.slug,
          imageUrl: game.cover,
        });
        message = handleServerResponse(response.data);
      } catch (error) {
        handleError(error.respose ? error.response.data : error);
      }
    }

    if (!message) {
      setShowModal(false);
      refreshData();
    }
  };

  const handleDeleteGame = async (game) => {
    if (!user) {
      setModalContent(() => ({
        header: "Error",
        component: <p>You are not signed in!</p>,
      }));
      setShowModal(true);
    } else {
      await deleteGame({ gameId: game.id, userId: user.sub });
      refreshData(games.filter((item) => item.id !== game.id));
    }
  };

  const handleToggleModal = async (toggle) => {
    const authed = await performAuthCheck();
    if (!authed) return;
    scrollTop();
    clearModalData();
    setModalContent(() => ({
      header: "Search by Game Title",
      component: (
        <SearchForm
          inputName="Search by Game Title"
          placeholder="Game Title"
          closeText="Cancel"
          dismissModal={() => setShowModal(false)}
          handleSubmit={handleAddGames}
        />
      ),
    }));
    setShowModal(() => toggle || !showModal);
  };

  const toggleAction = handlePrompt || handleToggleModal; // prefer handlePrompt prop
  return (
    <div className="games-panel">
      <Title
        header={decideHeader(title, user, userName)}
        breadCrumb={decideBreadCrumb(collectionId, user, userName)}
        color={collectionId ? "pink" : "blue"}
      >
        {userCanEdit(user, userName) && (
          <ButtonToggle
            additionalClasses={`button-add ${
              showTogglePanel || showModal ? "button-add-close" : "button-add-open"
            }`}
            handleToggle={() => toggleAction()}
          />
        )}
      </Title>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          data={games}
          size="large"
          filtering={{ enabled: true, type: "title", inputText: "Search games..." }}
          handlePrompt={() => toggleAction(true)}
          canAdd={!!user}
          sortKey={"added"}
          gridItem={(props) => <GameItem handleAction={handleDeleteGame} {...props} />}
        />
      )}
    </div>
  );
}

export default GamesPanel;
