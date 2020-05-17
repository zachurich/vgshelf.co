import auth0 from "../../common/auth";
import { registerUser } from "../../api/usersApi";
import { HTTP_STATUS } from "../../common/constants";
import { APP_ROUTES } from "../../common/routes";
import { redirect } from "../../common/utils";

export default async function user(req, res) {
  try {
    const session = await auth0.getSession(req);
    if (session && session.user) {
      const { user } = session;
      const response = await registerUser({
        userId: user.sub,
        username: user.nickname,
        emailAddress: user.name,
      });
      return redirect(res, APP_ROUTES.APP);
    } else {
      await auth0.handleLogout(req, res);
      return redirect(res, APP_ROUTES.ERROR);
    }
  } catch (error) {
    console.log(error);
    await auth0.handleLogout(req, res);
    return redirect(res, APP_ROUTES.ERROR);
  }
}
