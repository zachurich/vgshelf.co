import axios from "axios";
import _ from "lodash";

import { API_ENDPOINTS, API_ROUTES } from "../common/routes";

export const registerUser = async ({ userName }) => {
  const { data: response } = await axios.post(API_ROUTES.REGISTER, {
    userName,
  });
  return response;
};

export const registerDBUser = async ({ userId, userName, emailAddress }) => {
  const { data: response } = await axios.post(API_ENDPOINTS.REGISTER, {
    userId,
    userName,
    emailAddress,
  });
  return response;
};

export const checkDBUser = async ({ userId }) => {
  const { data: response } = await axios.get(API_ENDPOINTS.USER, {
    params: { userId },
  });
  return response;
};
