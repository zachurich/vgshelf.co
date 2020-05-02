import auth0 from "../../common/auth";
import { createBufferFromQuery } from "../../common/utils";

export default async function login(req, res) {
  const params = createBufferFromQuery(req.query);
  try {
    await auth0.handleLogin(req, res, { authParams: { state: params } });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
