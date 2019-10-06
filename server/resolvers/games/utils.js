exports.createDetailedGame = game => {
  return {
    id: game["_id"],
    title: game.title
  };
};
