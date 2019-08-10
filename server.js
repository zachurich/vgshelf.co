const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const mongoose = require("mongoose");

const api = require("./api/endpoints/index");
const proxy = require("./api/endpoints/proxy");

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
mongoose.connection.on("error", err => {
  console.log(`Error connecting to db: ${err}`);
});

const init = async () => {
  try {
    await app.prepare();
    const server = express();

    server.use("/", api);
    server.use("/", proxy);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
