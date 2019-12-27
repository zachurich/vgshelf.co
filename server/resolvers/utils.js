const User = require("../models/User");

exports.createResponse = (msg, data, code = 200) => {
  return {
    msg,
    data,
    code
  };
};

exports.handleResponse = (res, response, redirect = false) => {
  console.log(response);
  const { code } = response;
  if (code >= 500 && code < 600) {
    res.status(code);
  }

  if (redirect) {
    res.redirect(redirect);
  } else {
    return res.send(response);
  }
};

exports.userExists = (userId, req, res, next) => {
  User.findOne({ userId }, (err, obj) => {
    req.userId = userId;
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

exports.handleErrors = async fn => {
  try {
    const response = await fn;
    return response;
  } catch (e) {
    throw e;
  }
};
