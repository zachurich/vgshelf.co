const uniqBy = require("lodash/uniqBy");
const User = require("../../models/User");
const Game = require("../../models/Game");
const Collection = require("../../models/Collection");
const { createDetailedGame } = require("./utils");
const { handleResponse, createResponse, handleErrors } = require("../utils");

const GetGame = async (req, res) => {
  const { id, user = null, collection = null, userName = null } = req.query;
  let response = {};
  let query;
  try {
    if (userName && !collection) {
      // Get all games via unauthed username
      query = await handleErrors(buildQueryGamesByUsername(userName));
      response = await handleErrors(retrieveAllGames(query));
    } else if (id) {
      // Get a single game by _id
      query = { _id: id };
      response = await handleErrors(retrieveSingleGame(query));
    } else if (collection) {
      query = await handleErrors(buildQueryGamesInCollection(collection));
    } else if (user) {
      query = await handleErrors(buildQueryGamesInUser(user));
    } else {
      throw Error("No params provided!");
    }
    response = await handleErrors(retrieveAllGames(query));
  } catch (error) {
    response = createResponse("There was an error retrieving the game(s)!", error, 500);
  }
  return handleResponse(res, response);
};

async function buildQueryGamesInCollection(collection) {
  const type = "collection";
  const queryObject = await Collection.findOne({ _id: collection });
  return { queryObject, type, user: queryObject.user };
}

async function buildQueryGamesInUser(user) {
  const type = "user";
  const queryObject = await User.findOne({ userId: user });
  return { queryObject, type, user: queryObject.id };
}

async function buildQueryGamesByUsername(username) {
  const type = "userName";
  const queryObject = await User.findOne({ username });
  return { queryObject, type, user: queryObject.id };
}

async function retrieveSingleGame(filter) {
  const game = await Game.findOne(filter);
  return createResponse("Retrieved single game!", game);
}

async function retrieveAllGames({ queryObject, type, user }) {
  const { games } = queryObject;
  const gameDetails = [];
  for (const userGame of games) {
    let globalGame = await Game.findOne({ _id: userGame._id });
    gameDetails.push(createDetailedGame(globalGame, userGame));
  }
  try {
    const { username } = await User.findOne({ _id: user });
    return createResponse(`Retrieved all games from ${type}!`, {
      username,
      games: uniqBy(gameDetails, "id")
    });
  } catch (error) {
    throw Error("User not found!", error);
  }
}

module.exports = GetGame;
