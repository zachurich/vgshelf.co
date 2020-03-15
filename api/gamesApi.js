import get from "lodash/get";
import { escapeNull } from "../common/utils";
import { API_ENDPOINTS, API_ROUTES } from "../common/routes";
import axios from "axios";

// fetcher to use for any client-side GETs using useSWR
export const fetcher = async (url, headers = {}) => {
  try {
    const { data: response } = await axios.get(url);
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

// calls for server-side fetching
export const fetchGamesByUserId = async userId => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.GAME, {
      params: {
        userId
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesUserNameCollectionSlug = async (collectionSlug, userName) => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.GAME, {
      params: {
        collectionSlug,
        userName
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByUserName = async userName => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.GAME, {
      params: {
        userName
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const createGame = async data => {
  try {
    const result = await axios.post(API_ROUTES.GAME + "/create", data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteGame = async data => {
  try {
    const result = await axios.delete(API_ROUTES.GAME + "/remove", {
      data
    });
    return result;
  } catch (error) {
    throw error;
  }
};
