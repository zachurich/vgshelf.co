import { ENDPOINTS } from "../common/routes";
import axios from "axios";

export const fetchCollectionsByUserId = async userId => {
  try {
    const { data: response } = await axios.get(ENDPOINTS.COLLECTION, {
      params: {
        user: userId
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCollection = async data => {
  try {
    const result = await axios.post(ENDPOINTS.COLLECTION, data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async data => {
  try {
    const result = await axios.delete(ENDPOINTS.COLLECTION, {
      data
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (data, headers = {}) => {
  try {
    const result = await axios.put(ENDPOINTS.COLLECTION, data, headers);
    return result;
  } catch (error) {
    throw error;
  }
};
