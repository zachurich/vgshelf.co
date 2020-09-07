import auth0 from "../../auth.config";
import { API_ROUTES } from "../../common/routes";
import { redirect } from "../../common/utils";

export default async function authCallback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: API_ROUTES.USER });
  } catch (error) {
    console.log(error);
    return redirect(res, APP_ROUTES.ERROR);
  }
}
