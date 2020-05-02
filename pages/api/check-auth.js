import auth0 from "../../common/auth";
import { ERROR_CODES } from "../../common/constants";

export default async (req, res) => {
  try {
    // Just try and see if we can get an access token
    const tokenCache = await auth0.tokenCache(req, res);
    await tokenCache.getAccessToken();
    return res.send({ status: 200, msg: "Authorized!" });
  } catch (error) {
    // if not, we aren't authed
    if (error.code === ERROR_CODES.NOT_AUTHED) {
      const code = 401;
      res.status(code);
      res.send({
        status: code,
        msg: error.message
      });
    } else {
      const code = error.status || 500;
      res.status(code);
      res.send({
        status: code,
        msg: error.message
      });
    }
  }
};
