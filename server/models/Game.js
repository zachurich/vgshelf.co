const mongoose = require("mongoose");

const game = new mongoose.Schema({
  title: { type: String, unique: true, required: "Title cannot be empty" },
  igdbId: { type: String, unique: true, required: "IGDB ID cannot be empty" },
  slug: { type: String, unique: true, required: "Slug cannot be empty" },
  imageUrl: { type: String }
});

module.exports = mongoose.model("Game", game);
