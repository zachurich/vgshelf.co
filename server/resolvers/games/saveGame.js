const User = require("../../models/User");
const Game = require("../../models/Game");
const { createResponse, handleResponse } = require("../utils");

const SaveGame = async (req, res, next) => {
  const user = await User.findOne({ userId: req.body.id });
  const existingGame = await Game.findOne({ title: req.body.title });
  console.log("YEAH, THIS GAME EXISTS", existingGame);
  const game = new Game({ title: req.body.title });
  let response;
  try {
    user.games = user.games.concat(game);
    await user.save();
    const data = await game.save();
    response = createResponse("Game saved!", data);
  } catch (e) {
    response = createResponse("There was an error saving the game!", e, 500);
  }
  return handleResponse(res, response);
};

module.exports = { SaveGame };
