const User = require("../../models/User");
const Game = require("../../models/Game");
const Collection = require("../../models/Collection");
const { createDetailedGame } = require("./utils");
const { handleResponse, createResponse } = require("../utils");

const GetGame = async (req, res) => {
  const { id, user = null, collection = null } = req.query;
  let response = {};
  try {
    if (!user) {
      const gameFilter = { _id: id };
      response = await retrieveSingleGame(gameFilter);
    } else {
      let queryObject;
      let type;
      if (collection) {
        type = "collection";
        queryObject = await Collection.findOne({ _id: collection });
      } else {
        type = "user";
        queryObject = await User.findOne({ userId: user });
      }
      response = await retrieveAllGames(queryObject, type);
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

async function retrieveAllGames(queryObject, type) {
  const { games } = queryObject;
  const gameDetails = [];
  try {
    for (i in games) {
      let game = await Game.findOne({ _id: games[i] });
      gameDetails.push(createDetailedGame(game));
    }
    return createResponse(`Retrieved all games from ${type}!`, gameDetails);
  } catch (e) {
    throw e;
  }
}

module.exports = GetGame;
