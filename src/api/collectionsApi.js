import { createUrl } from "../common/utils";
import { ENDPOINTS } from "../common/constants";
import axios from "axios";

export const fetchCollections = async (req, userId) => {
  try {
    const { data: response } = await axios.get(createUrl(req, ENDPOINTS.COLLECTION), {
      params: {
        user: userId
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCollection = async (req, data) => {
  try {
    const result = await axios.post(createUrl(req, ENDPOINTS.COLLECTION), data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async (req, data) => {
  try {
    const result = await axios.delete(createUrl(req, ENDPOINTS.COLLECTION), {
      data
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (req, data) => {
  try {
    const result = await axios.put(createUrl(req, ENDPOINTS.COLLECTION), data);
    return result;
  } catch (error) {
    throw error;
  }
};
