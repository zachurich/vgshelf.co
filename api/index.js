const Game = require("../models/Game");
const { healthEndpoint, gameEndpoint } = require("./constants");

module.exports = server => {
  server.get(healthEndpoint, (req, res) => {
    return res.send({
      msg: "UP!",
      code: res.statusCode
    });
  });

  server.post(gameEndpoint, async (req, res) => {
    const game = new Game({ title: req.query.title });
    const data = await game.save();
    return res.send({ data });
  });
};
