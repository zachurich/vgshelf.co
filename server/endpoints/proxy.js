const express = require("express");
const api = express.Router();

const Search = require("../resolvers/igdbApi/search");
const Cover = require("../resolvers/igdbApi/cover");
const { apiBase } = require("./constants");

// igdb stuff

api.post(`${apiBase}/external/search/`, Search);
api.post(`${apiBase}/external/cover/`, Cover);

module.exports = api;
