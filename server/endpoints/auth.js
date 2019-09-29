const express = require("express");
const { userExists } = require("../resolvers/utils");
const {
  RegisterUser,
  RegisterUserResponseHandler
} = require("../resolvers/users/registerUser");
const passport = require("passport");

const { LoginResponseHandler } = require("../resolvers/users/loginUser");

const api = express.Router();

api.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  LoginResponseHandler
);

api.get("/callback", RegisterUser, RegisterUserResponseHandler);

api.get("/logout", (req, res) => {
  req.logout();

  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = process.env;
  res.redirect(
    `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
  );
});

module.exports = api;
