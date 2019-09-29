const express = require("express");
const api = express.Router();

// igdb stuff

api.get("/api/external/search/", (req, res) => {
  // hit igdb
  res.send({
    hi: "hi"
  });
});

module.exports = api;
