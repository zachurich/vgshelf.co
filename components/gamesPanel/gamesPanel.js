import _ from "lodash";
import get from "lodash/get";
import React, { useState } from "react";

import Title from "../title/title";
import Grid from "../grid/grid";
import Modal from "../modal/modal";
import { SearchForm } from "../searchForm/searchForm";
import { trigger } from "@zeit/swr";
import { createGame } from "../../api/gamesApi";
import { fetchCover } from "../../api/search";
import { handleServerResponse, scrollTop } from "../../common/utils";
import { useGameFetch, useToggle, useParams } from "../../common/hooks";
import GameItem from "../gameItem/gameItem";
import { decideHeader, decideBreadCrumb } from "./util";
import { ButtonToggle } from "../buttons/buttons";
import FormSelections from "../formSelections/formSelections";

import "./styles.scss";

function GamesPanel({
  initialGames = [],
  parentControlled = false, // if parent controlled, disable data fetching here
  collectionId = null,
  user = null,
  userName = null,
  handlePrompt = null,
  showTogglePanel = false,
  title = null
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalMsg, setModalMsg] = useState(null);
  const [selections, setSelections] = useState([]);
  const { username } = useParams();
  const { data: games, error, finalUrl } = !parentControlled
    ? useGameFetch(initialGames, { userName: username })
    : {};

  const handleToggleModal = toggle => {
    scrollTop();
    clearModalData();
    setShowModal(() => toggle || !showModal);
  };

  const clearModalData = () => {
    setModalMsg(() => null);
    setSelections(() => []);
  };

  const handleAddSelection = async selection => {
    const coverData = await fetchCover(selection.id);
    selection.cover = get(coverData[0], "url");
    setSelections(() => selections.concat(selection));
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
      try {
        const response = await createGame(
          {
            userId: user.sub,
            title: game.name,
            igdbId: game.id,
            slug: game.slug,
            imageUrl: game.cover
          },
          accessToken
        );
        message = handleServerResponse(response.data);
      } catch (error) {
        handleError(error.response.data);
      }
    }

    if (message) {
      setModalMsg(() => message);
    } else {
      toggleAction(false);
      trigger(finalUrl);
    }
  };

  const handleDeleteGame = async id => {
    await deleteGame(null, { id, user: user.id });
    trigger(finalUrl);
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
      {!games && !initialGames ? (
        <Loader />
      ) : (
        <Grid
          data={games || initialGames}
          size="large"
          handleDelete={handleDeleteGame}
          handlePrompt={() => toggleAction(true)}
          canAdd={!!user}
          sortKey={"added"}
          gridItem={props => <GameItem handleToggle={handleToggleModal} {...props} />}
        />
      )}
      <Modal open={showModal} message={modalMsg} dismissModal={() => toggleAction(false)}>
        <FormSelections selections={selections} />
        <SearchForm
          inputName="Search by Game Title"
          placeholder="Game Title"
          closeText="Cancel"
          submitText={`Add ${selections.length !== 0 ? selections.length : ""} Game${
            selections.length <= 1 ? "" : "s"
          }`}
          dismissModal={() => toggleAction(false)}
          handleAddSelection={handleAddSelection}
          handleSubmit={() => handleAddGames(selections)}
        />
      </Modal>
    </div>
  );
}

export default GamesPanel;
