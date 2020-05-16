import _ from "lodash";
import axios from "axios";
import { API_ENDPOINTS } from "../common/routes";

export const registerUser = async ({ userId, username, emailAddress }) => {
  try {
    const { data: response } = await axios.post(API_ENDPOINTS.USER, {
      userId,
      username,
      emailAddress,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
