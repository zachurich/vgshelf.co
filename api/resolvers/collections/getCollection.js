const _ = require("lodash");
const Collection = require("../../models/Collection");
const Game = require("../../models/Game");
const {
  retrieveCollection,
  retrieveAllCollections,
  createDetailedCollection
} = require("./utils");
const { handleResponse, createResponse } = require("../utils");

const GetCollection = async (req, res) => {
  const { id, user = null } = req.query;
  let response = {};
  try {
    if (!user) {
      const collectionFilter = { _id: id };
      response = await retrieveSingleDetailedCollection(collectionFilter);
    } else {
      const collectionFilter = { user };
      response = await retrieveAllDetailedCollections(collectionFilter);
    }
  } catch (error) {
    response = createResponse(
      "There was an error retrieving the collection!",
      error,
      500
    );
  }
  return handleResponse(res, response);
};

const retrieveSingleDetailedCollection = async collectionFilter => {
  try {
    const currentCollection = await retrieveCollection(collectionFilter);
    const gameDetails = await retrieveGamesInCollection(currentCollection);
    const detailedCollection = createDetailedCollection(currentCollection, gameDetails);
    response = createResponse(`Retrieved single Collection!`, detailedCollection);
    return response;
  } catch (e) {
    error = { msg: "Error retrieving single collection!", data: e };
    throw error;
  }
};

const retrieveAllDetailedCollections = async collectionFilter => {
  try {
    const allCollections = await retrieveAllCollections(collectionFilter);
    const allDetailedCollections = await composeDetailedCollections(allCollections);
    response = createResponse(
      `Retrieved all Collections for user!`,
      allDetailedCollections
    );

    return response;
  } catch (e) {
    error = { msg: "Error retrieving multiple collections!", data: e };
    throw error;
  }
};

const retrieveGamesInCollection = async currentCollection => {
  const { games: gameIds } = currentCollection;
  const gameDetails = [];
  try {
    for (i in gameIds) {
      game = await Game.findOne({ _id: gameIds[i] });
      gameDetails.push(game);
    }
    return gameDetails;
  } catch (e) {
    throw e;
  }
};

const composeDetailedCollections = async allCollections => {
  const allDetailedCollections = [];
  for (i in allCollections) {
    const currentCollection = allCollections[i];
    const gameDetails = await retrieveGamesInCollection(currentCollection);
    const detailedCollection = createDetailedCollection(currentCollection, gameDetails);
    allDetailedCollections.push(detailedCollection);
  }
  return allDetailedCollections;
};

module.exports = GetCollection;
