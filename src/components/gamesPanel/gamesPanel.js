import _ from "lodash";
import React from "react";
import Title from "../title/title";
import Grid from "../grid/grid";
import Modal from "../modal/modal";
import { SearchForm } from "../searchForm/searchForm";
import { trigger } from "@zeit/swr";
import { ENDPOINTS } from "../../../common/routes";
import { fetchGames, createGame, fetchSimple } from "../../api/gamesApi";
import { fetchCover } from "../../api/search";
import { appendParam } from "../../common/utils";
import { useDataFetch } from "../../common/hooks";

function GamesPanel({
  initialGames = [],
  user,
  collectionId: collection = null,
  userName = null,
  handlePrompt = null,
  title = null
}) {
  const [showModal, setShowModal] = React.useState(false);

  let fetchUrl = ENDPOINTS.GAME;
  const { data: games, error, finalUrl } = useDataFetch(
    { user: user.id, collection, userName },
    fetchUrl
  );

  const handleToggleModal = toggle => {
    setShowModal(() => toggle);
  };
  const [modalMsg, setModalMsg] = React.useState(null);
  const toggleAction = handlePrompt || handleToggleModal; // prefer handleToggle prop

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
        header={title ? title : user ? "All My Games" : `${userName} Games`}
        borderColor="pink"
      />
      <Grid
        data={games || initialGames}
        size="large"
        handleDelete={handleDeleteGame}
        handlePrompt={() => toggleAction(true)}
        canAdd={!!user}
      />
      <Modal
        open={showModal}
        closeText="Close"
        submitText="Submit"
        message={modalMsg}
        dismissModal={() => toggleAction(false)}
        handleSubmit={handleCreateGame}
      >
        <SearchForm inputName="Search" />
      </Modal>
    </div>
  );
}

export default GamesPanel;
