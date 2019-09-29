const express = require("express");

const { SaveGame, SaveGameResponseHandler } = require("../resolvers/games/saveGame");
const GetCollection = require("../resolvers/collections/getCollection");
const CreateCollection = require("../resolvers/collections/createCollection");
const UpdateCollection = require("../resolvers/collections/updateCollection");
const DeleteCollection = require("../resolvers/collections/deleteCollection");
const {
  RegisterUser,
  RegisterUserResponseHandler
} = require("../resolvers/users/registerUser");
const { LoginUser, LoginResponseHandler } = require("../resolvers/users/loginUser");
const Health = require("../resolvers/health");
const { apiBase } = require("./constants");
const { ensureAuthenticated } = require("./utils");
const api = express.Router();

/** Utils */
api.get(`${apiBase}/health`, Health);

/** Games */
api.post(`${apiBase}/game`, SaveGame, SaveGameResponseHandler);

/** Collections */
api.get(`${apiBase}/collection`, GetCollection);
api.post(`${apiBase}/collection`, CreateCollection);
api.put(`${apiBase}/collection`, UpdateCollection);
api.delete(`${apiBase}/collection`, DeleteCollection);

module.exports = api;
