const express = require("express");

const { SaveGame } = require("../resolvers/games/saveGame");
const GetGame = require("../resolvers/games/getGame");
const RemoveGame = require("../resolvers/games/removeGame");
const GetCollection = require("../resolvers/collections/getCollection");
const CreateCollection = require("../resolvers/collections/createCollection");
const UpdateCollection = require("../resolvers/collections/updateCollection");
const DeleteCollection = require("../resolvers/collections/deleteCollection");
const Health = require("../resolvers/health");
const { apiBase } = require("./constants");
const { ensureAuthenticated } = require("./utils");
const api = express.Router();

/** Utils */
api.get(`${apiBase}/health`, Health);

/** Games */
api.get(`${apiBase}/game`, GetGame);
api.post(`${apiBase}/game`, SaveGame);
api.delete(`${apiBase}/game`, RemoveGame);

/** Collections */
api.get(`${apiBase}/collection`, GetCollection);
api.post(`${apiBase}/collection`, CreateCollection);
api.put(`${apiBase}/collection`, UpdateCollection);
api.delete(`${apiBase}/collection`, DeleteCollection);

module.exports = api;
