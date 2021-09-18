import mongoose from "mongoose";

import Game from "./Game";

// Users need to be able to add custom properties to a game, but we don't want
// to modify the game for everyone, so users have their own game instance that wraps
// the shared game
const UserGameSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  refId: {
    type: mongoose.Types.ObjectId,
    ref: "Game",
  },
  added: {
    type: Date,
    default: Date.now,
  },
  properties: {
    type: {
      type: String,
      enum: ["Digital", "Physical"],
      // default: null,
    },
    packaging: {
      type: String,
      enum: ["Game Only", "Case", "Case/Manual", "Sealed"],
      // default: null,
    },
    completeness: {
      type: String,
      enum: ["Started", "Beaten", "Completed"],
      // default: null,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    systems: [
      {
        type: String,
      },
    ],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const UserGame = mongoose.models.UserGame || UserGame;

UserGameSchema.pre("save", async function (next) {
  if (this.isNew) {
    const gameRef = await Game.findOne({ _id: this.refId });

    // find existing instances, so we can have some unique identifier for `slug`
    const existingGames = await UserGame.find({ title: gameRef.title });
    let slug = gameRef.slug;
    if (existingGames.length > 0) {
      slug += `-${existingGames.length + 1}`;
    }

    this.title = gameRef.title;
    this.slug = slug;
    next();
  }
});

export default UserGame;
