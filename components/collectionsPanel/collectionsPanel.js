import React, { useState } from "react";
import Modal from "../modal/modal";
import { BasicForm } from "../basicForm/basicForm";
import { APP_ROUTES } from "../../common/routes";
import { createCollection, deleteCollection } from "../../api/collectionsApi";
import Title from "../title/title";
import List from "../list/list";
import Loader from "../loader/loader";
import { ButtonToggle } from "../buttons/buttons";

import "./collectionsPanel.scss";

function CollectionsPanel({
  user,
  collections,
  userName,
  isLoading,
  fetchKey,
  refreshData = () => {}
}) {
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = toggle => {
    setShowModal(() => toggle || !showModal);
  };

  const handleCreateCollection = async title => {
    if (title.length > 0) {
      handleToggleModal(false);
      await createCollection({
        userId: user.sub,
        collectionName: title,
        games: []
      });
      refreshData();
    }
  };

  const handleDeleteCollection = async id => {
    await deleteCollection({ id });
    refreshData();
  };

  return (
    <section className="collections-panel">
      <Title header={user ? "Shelves" : `${userName} Shelves`} color="pink">
        {!!user && <ButtonToggle handleToggle={() => handleToggleModal(true)} />}
      </Title>
      {isLoading ? (
        <Loader />
      ) : (
        <List
          data={collections}
          destRoute={APP_ROUTES.GAMES}
          userName={userName}
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
