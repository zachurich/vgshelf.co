import { createUrl } from "../common/utils";
import { ENDPOINTS } from "../common/constants";
import axios from "axios";

export const fetchGames = async (req, userId, collectionId = "") => {
  try {
    const { data: response } = await axios.get(createUrl(req, ENDPOINTS.GAME), {
      params: {
        user: userId,
        ...(collectionId && { collection: collectionId })
      }
    });
    return response.data;
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
