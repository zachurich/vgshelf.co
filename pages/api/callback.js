import auth0 from "../../common/auth";
import { API_ROUTES } from "../../common/routes";
import { redirect } from "../../common/utils";

export default async function authCallback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: API_ROUTES.USER });
  } catch (error) {
    // res.status(error.status || 400).end(error.message);
    console.log(error.message);
    return redirect(res, APP_ROUTES.ERROR);
  }
}
