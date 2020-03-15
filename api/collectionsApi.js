import { API_ENDPOINTS, API_ROUTES } from "../common/routes";
import axios from "axios";

export const fetchCollectionsByUserName = async userName => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.COLLECTION, {
      params: {
        userName
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCollection = async data => {
  try {
    const result = await axios.post(API_ROUTES.COLLECTION + "/create", data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async data => {
  try {
    const result = await axios.delete(API_ROUTES.COLLECTION + "/remove", {
      data
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (data, headers = {}) => {
  try {
    const result = await axios.put(API_ROUTES.COLLECTION + "/update", data, headers);
    return result;
  } catch (error) {
    throw error;
  }
};
