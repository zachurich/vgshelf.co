const User = require("../../models/User");
const { handleResponse, createResponse, userExists } = require("../utils");

const RegisterUser = (req, res, next) => {
  const { userId, username, emailAddress, firstName } = req.body;
  const user = new User({ userId, username, emailAddress, firstName });
  req.user = user;
  userExists(username, req, res, next);
};

const RegisterUserResponseHandler = async (req, res, next) => {
  const { user, userExists } = req;
  if (!userExists) {
    try {
      await user.save();
      response = createResponse("Created!", user.username, 200);
    } catch (e) {
      response = createResponse(
        "There was an error registering the user",
        e,
        500
      );
    }
  } else {
    response = createResponse("This user already exists!", user.username, 500);
  }
  return handleResponse(res, response);
};

module.exports = { RegisterUser, RegisterUserResponseHandler };
