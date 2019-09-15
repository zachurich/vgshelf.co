const User = require("../../models/User");
const Collection = require("../../models/Collection");
const Game = require("../../models/Game");
const { handleResponse, createResponse } = require("../utils");

const CreateCollection = async (req, res) => {
  const user = await User.findOne({ userId: req.body.id });
  const collection = new Collection({
    user,
    name: req.body.name,
    games: []
  });
  let response;
  try {
    user.collections = user.collections.concat(collection);
    await user.save();
    const data = await collection.save();
    response = createResponse("Collection created!", data);
  } catch (e) {
    response = createResponse("There was an error creating the collection!", e, 500);
  }
  return handleResponse(res, response);
};

module.exports = CreateCollection;
