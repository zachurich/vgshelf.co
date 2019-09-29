import _ from "lodash";

import React from "react";
import { Nav, Meta } from "../components/index";
import Grid from "../components/grid/grid";

import "../styles/index.css";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";
import {
  fetchCollections,
  createCollection,
  deleteCollection
} from "../api/collectionsApi";
import Router from "next/router";

const Collections = ({ initialCollections = [], user }) => {
  const [collections, setCollections] = React.useState(initialCollections);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const handleToggleModal = toggle => {
    setShowModal(() => toggle);
  };

  const handleCreateCollection = async () => {
    handleToggleModal(false);
    await createCollection(null, {
      id: user.id,
      name: title,
      games: []
    });
    const newCollections = await fetchCollections(null, user.id);
    setCollections(() => newCollections);
  };

  const handleDeleteCollection = async id => {
    await deleteCollection(null, { id });
    const newCollections = await fetchCollections(null, user.id);
    setCollections(() => newCollections);
  };

  React.useEffect(() => {
    const fetchInitialCollections = async () => {
      const collections = await fetchCollections(null, user.id);
      setCollections(() => collections);
    };
    if (collections.length < 1 && user) {
      fetchInitialCollections();
    }
  }, [user]);

  return (
    <div>
      <Meta title={"Collections"} />
      <Title header={"Collections"} />
      <Grid
        data={collections}
        size="large"
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
        <form onSubmit={handleCreateCollection}>
          <input
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
      if (res) {
        res.writeHead(302, {
          Location: "/"
        });
        res.end();
      }
    }
  }
};

export default Collections;
