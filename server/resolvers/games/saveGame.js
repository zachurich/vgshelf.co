const User = require("../../models/User");
const Game = require("../../models/Game");
const Collection = require("../../models/Collection");
const { createResponse, handleResponse } = require("../utils");
const { objectHasGame, addGameToObj } = require("./utils");

const SaveGame = async (req, res, next) => {
  const { id, title, collection } = req.body;
  let response;
  try {
    const user = await User.findOne({ userId: id });
    const existingGameInDB = await Game.findOne({ title });
    const game = new Game({ title });
    try {
      const gameToAdd = await optionallyAddGameToDb(existingGameInDB, game);
      if (collection) {
        const collectionObj = await Collection.findOne({ _id: collection });
        response = await addGameToCollection(collectionObj, gameToAdd);
      }
      response = await addGameToUser(user, gameToAdd);
    } catch (e) {
      response = createResponse("There was an error saving the game!", e, 500);
    }
  } catch (e) {
    response = createResponse("There was an retrieving data!", e, 500);
  }
  return handleResponse(res, response);
};

const optionallyAddGameToDb = async (existingGameInDB, game) => {
  if (existingGameInDB === null) {
    await game.save();
    return game;
  } else {
    return existingGameInDB;
  }
};

const addGameToCollection = async (collection, game) => {
  if (objectHasGame(collection, game)) {
    return createResponse("Collection already has game!", {}, 500);
  } else {
    collection.games = addGameToObj(collection, game);
    const data = await collection.save();
    return createResponse("Game assigned to collection!", data);
  }
};

const addGameToUser = async (user, game) => {
  if (objectHasGame(user, game)) {
    return createResponse("User already assigned game!", {}, 500);
  } else {
    user.games = addGameToObj(user, game);
    const data = await user.save();
    return createResponse("Game assigned to user!", data);
  }
};

module.exports = { SaveGame };
