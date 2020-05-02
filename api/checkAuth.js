import axios from "axios";
import { API_ROUTES } from "../common/routes";

export const fetchCheckAuth = async userName => {
  try {
    const { data: response } = await axios.get(API_ROUTES.AUTH);
    return response;
  } catch (error) {
    throw error;
  }
};
