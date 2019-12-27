import get from "lodash/get";
import React from "react";
import Grid from "../grid/grid";
import Modal from "../modal/modal";
import { BasicForm } from "../basicForm/basicForm";
import { ROUTES, ENDPOINTS } from "../../../common/routes";
import {
  fetchCollections,
  createCollection,
  deleteCollection
} from "../../api/collectionsApi";
import Title from "../title/title";
import { trigger } from "@zeit/swr";
import List from "../list/list";
import "./collectionsPanel.scss";
import { useDataFetch } from "../../common/hooks";

function CollectionsPanel({ user, initialCollections, userName }) {
  const [showModal, setShowModal] = React.useState(false);
  let fetchUrl = ENDPOINTS.COLLECTION;
  const { data: collections, error, finalUrl } = useDataFetch(
    { user: get(user, "id"), userName },
    fetchUrl
  );

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
      trigger(finalUrl);
    }
  };

  const handleDeleteCollection = async id => {
    await deleteCollection(null, { id });
    trigger(finalUrl);
  };

  return (
    <section className="collections-panel">
      <Title header={user ? "Shelves" : `${userName} Shelves`} />
      <List
        data={collections || initialCollections}
        destRoute={ROUTES.GAMES}
        handleDelete={handleDeleteCollection}
        handlePrompt={() => handleToggleModal(true)}
        canAdd={!!user}
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
