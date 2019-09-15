import { createUrl } from "./utils";
import { ENDPOINTS } from "./constants";
import axios from "axios";

export const fetchCollections = async req => {
  try {
    const { data: response } = await axios.get(createUrl(req, ENDPOINTS.COLLECTION), {
      params: {
        id: "5d65da7d727d033d041cf6b7",
        user: "5d55fc7312a75609e98b7295"
      }
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
