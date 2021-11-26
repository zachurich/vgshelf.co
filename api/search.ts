import { API_ENDPOINTS } from '../common/routes';
import axios from 'axios';

export const fetchResults = async (input) => {
  const { data: response } = await axios.post(API_ENDPOINTS.SEARCH, {
    title: input,
  });
  return response.data;
};

export const fetchCover = async (gameId) => {
  const { data: response } = await axios.post(API_ENDPOINTS.COVER, {
    gameId,
  });
  return response.data;
};
