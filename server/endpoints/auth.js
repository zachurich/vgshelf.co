const express = require("express");
const { InitUser, UserResponseHandler } = require("../resolvers/users/registerUser");
const passport = require("passport");

const api = express.Router();

api.get(
  ["/login", "/signup"],
  passport.authenticate("auth0", {
    scope: "openid email profile"
  })
);

api.get("/callback", InitUser, UserResponseHandler);

api.get("/logout", (req, res) => {
  req.logout();
  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = process.env;
  res.redirect(
    `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
  );
});

module.exports = api;
