import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { checkDBUser } from "../../../api/usersApi";
import { APP_ROUTES } from "../../../common/routes";
import {
  isGoodResponse,
  isMissingResponse,
  redirect,
} from "../../../common/utils";

const afterCallback = async (req, res, session, state) => {
  // We need to call the vgshelf api here
  // and insert user if not exists

  try {
    if (session && session.user) {
      const { user } = session;
      const { code, data } = await checkDBUser({
        userId: user.sub,
      });

      if (isGoodResponse({ code })) {
        return redirect(
          res,
          APP_ROUTES.APP.replace("[userName]", data.userName)
        );
      } else if (isMissingResponse({ code })) {
        return redirect(res, APP_ROUTES.REGISTER);
      }
    }
  } catch (error) {
    console.log(error);
    return redirect(res, APP_ROUTES.ERROR);
  }
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
