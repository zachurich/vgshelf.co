const mongoose = require("mongoose");

const game = new mongoose.Schema({
  title: String
});

module.exports = mongoose.model("Game", game);
