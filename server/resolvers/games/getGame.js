const User = require("../../models/User");
const Game = require("../../models/Game");
const { createDetailedGame } = require("./utils");
const { handleResponse, createResponse } = require("../utils");

const GetGame = async (req, res) => {
  const { id, user = null } = req.query;
  let response = {};
  try {
    if (!user) {
      const gameFilter = { _id: id };
      response = await retrieveSingleGame(gameFilter);
    } else {
      const mongoUser = await User.findOne({ userId: user });
      response = await retrieveAllGames(mongoUser);
    }
  } catch (error) {
    response = createResponse("There was an error retrieving the game(s)!", error, 500);
  }
  return handleResponse(res, response);
};

async function retrieveSingleGame(filter) {
  try {
    const game = await Game.findOne(filter);
    return createResponse("Retrieved single game!", game);
  } catch (e) {
    throw e;
  }
}

async function retrieveAllGames(user) {
  const { games } = user;
  const gameDetails = [];
  try {
    for (i in games) {
      game = await Game.findOne({ _id: games[i] });
      gameDetails.push(createDetailedGame(game));
    }
    return createResponse("Retrieved all games for user!", gameDetails);
  } catch (e) {
    throw e;
  }
}

module.exports = GetGame;
