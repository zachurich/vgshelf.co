const User = require("../models/User");

exports.createResponse = (msg, data, code = 200) => {
  return {
    msg,
    data,
    code
  };
};

exports.handleResponse = (res, response) => {
  const { code } = response;
  if (code >= 500 && code < 600) {
    res.status(code);
  }
  return res.send(response);
};

exports.userExists = (username, req, res, next) => {
  User.findOne({ username }, (err, obj) => {
    req.username = username;
    if (err) {
      req.userExists = false;
      next();
    }

    if (obj) {
      req.userExists = true;
    } else {
      req.userExists = false;
    }

    next();
  });
};
