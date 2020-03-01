import get from "lodash/get";
import { escapeNull } from "../common/utils";
import { ENDPOINTS } from "../common/routes";
import axios from "axios";

export const fetchSimple = async (url, headers = {}) => {
  try {
    const { data: response } = await axios.get(url);
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByUserId = async userId => {
  try {
    const { data: response } = await axios.get(ENDPOINTS.GAME, {
      params: {
        userId
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByCollectionId = async collectionId => {
  try {
    const { data: response } = await axios.get(ENDPOINTS.GAME, {
      params: {
        collectionId
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByUserName = async userName => {
  try {
    const { data: response } = await axios.get(ENDPOINTS.GAME, {
      params: {
        userName
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const createGame = async (data, token) => {
  try {
    const result = await axios.post(ENDPOINTS.GAME, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteGame = async (data, token) => {
  try {
    const result = await axios.delete(
      ENDPOINTS.GAME,
      {
        data
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
