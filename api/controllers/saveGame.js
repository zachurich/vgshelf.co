const Game = require("../models/Game");

const SaveGame = async (req, res) => {
  const game = new Game({ title: req.query.title });
  const data = await game.save();
  return res.send({ data });
};

module.exports = SaveGame;
