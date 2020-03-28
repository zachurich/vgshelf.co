import axios from "axios";
import auth0 from "../../../common/auth";
import { API_ENDPOINTS } from "../../../common/routes";

export default async function update(req, res) {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    try {
      const result = await axios.put(API_ENDPOINTS.COLLECTION, req.body, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return res.send(result.data);
    } catch (error) {
      throw error;
    }
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
