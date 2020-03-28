import auth0 from "../../common/auth";
import { APP_ROUTES } from "../../common/routes";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: APP_ROUTES.APP });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
