const { SaveGame, SaveGameResponseHandler } = require("../resolvers/games/saveGame");
const GetCollection = require("../resolvers/collections/getCollection");
const CreateCollection = require("../resolvers/collections/createCollection");
const UpdateCollection = require("../resolvers/collections/updateCollection");
const {
  RegisterUser,
  RegisterUserResponseHandler
} = require("../resolvers/users/registerUser");
const { LoginUser, LoginResponseHandler } = require("../resolvers/users/loginUser");
const Health = require("../resolvers/health");
const { apiBase } = require("./constants");
const express = require("express");
const api = express.Router();
// const { NODE_ENV, AUTH_0_ISSUER, AUTH_0_JWKSURI } = process.env;
// var jwt = require("express-jwt");
// var jwks = require("jwks-rsa");

// var jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: AUTH_0_JWKSURI
//   }),
//   audience: "CollectionApp-dev",
//   issuer: AUTH_0_ISSUER,
//   algorithms: ["RS256"]
// });

/** Auth */
api.post(`${apiBase}/register`, RegisterUser, RegisterUserResponseHandler);
api.post(`${apiBase}/login`, LoginUser, LoginResponseHandler);

/** Utils */
api.get(`${apiBase}/health`, Health);

/** Games */
api.post(`${apiBase}/game`, SaveGame, SaveGameResponseHandler);

/** Collections */
api.get(`${apiBase}/collection`, GetCollection);
api.post(`${apiBase}/collection`, CreateCollection);
api.put(`${apiBase}/collection`, UpdateCollection);

module.exports = api;
