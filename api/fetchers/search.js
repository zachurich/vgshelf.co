import axios from "axios";

import { API_ENDPOINTS } from "../../common/routes";

export const fetchResults = async (input) => {
  try {
    const { data: response } = await axios.post(API_ENDPOINTS.SEARCH, {
      title: input,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCover = async (gameId) => {
  try {
    const { data: response } = await axios.post(API_ENDPOINTS.COVER, {
      gameId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
