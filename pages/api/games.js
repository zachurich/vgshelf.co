import axios from "axios";

import auth0 from "../../common/auth";
import { ERROR_CODES } from "../../common/constants";
import { API_ENDPOINTS } from "../../common/routes";

export default async (req, res) => {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({});
    const args = [
      API_ENDPOINTS.GAME,
      req.body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    ];
    try {
      if (req.method === "POST") {
        const result = await axios.post(...args);
        return res.send(result.data);
      }
      if (req.method === "DELETE") {
        const result = await axios.delete(...args);
        return res.send(result.data);
      }
      if (req.method === "PUT") {
        const result = await axios.put(...args);
        return res.send(result.data);
      }
      throw "That method isn't supported!";
    } catch (error) {
      throw error;
    }
  } catch (error) {
    if (error.code === ERROR_CODES.NOT_AUTHED) {
      res.status(401).end(error.message);
    } else {
      res.status(error.status || 500).end(error.message);
    }
  }
};
