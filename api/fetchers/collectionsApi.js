import axios from "axios";

import { API_ENDPOINTS, API_ROUTES } from "../../common/routes";

export const fetchCollectionsByUserName = async (userName) => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.COLLECTION, {
      params: {
        userName,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSingleCollection = async ({ userName, collectionSlug }) => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.COLLECTION, {
      params: {
        userName,
        collectionSlug,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCollection = async ({ userId, collectionName, games }) => {
  try {
    const result = await axios.post(API_ROUTES.COLLECTION, {
      userId,
      collectionName,
      games,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async ({ collectionId }) => {
  try {
    const result = await axios.delete(API_ROUTES.COLLECTION, {
      data: { collectionId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (data, headers = {}) => {
  try {
    const result = await axios.put(API_ROUTES.COLLECTION, data, headers);
    return result;
  } catch (error) {
    throw error;
  }
};
