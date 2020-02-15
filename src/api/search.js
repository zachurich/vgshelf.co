import { createUrl } from "../common/utils";
import { ENDPOINTS } from "../../common/routes";
import axios from "axios";

export const fetchResults = async (req, input) => {
  try {
    const { data: response } = await axios.post(createUrl(req, ENDPOINTS.SEARCH), {
      title: input
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCover = async (req, input) => {
  try {
    const { data: response } = await axios.post(createUrl(req, ENDPOINTS.COVER), {
      id: input
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
