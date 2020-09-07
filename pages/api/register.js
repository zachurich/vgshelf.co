import { registerDBUser } from "../../api/fetchers/usersApi";
import auth0 from "../../auth.config";
import { HTTP_STATUS } from "../../common/constants";
import { APP_ROUTES } from "../../common/routes";
import { isGoodResponse, redirect } from "../../common/utils";

export default async function register(req, res) {
  const { userName } = req.body;
  try {
    const session = await auth0.getSession(req);
    if (session && session.user) {
      const { user } = session;
      const response = await registerDBUser({
        userId: user.sub,
        userName,
        emailAddress: user.name,
      });
      if (isGoodResponse(response)) {
        res.send(response);
      } else {
        throw response;
      }
    } else {
      throw { msg: "Not authorized!", code: 500 };
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(409).send(error);
  }
}
