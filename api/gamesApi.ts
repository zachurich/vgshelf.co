import axios from 'axios';
import get from 'lodash/get';

import { API_ENDPOINTS, API_ROUTES } from '../common/routes';
import { escapeNull } from '../common/utils';

// fetcher to use for any client-side GETs using useSWR
export const fetcher = async (url, headers = {}) => {
  const { data: response } = await axios.get(url);
  return escapeNull(get(response, 'data'), []);
};

export const fetchGames = async (params) => {
  const { userName, ...restParams } = params;
  try {
    const { data: response } = await axios.get(
      `${API_ENDPOINTS.GAME}/${userName}`,
      {
        params: restParams,
      },
    );
    return escapeNull(get(response, 'data'), []);
  } catch (error) {
    console.log('ERROR IN fetchGames', e);
    throw error;
  }
};

// calls for server-side fetching
export const fetchGamesByUserId = async (userId) => {
  const data = await fetchGames({ userId });
  return data;
};

export const fetchGamesUserNameCollectionSlug = async (
  collectionSlug,
  userName,
) => {
  const data = await fetchGames({
    collectionSlug,
    userName,
  });
  return data;
};

export const fetchGamesByUserName = async (userName) => {
  const data = await fetchGames({
    userName,
  });
  return data;
};

export const fetchGameBySlug = async (gameSlug) => {
  const data = await fetchGames({
    gameSlug,
  });
  return data;
};

export const createGame = async ({ userId, title, igdbId, slug, imageUrl }) => {
  const result = await axios.post(API_ROUTES.GAME, {
    userId,
    title,
    igdbId,
    slug,
    imageUrl,
  });
  return result;
};

export const deleteGame = async ({ gameId, userId }) => {
  const result = await axios.delete(API_ROUTES.GAME, {
    data: { gameId, userId },
  });
  return result;
};
