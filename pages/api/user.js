import { registerUser } from "../../api/usersApi";
import auth0 from "../../common/auth";
import { HTTP_STATUS } from "../../common/constants";
import { APP_ROUTES } from "../../common/routes";
import { redirect } from "../../common/utils";

export default async (req, res) => {
  try {
    const session = await auth0.getSession(req);
    if (session && session.user) {
      const { user } = session;
      const response = await registerUser({
        userId: user.sub,
        userName: user.nickname,
        emailAddress: user.name,
      });
      // if(response === NEWLY_CREATED_USER) {
      //   return redirect(res, APP_ROUTES.APP);
      // }
      return redirect(res, APP_ROUTES.APP.replace("[userName]", user.nickname));
    } else {
      await auth0.handleLogout(req, res);
      return redirect(res, APP_ROUTES.ERROR);
    }
  } catch (error) {
    await auth0.handleLogout(req, res);
    return redirect(res, APP_ROUTES.ERROR);
  }
};
