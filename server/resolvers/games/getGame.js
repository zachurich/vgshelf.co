const User = require("../../models/User");
const Game = require("../../models/Game");
const Collection = require("../../models/Collection");
const { createDetailedGame } = require("./utils");
const { handleResponse, createResponse, handleErrors } = require("../utils");

const GetGame = async (req, res) => {
  const { id, user = null, collection = null, userName = null } = req.query;
  let response = {};
  try {
    if (!user) {
      if (userName) {
        // Get all games via unauthed username
        let query = await handleErrors(buildQueryGamesByUsername(userName));
        response = await handleErrors(retrieveAllGames(query.queryObject, query.type));
      } else if (id) {
        // Get a single game by _id
        const gameFilter = { _id: id };
        response = await handleErrors(retrieveSingleGame(gameFilter));
      }
    } else {
      let query;
      if (collection) {
        query = await handleErrors(buildQueryGamesInCollection(collection));
      } else {
        query = await handleErrors(buildQueryGamesInUser(user));
      }
      response = await handleErrors(retrieveAllGames(query.queryObject, query.type));
    }
  } catch (error) {
    response = createResponse("There was an error retrieving the game(s)!", error, 500);
  }
  return handleResponse(res, response);
};

async function buildQueryGamesInCollection(collection) {
  type = "collection";
  queryObject = await Collection.findOne({ _id: collection });
  return { queryObject, type };
}

async function buildQueryGamesInUser(user) {
  type = "user";
  queryObject = await User.findOne({ userId: user });
  return { queryObject, type };
}

async function buildQueryGamesByUsername(username) {
  type = "userName";
  queryObject = await User.findOne({ username });
  return { queryObject, type };
}

async function retrieveSingleGame(filter) {
  const game = await Game.findOne(filter);
  return createResponse("Retrieved single game!", game);
}

async function retrieveAllGames(queryObject, type) {
  const { games } = queryObject;
  const gameDetails = [];
  for (const game of games) {
    let foundGame = await Game.findOne({ _id: game._id });
    gameDetails.push(createDetailedGame(foundGame));
  }
  return createResponse(`Retrieved all games from ${type}!`, gameDetails);
}

module.exports = GetGame;
