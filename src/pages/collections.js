import _ from "lodash";
import React from "react";
import {
  createCollection,
  deleteCollection,
  fetchCollections
} from "../api/collectionsApi";
import { ROUTES } from "../../common/routes";
import { formatUserName } from "../common/utils";
import Grid from "../components/grid/grid";
import { Meta } from "../components/index";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";
import { BasicForm } from "../components/basicForm/basicForm";

const Collections = ({ initialCollections = [], user }) => {
  const [collections, setCollections] = React.useState(initialCollections);
  const [showModal, setShowModal] = React.useState(false);
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
      await updateCollectionsState();
    }
  };

  const handleDeleteCollection = async id => {
    await deleteCollection(null, { id });
    await updateCollectionsState();
  };

  const updateCollectionsState = async () => {
    const collections = await fetchCollections(null, user.id);
    setCollections(() => collections);
  };

  React.useEffect(() => {
    if (collections.length < 1 && user) {
      updateCollectionsState();
    }
  }, [user]);

  return (
    <div className="collections">
      <Meta title={"Shelves"} />
      <Title header={"Shelves"} />
      <Grid
        data={collections}
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
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Collections.getInitialProps = async ({ req, res }) => {
  const userId = _.get(req, "user.id", null);
  if (req && userId) {
    try {
      const collections = await fetchCollections(req, userId);
      return { collections };
    } catch (e) {
      console.log(e);
    }
  }
};

export default Collections;
