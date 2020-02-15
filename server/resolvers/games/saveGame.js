const User = require("../../models/User");
const Game = require("../../models/Game");
const Collection = require("../../models/Collection");
const { createResponse, handleResponse, handleErrors } = require("../utils");
const { objectHasGame, addGameToObj } = require("./utils");

const SaveGame = async (req, res, next) => {
  const { id, collection, properties = {} } = req.body;
  let response;
  try {
    const gameToAdd = await handleErrors(optionallyAddGameToDb(req.body));
    if (collection) {
      response = await handleErrors(addGameToCollection(collection, gameToAdd));
    }
    response = await handleErrors(addGameToUser(id, gameToAdd, properties));
  } catch (e) {
    response = createResponse("There was an error saving the game!", e, 500);
  }
  return handleResponse(res, response);
};

const optionallyAddGameToDb = async ({ title, igdbId, slug, imageUrl, thumbnailUrl }) => {
  const existingGameInDB = await Game.findOne({ title });
  const game = new Game({ title, igdbId, slug, imageUrl, thumbnailUrl });
  if (existingGameInDB === null) {
    await game.save();
    return game;
  } else {
    return existingGameInDB;
  }
};

const addGameToCollection = async (collection, game) => {
  const collectionObj = await Collection.findOne({ _id: collection });
  if (objectHasGame(collectionObj, game)) {
    return createResponse("Collection already has game!", {}, 400);
  } else {
    collectionObj.games = addGameToObj(collectionObj, game);
    const data = await collectionObj.save();
    return createResponse("Game assigned to collection!", data);
  }
};

const addGameToUser = async (userId, game, properties) => {
  const user = await User.findOne({ userId });
  if (objectHasGame(user, game)) {
    return createResponse("You already have this game!", {}, 400);
  } else {
    user.games = addGameToObj(user, { ...game, properties });
    const data = await user.save();
    return createResponse("Game assigned to user!", data);
  }
};

module.exports = { SaveGame };
