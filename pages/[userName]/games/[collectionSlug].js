import { mutate } from "@zeit/swr";
import _ from "lodash";
import React, { useState } from "react";

import { fetchSingleCollection, updateCollection } from "../../../api/collectionsApi";
import { fetchGamesByUserName } from "../../../api/gamesApi";
import { useFetchCollection, useParams } from "../../../common/hooks";
import useAuth from "../../../common/hooks/useAuth";
import useCheckAuth from "../../../common/hooks/useCheckAuth";
import { formatUserName, handleServerError, scrollTop } from "../../../common/utils";
import CollectionsPanel from "../../../components/collectionsPanel/collectionsPanel";
import EditCollectionPanel from "../../../components/editCollectionPanel/editCollectionPanel";
import FormControls from "../../../components/formControls/formControls";
import GamesGrid from "../../../components/gamesGrid/gamesGrid";
import { Meta } from "../../../components/index";
import Modal from "../../../components/modal/modal";

const Games = ({
  initialGames = [],
  initialCollection = {},
  initialCollections = [],
}) => {
  const user = useAuth();
  const { userName, collectionSlug } = useParams();
  const { data: collection, finalUrl } = useFetchCollection(initialCollection);
  const [showModal, setShowModal] = useState(false);
  const { performAuthCheck } = useCheckAuth();
  const [collectionTitle, setCollectionTitle] = useState(collection.title);
  const [gamesToggled, setGamesToggled] = useState(collection.games);

  const handleToggleModal = async (toggle) => {
    const authed = await performAuthCheck();
    if (!authed) return;
    if (collectionSlug) {
      scrollTop();
      setShowModal(() => toggle || !showModal);
    }
  };

  const handleSubmitChanges = async (e, title, games) => {
    e.preventDefault();

    // Compose array with added/removed game'
    console.log(finalUrl);
    mutate(finalUrl, { ...collection, title, games }, false);
    // Fire and forget the server request
    try {
      await updateCollection({
        newName: title,
        userName,
        collectionSlug,
        games,
      });
    } catch (error) {
      console.log(_.get(e, "response.data"));
    }

    handleToggleModal(false);
  };

  return (
    <>
      <main className="main games with-sidebar">
        <Meta title={"Games"} />
        {/* This component should contain all games IN THE CURRENT COLLECTION */}
        <GamesGrid
          title={`${collection.title} Shelf` || `${formatUserName(user)}'s Games`}
          user={user}
          userName={userName}
          collectionId={collectionSlug}
          parentControlled={true}
          games={collection.games}
          showTogglePanel={showModal}
          handlePrompt={handleToggleModal}
        />
        <Modal
          open={collectionSlug && showModal && user}
          dismissModal={() => handleToggleModal(false)}
          header={"Edit Shelf"}
          content={() => (
            <EditCollectionPanel
              user={user}
              collection={collection}
              initialGames={initialGames}
              title={[collectionTitle, setCollectionTitle]}
              toggled={[gamesToggled, setGamesToggled]}
            />
          )}
          footer={() => (
            <FormControls
              handleDismiss={() => handleToggleModal(false)}
              closeText={"Cancel"}
              disabled={
                collection.games === gamesToggled && collection.title === collectionTitle
              }
              submitText={"Submit"}
              handleSubmit={(e) => handleSubmitChanges(e, collectionTitle, gamesToggled)}
            />
          )}
        />
      </main>
      <CollectionsPanel user={user} initialCollections={initialCollections} />
    </>
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
        userName,
      });
      const { games: initialGames } = await fetchGamesByUserName(userName);
      return {
        initialGames,
        initialCollection,
      };
    } catch (e) {
      return handleServerError(e, res);
    }
  }
  return {};
};

export default Games;
