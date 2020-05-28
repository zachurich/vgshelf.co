import axios from "axios";
import get from "lodash/get";

import { API_ENDPOINTS, API_ROUTES } from "../common/routes";
import { escapeNull } from "../common/utils";

// fetcher to use for any client-side GETs using useSWR
export const fetcher = async (url, headers = {}) => {
  try {
    const { data: response } = await axios.get(url);
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGames = async (params) => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.GAME, {
      params,
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

// calls for server-side fetching
export const fetchGamesByUserId = async (userId) => {
  try {
    const data = await fetchGames({ userId });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchGamesUserNameCollectionSlug = async (collectionSlug, userName) => {
  try {
    const data = await fetchGames({
      collectionSlug,
      userName,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByUserName = async (userName) => {
  try {
    const data = await fetchGames({
      userName,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchGameBySlug = async (gameSlug) => {
  try {
    const data = await fetchGames({
      gameSlug,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createGame = async ({ userId, title, igdbId, slug, imageUrl }) => {
  try {
    const result = await axios.post(API_ROUTES.GAME, {
      userId,
      title,
      igdbId,
      slug,
      imageUrl,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteGame = async ({ gameId, userId }) => {
  try {
    const result = await axios.delete(API_ROUTES.GAME, {
      data: { gameId, userId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
