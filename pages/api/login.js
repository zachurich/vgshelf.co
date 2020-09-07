import auth0 from "../../auth.config";
import { APP_ROUTES } from "../../common/routes";
import { redirect } from "../../common/utils";

export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    // res.status(error.status || 400).end(error.message);
    console.log(error.message);
    return redirect(res, APP_ROUTES.ERROR);
  }
}
