import axios from "axios";
import _ from "lodash";

import { API_ENDPOINTS, API_ROUTES } from "../common/routes";

export const registerUser = async ({ userName }) => {
  try {
    const { data: response } = await axios.post(API_ROUTES.REGISTER, {
      userName,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerDBUser = async ({ userId, userName, emailAddress }) => {
  try {
    const { data: response } = await axios.post(API_ENDPOINTS.REGISTER, {
      userId,
      userName,
      emailAddress,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkDBUser = async ({ userId }) => {
  try {
    const { data: response } = await axios.get(API_ENDPOINTS.USER, {
      params: { userId },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
