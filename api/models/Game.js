import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: "Title cannot be empty",
  },
  igdbId: {
    type: String,
    unique: true,
    required: "IGDB ID cannot be empty",
  },
  slug: {
    type: String,
    unique: true,
    required: "Slug cannot be empty",
  },
  imageUrl: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
