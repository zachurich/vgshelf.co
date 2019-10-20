import _ from "lodash";
import React from "react";
import {
  createCollection,
  deleteCollection,
  fetchCollections
} from "../api/collectionsApi";
import { ROUTES } from "../common/constants";
import { formatUserName } from "../common/utils";
import Grid from "../components/grid/grid";
import { Meta } from "../components/index";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";

const Collections = ({ initialCollections = [], user }) => {
  const [collections, setCollections] = React.useState(initialCollections);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const handleToggleModal = toggle => {
    setShowModal(() => toggle);
    setTitle(() => "");
  };

  const handleCreateCollection = async () => {
    if (title.length > 0) {
      handleToggleModal(false);
      await createCollection(null, {
        id: user.id,
        name: title,
        games: []
      });
      await updateCollectionsState();
      setTitle(() => "");
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
    <div>
      <Meta title={"Collections"} />
      <Title header={`${formatUserName(user)}'s Collections`} />
      <Grid
        data={collections}
        size="large"
        destRoute={ROUTES.GAMES}
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
        <form className="mb-6 w-full" onSubmit={handleCreateCollection}>
          <label className="block mb-2" htmlFor="collection-title">
            Title
          </label>
          <input
            className="shadow rounded w-full appearance-none border py-2 px-3 leading-tight text-base"
            name="collection-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </form>
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
