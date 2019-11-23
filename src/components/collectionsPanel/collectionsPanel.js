import React from "react";
import Grid from "../grid/grid";
import Modal from "../modal/modal";
import { BasicForm } from "../basicForm/basicForm";
import { ROUTES, ENDPOINTS } from "../../common/constants";
import {
  fetchCollections,
  createCollection,
  deleteCollection
} from "../../api/collectionsApi";
import Title from "../title/title";
import useSWR, { trigger } from "@zeit/swr";
import { fetchSimple } from "../../api/gamesApi";
import { appendParam } from "../../common/utils";

function CollectionsPanel({ user, initialCollections }) {
  const [showModal, setShowModal] = React.useState(false);
  let fetchUrl = ENDPOINTS.COLLECTION;

  if (user) {
    fetchUrl = appendParam(fetchUrl, { key: "user", value: user.id });
  }

  const { data: collections, error } = useSWR(fetchUrl, fetchSimple);

  const handleToggleModal = toggle => {
    setShowModal(() => toggle);
  };

  const handleCreateCollection = async title => {
    if (title.length > 0) {
      handleToggleModal(false);
      await createCollection(null, {
        id: user.id,
        name: title,
        games: []
      });
      trigger(fetchUrl);
    }
  };

  const handleDeleteCollection = async id => {
    await deleteCollection(null, { id });
    trigger(fetchUrl);
  };

  return (
    <section className="collections-panel">
      <Title header="Shelves" />
      <Grid
        data={collections || initialCollections}
        size="row"
        destRoute={ROUTES.GAMES}
        prettyRoute={ROUTES.COLLECTIONS}
        handleDelete={handleDeleteCollection}
        handlePrompt={() => handleToggleModal(true)}
      />
      <Modal
        open={showModal}
        closeText="Close"
        submitText="Submit"
        dismissModal={() => handleToggleModal(false)}
        handleSubmit={handleCreateCollection}
      >
        <BasicForm inputName="Title" />
      </Modal>
    </section>
  );
}

export default CollectionsPanel;
