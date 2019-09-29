exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.send(401);
};
