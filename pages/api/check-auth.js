import { checkDBUser } from "../../api/usersApi";
import { ERROR_CODES } from "../../common/constants";

export default async function checkAuth(req, res) {
  try {
    // Just try and see if we can get an access token
    const { user } = await auth0.getSession(req);
    const tokenCache = await auth0.tokenCache(req, res);
    await tokenCache.getAccessToken();
    const { data } = await checkDBUser({
      userId: user.sub,
    });

    if (user && data.userName) {
      return res.send({
        status: 200,
        msg: "Authorized!",
        data: { userName: data.userName },
      });
    } else {
      throw { code: 500, message: "Something went wrong." };
    }
  } catch (error) {
    // if not, we aren't authed
    if (error.code === ERROR_CODES.NOT_AUTHED) {
      const code = 401;
      res.status(code);
      res.send({
        status: code,
        msg: error.message,
      });
    } else {
      const code = error.status || 500;
      res.status(code);
      res.send({
        status: code,
        msg: error.message,
      });
    }
  }
}
