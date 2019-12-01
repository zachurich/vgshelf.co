import _ from "lodash";
import React from "react";
import Title from "../title/title";
import Grid from "../grid/grid";
import Modal from "../modal/modal";
import { SearchForm } from "../searchForm/searchForm";
import useSWR, { trigger } from "@zeit/swr";
import { ENDPOINTS } from "../../common/constants";
import { fetchGames, createGame, fetchSimple } from "../../api/gamesApi";
import { fetchCover } from "../../api/search";
import { appendParam } from "../../common/utils";
import { useRouter } from "next/router";

function GamesPanel({ initialGames = [], user, collectionId = null, userName = null }) {
  const [showModal, setShowModal] = React.useState(false);

  let fetchUrl = ENDPOINTS.GAME;

  if (user) {
    fetchUrl = appendParam(fetchUrl, { key: "user", value: user.id });
  }
  if (collectionId) {
    fetchUrl = appendParam(fetchUrl, { key: "collection", value: collectionId });
  }
  if (userName) {
    fetchUrl = appendParam(fetchUrl, { key: "userName", value: userName });
  }

  console.log("HELLO", fetchUrl);
  const { data: games, error } = useSWR(fetchUrl, fetchSimple);

  const handleToggleModal = toggle => {
    setShowModal(() => toggle);
  };
  const [modalMsg, setModalMsg] = React.useState(null);

  const handleCreateGame = async value => {
    if (value) {
      const coverData = await fetchCover(null, value.id);
      const response = await createGame(null, {
        id: user.id,
        title: value.name,
        igdbId: value.id,
        slug: value.slug,
        imageUrl: _.get(coverData[0], "url")
      });
      const message = _.get(response, "data.msg");
      setModalMsg(() => message);
      handleToggleModal(false);
      trigger(fetchUrl);
    }
  };

  const handleDeleteGame = async id => {
    await deleteGame(null, { id, user: user.id });
    trigger(fetchUrl);
  };

  return (
    <div className="games-panel">
      <Title header={user ? "All My Games" : `${userName} Games`} borderColor="pink" />
      <Grid
        data={games || initialGames}
        size="large"
        handleDelete={handleDeleteGame}
        handlePrompt={() => handleToggleModal(true)}
      />
      <Modal
        open={showModal}
        closeText="Close"
        submitText="Submit"
        message={modalMsg}
        dismissModal={() => handleToggleModal(false)}
        handleSubmit={handleCreateGame}
      >
        <SearchForm inputName="Search" />
      </Modal>
    </div>
  );
}

export default GamesPanel;
