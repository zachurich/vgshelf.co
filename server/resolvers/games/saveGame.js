const Game = require("../../models/Game");
const { createResponse, handleResponse } = require("../utils");

const SaveGame = (req, res, next) => {
  Game.find({ title: req.body.title }, async (err, docs) => {
    if (docs.length < 1) {
      const game = new Game({ title: req.body.title });
      try {
        const data = await game.save();
        req.response = createResponse("Game saved!", data, 200);
      } catch (e) {
        req.response = createResponse(
          "Failed to update existing game.",
          e,
          200
        );
      }
      next();
    } else {
      req.response = createResponse("Game already exists.", {}, 200);
      next();
    }
  });
};

const SaveGameResponseHandler = (req, res, next) => {
  return handleResponse(res, req.response);
};

module.exports = { SaveGame, SaveGameResponseHandler };
