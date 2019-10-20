const { createResponse } = require("../utils");

exports.createDetailedGame = game => {
  return {
    id: game["_id"],
    title: game.title
  };
};

exports.objectHasGame = (obj, game) => {
  return obj.games.includes(game["_id"]);
};

exports.addGameToObj = (obj, game) => {
  return obj.games.concat(game);
};
