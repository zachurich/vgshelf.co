import auth0 from "../../common/auth";
import { APP_ROUTES } from "../../common/routes";
import { createBufferFromQuery, redirect } from "../../common/utils";

export default async function login(req, res) {
  // const params = createBufferFromQuery(req.query);
  try {
    await auth0.handleLogin(req, res, { authParams: { state: params } });
  } catch (error) {
    // res.status(error.status || 400).end(error.message);
    console.log(error.message);
    return redirect(res, APP_ROUTES.ERROR);
  }
}
