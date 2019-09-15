import React from "react";
import { Nav, Meta } from "../components/index";
import Grid from "../components/grid/grid";
import axios from "axios";
import { ENDPOINTS } from "../common/constants";
import { createUrl } from "../common/utils";

import "../styles/index.css";
import Modal from "../components/modal/modal";
import Title from "../components/title/title";
import { fetchCollections } from "../common/api";

const Collections = ({ initialCollections = [] }) => {
  const [collections, setCollections] = React.useState(initialCollections);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const handleToggleModal = (toggle, e) => {
    setShowModal(() => toggle);
  };

  const handleCreateCollection = async () => {
    const result = await axios.post(createUrl(null, ENDPOINTS.COLLECTION), {
      id: "12345678",
      name: title,
      games: []
    });
    const newCollections = await fetchCollections(null);
    setCollections(() => newCollections);
  };

  return (
    <div>
      <Meta title={"Collections"} />
      <Nav />
      <Title header={"Collections"} />
      <Grid
        data={collections}
        size="large"
        handlePrompt={() => handleToggleModal(true)}
      />
      <Modal
        open={showModal}
        closeText="Close"
        submitText="Submit"
        dismissModal={() => handleToggleModal(false)}
        handleSubmit={handleCreateCollection}
      >
        <form>
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

Collections.getInitialProps = async ({ req }) => {
  try {
    const collections = await fetchCollections(req);
    return { initialCollections: collections };
  } catch (e) {
    throw e;
  }
  return { data: {} };
};

export default Collections;
