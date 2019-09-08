const {
  SaveGame,
  SaveGameResponseHandler
} = require("../resolvers/games/saveGame");
const GetCollection = require("../resolvers/collections/getCollection");
const CreateCollection = require("../resolvers/collections/createCollection");
const UpdateCollection = require("../resolvers/collections/updateCollection");
const {
  RegisterUser,
  RegisterUserResponseHandler
} = require("../resolvers/users/registerUser");
const {
  LoginUser,
  LoginResponseHandler
} = require("../resolvers/users/loginUser");
const Health = require("../resolvers/health");
const { apiBase } = require("./constants");
const express = require("express");
const api = express.Router();

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
