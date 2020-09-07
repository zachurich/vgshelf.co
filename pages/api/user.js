import { checkDBUser, registerDBUser } from "../../api/fetchers/usersApi";
import auth0 from "../../auth.config";
import { HTTP_STATUS } from "../../common/constants";
import { APP_ROUTES } from "../../common/routes";
import { isGoodResponse, isMissingResponse, redirect } from "../../common/utils";

export default async function user(req, res) {
  try {
    const session = await auth0.getSession(req);
    if (session && session.user) {
      const { user } = session;
      const { code, data } = await checkDBUser({
        userId: user.sub,
      });

      if (isGoodResponse({ code })) {
        return redirect(res, APP_ROUTES.APP.replace("[userName]", data.userName));
      } else if (isMissingResponse({ code })) {
        return redirect(res, APP_ROUTES.REGISTER);
      }
    } else {
    }
  } catch (error) {
    console.log(error);
    return redirect(res, APP_ROUTES.ERROR);
  }
}
