const User = require("../../models/User");
const Game = require("../../models/Game");
const { createResponse, handleResponse } = require("../utils");

const RemoveGame = async (req, res, next) => {
  const { id, user: userId } = req.body;
  const user = await User.findOne({ userId });
  let response;
  try {
    user.games = user.games.filter(game => {
      return game.toString() !== id.toString();
    });
    const data = await user.save();
    // const data = await game.save();
    response = createResponse("Game removed from user!", data);
  } catch (e) {
    response = createResponse("There was an error removing the game!", e, 500);
  }
  return handleResponse(res, response);
};

module.exports = RemoveGame;
