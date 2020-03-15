import _ from "lodash";
import get from "lodash/get";
import React, { useState } from "react";

import Title from "../title/title";
import Grid from "../grid/grid";
import Modal from "../modal/modal";
import { SearchForm } from "../searchForm/searchForm";
import { trigger } from "@zeit/swr";
import { createGame, deleteGame } from "../../api/gamesApi";
import { fetchCover } from "../../api/search";
import { handleServerResponse, scrollTop } from "../../common/utils";
import { useGameFetch, useToggle, useParams } from "../../common/hooks";
import GameItem from "../gameItem/gameItem";
import { decideHeader, decideBreadCrumb } from "./util";
import { ButtonToggle } from "../buttons/buttons";
import FormSelections from "../formSelections/formSelections";

import "./styles.scss";
import Loader from "../loader/loader";

function GamesPanel({
  games = [],
  collectionId = null,
  user = null,
  userName = null,
  handlePrompt = null,
  showTogglePanel = false,
  title = null,
  isLoading = false,
  refreshData = () => {}
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalMsg, setModalMsg] = useState(null);

  const handleToggleModal = toggle => {
    scrollTop();
    clearModalData();
    setShowModal(() => toggle || !showModal);
  };

  const clearModalData = () => {
    setModalMsg(() => null);
  };

  const toggleAction = handlePrompt || handleToggleModal; // prefer handlePrompt prop

  const handleError = response => {
    const message = handleServerResponse(response);
    if (message) {
      setModalMsg(() => message);
    }
  };

  const handleAddGames = async games => {
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
          imageUrl: game.cover
        });
        message = handleServerResponse(response.data);
      } catch (error) {
        handleError(error.respose ? error.response.data : error);
      }
    }

    if (message) {
      setModalMsg(() => message);
    } else {
      toggleAction(false);
      refreshData();
    }
  };

  const handleDeleteGame = async game => {
    if (!user) {
      setModalMsg(() => "You are not signed in!");
      setShowModal(() => true);
    } else {
      await deleteGame({ gameId: game.id, userId: user.sub });
      refreshData(games.filter(item => item.id !== game.id));
    }
  };

  return (
    <div className="games-panel">
      <Title
        header={decideHeader(title, user, userName)}
        breadCrumb={decideBreadCrumb(collectionId, user, userName)}
        color={collectionId ? "pink" : "blue"}
      >
        {!!user && (
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
          filtering={{ enabled: true, type: "title" }}
          handlePrompt={() => toggleAction(true)}
          canAdd={!!user}
          sortKey={"added"}
          gridItem={props => <GameItem handleAction={handleDeleteGame} {...props} />}
        />
      )}
      <Modal
        open={showModal}
        message={modalMsg}
        dismissModal={() => handleToggleModal(false)}
      >
        <SearchForm
          inputName="Search by Game Title"
          placeholder="Game Title"
          closeText="Cancel"
          dismissModal={() => toggleAction(false)}
          handleSubmit={handleAddGames}
        />
      </Modal>
    </div>
  );
}

export default GamesPanel;
