const _ = require("lodash");
const Collection = require("../../models/Collection");
const Game = require("../../models/Game");
const { deleteCollection } = require("./utils");
const { handleResponse, createResponse } = require("../utils");

const DeleteCollection = async (req, res) => {
  const { id } = req.body;
  const collectionFilter = { _id: id };
  let response = {};
  try {
    const deletedCount = await deleteCollection(collectionFilter);
    if (deletedCount === 0) {
      error = "Collection doesn't exist!";
      throw error;
    }
    response = createResponse("Collection deleted!", collectionFilter);
  } catch (error) {
    response = createResponse("There was an error deleting the collection!", error, 500);
  }
  return handleResponse(res, response);
};

module.exports = DeleteCollection;
