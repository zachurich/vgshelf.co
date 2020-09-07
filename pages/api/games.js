import axios from "axios";

import getGames from "../../api/handlers/games/getGames";
import { handleResponse } from "../../api/handlers/utils";
import auth0 from "../../auth.config";
import { API_ENDPOINTS } from "../../common/routes";
import { withDb, withErrors, withHttpMethods } from "../../middleware/index";

const games = async (req, res) => {
  if (req.method === "GET") {
    const data = await getGames(req.query);
    handleResponse(res, data);
  } else {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({});
    const args = [
      API_ENDPOINTS.GAME,
      req.body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    ];
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
  }
};

export default withErrors(withDb(games));
