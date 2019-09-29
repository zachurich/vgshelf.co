const User = require("../../models/User");
const passport = require("passport");
const { handleResponse, createResponse, userExists } = require("../utils");

const RegisterUser = (req, res, next) => {
  passport.authenticate("auth0", (err, user) => {
    const { id, displayName, nickname } = user;
    const mongoUser = new User({
      userId: id,
      username: nickname,
      emailAddress: displayName
    });
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, err => {
      if (err) return next(err);
      req.mongoUser = mongoUser;
      userExists(id, req, res, next);
    });
  })(req, res, next);
};

const RegisterUserResponseHandler = async (req, res, next) => {
  const { mongoUser, userExists } = req;
  if (!userExists) {
    try {
      await mongoUser.save();
      response = createResponse("Created!", mongoUser.username, 200);
    } catch (e) {
      response = createResponse("There was an error registering the user", e, 500);
    }
  } else {
    response = createResponse("This user already exists!", mongoUser.username, 200);
  }
  return handleResponse(res, response, "/");
};

module.exports = { RegisterUser, RegisterUserResponseHandler };
