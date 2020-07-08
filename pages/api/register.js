import { registerUser } from "../../api/usersApi";
import auth0 from "../../common/auth";
import { HTTP_STATUS } from "../../common/constants";
import { APP_ROUTES } from "../../common/routes";
import { redirect } from "../../common/utils";

export default async function register(req, res) {
  const { userName } = req.body;
  try {
    const session = await auth0.getSession(req);
    if (session && session.user) {
      const { user } = session;
      const response = await registerUser({
        userId: user.sub,
        userName,
        emailAddress: user.name,
      });
      return redirect(res, APP_ROUTES.APP.replace("[userName]", user.nickname));
    } else {
      return redirect(res, APP_ROUTES.ERROR);
    }
  } catch (error) {
    return redirect(res, APP_ROUTES.ERROR);
  }
}
