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
import { appendParam, handleServerResponse } from "../../common/utils";
import { useDataFetch } from "../../common/hooks";
import GameItem from "../gameItem/gameItem";

import "./styles.scss";
import { decideHeader, decideBreadCrumb } from "./util";

function GamesPanel({
  initialGames = [],
  user,
  parentControlled = false, // if parent controlled, disable data fetching here
  collectionId: collection = null,
  userName = null,
  handlePrompt = null,
  title = null
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState(null);

  const { data, error, finalUrl } = !parentControlled
    ? useDataFetch({ user: get(user, "id"), collection, userName }, ENDPOINTS.GAME)
    : {};

  const games = _.get(data, "games", initialGames);

  const handleToggleModal = toggle => {
    setModalMsg(() => null);
    setShowModal(() => toggle);
  };
  const toggleAction = handlePrompt || handleToggleModal; // prefer handleToggle prop

  const handleCreateGame = async value => {
    if (value) {
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
          <div
            onClick={() => toggleAction(true)}
            className="button button-toggle button-secondary"
          >
            <a>+</a>
          </div>
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
        <SearchForm inputName="Search by Game Title" />
      </Modal>
    </div>
  );
}

export default GamesPanel;
