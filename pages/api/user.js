import { checkDBUser, registerUser } from "../../api/usersApi";
import auth0 from "../../common/auth";
import { HTTP_STATUS } from "../../common/constants";
import { APP_ROUTES } from "../../common/routes";
import { redirect } from "../../common/utils";

export default async function user(req, res) {
  try {
    const session = await auth0.getSession(req);
    if (session && session.user) {
      const { user } = session;
      const { code, data } = await checkDBUser({
        userId: user.sub,
      });

      if (code === HTTP_STATUS.OK) {
        return redirect(res, APP_ROUTES.APP.replace("[userName]", data.userName));
      } else if (code === HTTP_STATUS.MISSING) {
        return redirect(res, APP_ROUTES.REGISTER);
      }
      // console.log(response);
    } else {
    }
  } catch (error) {
    console.log(error);
    return redirect(res, APP_ROUTES.ERROR);
  }
}
