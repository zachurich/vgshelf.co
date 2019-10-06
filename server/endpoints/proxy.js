const express = require("express");
const fetch = require("node-fetch");
const api = express.Router();

// igdb stuff

api.post("/api/external/search/", async (req, res, next) => {
  let response;
  try {
    response = await fetch("https://api-v3.igdb.com/games", {
      method: "POST",
      headers: {
        "user-key": process.env.IGDB_KEY
      },
      body: req.body
    });
  } catch (e) {
    response = e;
  }
  const data = await response.json();
  res.send(data);
});

module.exports = api;
