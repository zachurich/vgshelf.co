import auth0 from "../../common/auth";
import { APP_ROUTES } from "../../common/routes";

export default async (req, res) => {
  const { state } = req.query;
  const [redirect] = state.toString().split("|");
  try {
    await auth0.handleCallback(req, res, { redirectTo: APP_ROUTES.USER });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};
