const SaveGame = require("../controllers/saveGame");
const Health = require("../controllers/health");
const { healthEndpoint, gameEndpoint } = require("./constants");

const express = require("express");
const api = express.Router();

// internal db interactions
api.get(healthEndpoint, Health);
api.post(gameEndpoint, SaveGame);

module.exports = api;
