import _ from "lodash";
import React, { useState, useEffect, useContext } from "react";
import { mutate } from "@zeit/swr";
import { Meta } from "../../../components/index";
import { fetchGamesByUserName } from "../../../api/gamesApi";
import EditCollectionPanel from "../../../components/editCollectionPanel/editCollectionPanel";
import { updateCollection, fetchSingleCollection } from "../../../api/collectionsApi";
import GamesPanel from "../../../components/gamesPanel/gamesPanel";
import {
  formatUserName,
  toggleItemInArray,
  scrollTop,
  redirect,
  handleServerError
} from "../../../common/utils";
import { useParams, useFetchCollection } from "../../../common/hooks";
import Modal from "../../../components/modal/modal";
import useCheckAuth from "../../../common/hooks/useCheckAuth";

import "../../../styles/games.scss";
import { APP_ROUTES } from "../../../common/routes";

const Games = ({ user, initialGames = [], initialCollection = {} }) => {
  const { userName, collectionSlug } = useParams();
  const { data: collection, finalUrl } = useFetchCollection(initialCollection);
  const [showModal, setShowModal] = useState(false);
  const { performAuthCheck } = useCheckAuth();

  const handleToggleModal = async toggle => {
    const authed = await performAuthCheck();
    if (!authed) return;
    if (collectionSlug) {
      scrollTop();
      setShowModal(() => toggle || !showModal);
    }
  };

  const handleSubmitChanges = async (e, title, games) => {
    e.preventDefault();

    // Compose array with added/removed game
    mutate(finalUrl, { ...collection, title, games }, false);
    // Fire and forget the server request
    try {
      await updateCollection({
        newName: title,
        userName,
        collectionSlug,
        games
      });
    } catch (error) {
      console.log(_.get(e, "response.data"));
    }

    handleToggleModal(false);
  };

  return (
    <main className="games">
      <Meta title={"Games"} />
      <div className="games-panel-wrapper container">
        {/* This component should contain all games IN THE CURRENT COLLECTION */}
        <GamesPanel
          title={`${collection.title} Shelf` || `${formatUserName(user)}'s Games`}
          user={user}
          userName={userName}
          collectionId={collectionSlug}
          parentControlled={true}
          games={collection.games}
          showTogglePanel={showModal}
          handlePrompt={handleToggleModal}
        />
      </div>
      <Modal
        open={collectionSlug && showModal && user}
        dismissModal={() => handleToggleModal(false)}
        header={"Edit Shelf"}
      >
        <EditCollectionPanel
          user={user}
          collection={collection}
          initialGames={initialGames}
          handleClosePanel={() => handleToggleModal(false)}
          handleSubmitChanges={handleSubmitChanges}
        />
      </Modal>
    </main>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Games.getInitialProps = async ({ req, res, query }) => {
  if (req) {
    const { collectionSlug, userName } = query;
    try {
      const initialCollection = await fetchSingleCollection({
        collectionSlug,
        userName
      });
      const { games: initialGames } = await fetchGamesByUserName(userName);
      return {
        initialGames,
        initialCollection
      };
    } catch (e) {
      return handleServerError(e, res);
    }
  }
  return {};
};

export default Games;
