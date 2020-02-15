import _ from "lodash";
import get from "lodash/get";
import React, { useEffect } from "react";
import Title from "../title/title";
import Grid from "../grid/grid";
import Modal from "../modal/modal";
import { SearchForm } from "../searchForm/searchForm";
import { trigger } from "@zeit/swr";
import { ENDPOINTS, ROUTES } from "../../../common/routes";
import { fetchGames, createGame, fetchSimple } from "../../api/gamesApi";
import { fetchCover } from "../../api/search";
import { appendParam, handleServerResponse, scrollTop } from "../../common/utils";
import { useDataFetch } from "../../common/hooks";
import GameItem from "../gameItem/gameItem";

import "./styles.scss";
import { decideHeader, decideBreadCrumb } from "./util";
import { ButtonToggle } from "../buttons/buttons";

function GamesPanel({
  initialGames = [],
  user,
  parentControlled = false, // if parent controlled, disable data fetching here
  collectionId: collection = null,
  userName = null,
  handlePrompt = null,
  showTogglePanel = false,
  title = null
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState(null);

  const { data, error, finalUrl } = !parentControlled
    ? useDataFetch({ user: get(user, "id"), collection, userName }, ENDPOINTS.GAME)
    : {};

  const games = _.get(data, "games", initialGames);
  const handleToggleModal = toggle => {
    scrollTop();
    setModalMsg(() => null);
    setShowModal(() => toggle || !showModal);
  };
  const toggleAction = handlePrompt || handleToggleModal; // prefer handleToggle prop

  const handleError = response => {
    const message = handleServerResponse(response);
    if (message) {
      setModalMsg(() => message);
    }
  };

  const handleCreateGame = async value => {
    if (value) {
      try {
        const coverData = await fetchCover(null, value.id);
        const response = await createGame(null, {
          id: user.id,
          title: value.name,
          igdbId: value.id,
          slug: value.slug,
          imageUrl: get(coverData[0], "url")
        });
        const message = handleServerResponse(response.data);
        if (message) {
          setModalMsg(() => message);
        } else {
          toggleAction(false);
          trigger(finalUrl);
        }
      } catch (error) {
        handleError(error.response.data);
      }
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
        breadCrumb={decideBreadCrumb(collection, user, userName)}
        color={collection ? "pink" : "blue"}
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
      <Modal
        open={showModal}
        closeText="Close"
        submitText="Submit"
        message={modalMsg}
        dismissModal={() => toggleAction(false)}
        handleSubmit={handleCreateGame}
      >
        <SearchForm inputName="Search by Game Title" placeholder="Game Title" />
      </Modal>
    </div>
  );
}

export default GamesPanel;
