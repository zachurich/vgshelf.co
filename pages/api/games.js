import axios from "axios";

import auth0 from "../../auth.config";
import { API_ENDPOINTS } from "../../common/routes";
import { withDb, withErrors } from "../../middleware/index";

const games = async (req, res) => {
  if (req.method === "GET") {
    const result = await axios.get(...args);
    return res.send(result.data);
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
