const User = require("../../models/User");
const Game = require("../../models/Game");
const Collection = require("../../models/Collection");
const { createDetailedGame } = require("./utils");
const { handleResponse, createResponse, handleErrors } = require("../utils");

const GetGame = async (req, res) => {
  const { id, user = null, collection = null, userName = null } = req.query;
  let response = {};
  try {
    // Get a single game by _id
    if (!user) {
      if (userName) {
        let query = await handleErrors(retrieveAllGamesByUserName(userName));
        response = await handleErrors(retrieveAllGames(query.queryObject, query.type));
      } else if (id) {
        const gameFilter = { _id: id };
        response = await handleErrors(retrieveSingleGame(gameFilter));
      }
    } else {
      let query;
      if (collection) {
        query = await handleErrors(retrieveGamesInCollection(collection));
      } else {
        query = await handleErrors(retrieveAllGamesInUser(user));
      }
      response = await handleErrors(retrieveAllGames(query.queryObject, query.type));
    }
  } catch (error) {
    response = createResponse("There was an error retrieving the game(s)!", error, 500);
  }
  return handleResponse(res, response);
};

async function retrieveGamesInCollection(collection) {
  type = "collection";
  queryObject = await Collection.findOne({ _id: collection });
  return { queryObject, type };
}

async function retrieveAllGamesInUser(user) {
  type = "user";
  queryObject = await User.findOne({ userId: user });
  return { queryObject, type };
}

async function retrieveAllGamesByUserName(username) {
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
  for (i in games) {
    let game = await Game.findOne({ _id: games[i] });
    gameDetails.push(createDetailedGame(game));
  }
  return createResponse(`Retrieved all games from ${type}!`, gameDetails);
}

module.exports = GetGame;
