import auth0 from "../../common/auth";

export default async (req, res) => {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};
