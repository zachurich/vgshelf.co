const User = require("../../models/User");
const { handleResponse, createResponse, userExists } = require("../utils");

const LoginUser = (req, res, next) => {
  const { username } = req.body;
  userExists(username, req, res, next);
};

const LoginResponseHandler = (req, res, next) => {
  res.redirect("/");
  const { username, userExists } = req;
  if (userExists) {
    response = createResponse("User logged in!", username, 200);
  } else {
    response = createResponse("User does not exist.", username, 500);
  }
  return handleResponse(res, response);
};

module.exports = {
  LoginUser,
  LoginResponseHandler
};
