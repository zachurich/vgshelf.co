import get from "lodash/get";
import { createUrl, escapeNull } from "../common/utils";
import { ENDPOINTS } from "../common/routes";
import axios from "axios";

export const fetchSimple = async url => {
  try {
    const { data: response } = await axios.get(createUrl(null, url));
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByUserId = async (req, userId) => {
  try {
    const { data: response } = await axios.get(createUrl(req, ENDPOINTS.GAME), {
      params: {
        userId
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByCollectionId = async (req, collectionId) => {
  try {
    const { data: response } = await axios.get(createUrl(req, ENDPOINTS.GAME), {
      params: {
        collectionId
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByUserName = async (req, userName) => {
  try {
    const { data: response } = await axios.get(createUrl(req, ENDPOINTS.GAME), {
      params: {
        userName
      }
    });
    return escapeNull(get(response, "data"), []);
  } catch (error) {
    throw error;
  }
};

export const createGame = async (req, data) => {
  try {
    const result = await axios.post(createUrl(req, ENDPOINTS.GAME), data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteGame = async (req, data) => {
  try {
    const result = await axios.delete(createUrl(req, ENDPOINTS.GAME), {
      data
    });
    return result;
  } catch (error) {
    throw error;
  }
};
