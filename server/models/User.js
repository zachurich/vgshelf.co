const mongoose = require("mongoose");
const uniqueRequired = { unique: true, required: true };

// Users need to be able to add custom properties to a game, but we don't want
// to modify the game for everyone, so users have their own game instance that wraps
// the shared game
const userGame = {
  properties: [],
  added: { type: Date, default: Date.now },
  id: {
    type: mongoose.Types.ObjectId,
    ref: "Game"
  }
};

const User = new mongoose.Schema({
  userId: { type: String, ...uniqueRequired },
  username: { type: String, ...uniqueRequired },
  emailAddress: { type: String, ...uniqueRequired },
  created: { type: Date, default: Date.now },
  collections: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Collection"
    }
  ],
  games: [userGame]
});

module.exports = mongoose.model("User", User);
