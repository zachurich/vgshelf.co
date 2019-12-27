const { createResponse } = require("../utils");

exports.createDetailedGame = game => {
  return {
    id: `${game["_id"]}`,
    title: game.title,
    imageUrl: game.imageUrl,
    thumbnailUrl: game.thumbnailUrl
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
