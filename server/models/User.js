const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const uniqueRequired = { unique: true, required: true };

const user = new mongoose.Schema({
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
  games: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Game"
    }
  ]
});

module.exports = mongoose.model("User", user);
