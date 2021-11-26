import axios from 'axios';

import { API_ENDPOINTS, API_ROUTES } from '../common/routes';

export const fetchCollectionsByUserName = async (userName) => {
  const { data: response } = await axios.get(API_ENDPOINTS.COLLECTION, {
    params: {
      userName,
    },
  });
  return response.data;
};

export const fetchSingleCollection = async ({ userName, collectionSlug }) => {
  const { data: response } = await axios.get(API_ENDPOINTS.COLLECTION, {
    params: {
      userName,
      collectionSlug,
    },
  });
  return response.data;
};

export const createCollection = async ({ userId, collectionName, games }) => {
  const result = await axios.post(API_ROUTES.COLLECTION, {
    userId,
    collectionName,
    games,
  });
  return result;
};

export const deleteCollection = async ({ collectionId }) => {
  const result = await axios.delete(API_ROUTES.COLLECTION, {
    data: { collectionId },
  });
  return result;
};

export const updateCollection = async (data, headers = {}) => {
  const result = await axios.put(API_ROUTES.COLLECTION, data, headers);
  return result;
};
