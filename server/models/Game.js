const mongoose = require("mongoose");

const Game = new mongoose.Schema({
  title: { type: String, unique: true, required: "Title cannot be empty" },
  igdbId: { type: String, unique: true, required: "IGDB ID cannot be empty" },
  slug: { type: String, unique: true, required: "Slug cannot be empty" },
  imageUrl: { type: String },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Game", Game);
