import get from "lodash/get";
import React from "react";
import { Meta } from "../../components/index";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import { fetchGamesByUserName } from "../../api/gamesApi";
import GamesPanel from "../../components/gamesPanel/gamesPanel";
import { trigger, mutate } from "@zeit/swr";
import { fetchCollectionsByUserName } from "../../api/collectionsApi";
import { useParams, useCollectionsFetch } from "../../common/hooks";
import useGamesFetchByUserName from "../../common/hooks/useGameFetchByUserName";
import useModal from "../../common/hooks/useModal";
import Modal from "../../components/modal/modal";

const Dashboard = ({ user, initialGames = [], initialCollections = [] }) => {
  const { userName } = useParams();
  const {
    data: games,
    finalUrl: gamesUrl,
    isLoading: isGamesLoading
  } = useGamesFetchByUserName(initialGames);
  const {
    data: collections,
    finalUrl: collectionsUrl,
    isLoading: isCollectionsLoading
  } = useCollectionsFetch(initialCollections);
  const { showModal, setShowModal, modalContent, setModalContent } = useModal();
  return (
    <div className="dashboard">
      <Meta title={"Dashboard"} />
      <main className="main">
        <GamesPanel
          user={user}
          userName={userName}
          games={games}
          isLoading={isGamesLoading}
          fetchKey={gamesUrl}
          showModal={showModal}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          refreshData={data => {
            mutate(gamesUrl, { games: data });
          }}
        />
      </main>
      <section className="panel-right">
        <CollectionsPanel
          user={user}
          userName={userName}
          collections={collections}
          isLoading={isCollectionsLoading}
          fetchKey={collectionsUrl}
          showModal={showModal}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          refreshData={() => trigger(collectionsUrl)}
        />
      </section>

      <Modal
        open={showModal}
        dismissModal={() => setShowModal(false)}
        header={modalContent.header}
      >
        {modalContent.component}
      </Modal>
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Dashboard.getInitialProps = async ({ req, query }) => {
  if (req) {
    const { userName } = query;
    console.log(query);
    try {
      const { games: initialGames } = await fetchGamesByUserName(userName);
      const initialCollections = await fetchCollectionsByUserName(userName);
      return { initialGames, initialCollections };
    } catch (e) {
      // console.log(e);
    }
  }
  return {};
};

export default Dashboard;
