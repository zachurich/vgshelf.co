import mongoose from "mongoose";

const CollectionShema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  games: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

export default mongoose.models.Collection ||
  mongoose.model("Collection", CollectionShema);
