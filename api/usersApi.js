import axios from "axios";
import _ from "lodash";

import { API_ENDPOINTS } from "../common/routes";

export const registerUser = async ({ userId, userName, emailAddress }) => {
  try {
    const { data: response } = await axios.post(API_ENDPOINTS.USER, {
      userId,
      userName,
      emailAddress,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
