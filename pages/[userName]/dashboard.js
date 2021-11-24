import _ from 'lodash';
import React, { Fragment } from 'react';

import { fetchGamesByUserName } from '../../api/gamesApi';
import { useCollectionsFetch } from '../../common/hooks';
import useAuth from '../../common/hooks/useAuth';

import useGamesFetchByUserName from '../../common/hooks/useGameFetchByUserName';

import { handleServerError } from '../../common/utils';
import CollectionsPanel from '../../components/collectionsPanel/collectionsPanel';
import GamesPanel from '../../components/gamesPanel/gamesPanel';
import { Meta } from '../../components/index';

const Dashboard = ({ initialGames = [], initialCollections = [] }) => {
  const user = useAuth();
  const {
    data: games,
    finalUrl: gamesCacheKey,
    isLoading: isGamesLoading,
  } = useGamesFetchByUserName(initialGames);

  const {
    data: collections,
    finalUrl: collectionsCacheKey,
    isLoading: isCollectionsLoading,
  } = useCollectionsFetch(initialCollections);

  // useCheckRegisteredUser();

  return (
    <Fragment>
      <main className="main dashboard with-sidebar">
        <Meta title={'Dashboard'} />
        <GamesPanel
          user={user}
          games={games}
          gamesCacheKey={gamesCacheKey}
          isGamesLoading={isGamesLoading}
        />
      </main>
      <CollectionsPanel
        user={user}
        collections={collections}
        collectionsCacheKey={collectionsCacheKey}
        isCollectionsLoading={isCollectionsLoading}
      />
    </Fragment>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  if (req) {
    const { userName } = query;
    try {
      const initialGames = await fetchGamesByUserName(userName);
      return {
        props: {
          initialGames,
        },
      };
    } catch (e) {
      return handleServerError(e, res);
    }
  }
  return { props: {} };
};

export default Dashboard;
