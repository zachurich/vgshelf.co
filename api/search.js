import { ENDPOINTS } from "../common/routes";
import axios from "axios";

export const fetchResults = async input => {
  try {
    const { data: response } = await axios.post(ENDPOINTS.SEARCH, {
      title: input
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCover = async gameId => {
  try {
    const { data: response } = await axios.post(ENDPOINTS.COVER, {
      gameId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
