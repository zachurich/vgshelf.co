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
import Loader from "../loader/loader";
import { ButtonToggle } from "../buttons/buttons";

function CollectionsPanel({ user, initialCollections, userName }) {
  const [showModal, setShowModal] = React.useState(false);
  const { data: collections, error, finalUrl } = useDataFetch(
    { user: get(user, "id"), userName },
    ENDPOINTS.COLLECTION,
    "",
    initialCollections
  );

  const handleToggleModal = toggle => {
    setShowModal(() => toggle || !showModal);
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
      <Title header={user ? "Shelves" : `${userName} Shelves`} color="pink">
        {!!user && <ButtonToggle handleToggle={() => handleToggleModal(true)} />}
      </Title>
      {!collections ? (
        <Loader />
      ) : (
        <List
          data={collections || initialCollections}
          destRoute={ROUTES.GAMES}
          handleDelete={handleDeleteCollection}
          handlePrompt={() => handleToggleModal(true)}
          canAdd={!!user}
        />
      )}
      <Modal open={showModal} dismissModal={() => handleToggleModal(false)}>
        <BasicForm
          inputName="Create a Shelf"
          placeholder="Shelf Name"
          handleSubmit={handleCreateCollection}
          handleDismiss={() => handleToggleModal(false)}
          closeText="Cancel"
          submitText="Add Shelf"
        />
      </Modal>
    </section>
  );
}

export default CollectionsPanel;
