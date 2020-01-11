const { createResponse } = require("../utils");

exports.createDetailedGame = (globalGame, userGame) => {
  return {
    id: `${globalGame._id}`,
    title: globalGame.title,
    imageUrl: globalGame.imageUrl,
    added: userGame.added,
    properties: userGame.properties
  };
};

// .id() is a subdoc method to check for
// existence of an id in a subdoc, returning the doc
exports.objectHasGame = (obj, game) => {
  return !!obj.games.id(game["_id"]);
};

exports.addGameToObj = (obj, game) => {
  return obj.games.concat(game);
};
