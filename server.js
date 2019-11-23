require("dotenv").config();
const express = require("express");
const next = require("next");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const uid = require("uid-safe");
const bodyParser = require("body-parser");

const port = parseInt(process.env.PORT, 10) || 3000;
const { NODE_ENV } = process.env;
const dev = NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./src"
});
const handle = app.getRequestHandler();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const api = require("./server/endpoints/index");
const proxy = require("./server/endpoints/proxy");
const auth = require("./server/endpoints/auth");
const { ensureAuthenticated } = require("./server/endpoints/utils");

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

const { connection } = mongoose;

connection.on("error", err => {
  console.log(`Error connecting to db: ${err}`);
});

function redirectIfUnauthed(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect("/login");
  next();
}

const init = async () => {
  try {
    await app.prepare();
    const server = express();

    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {
        maxAge: 86400 * 1000
      },
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: connection })
    };
    server.use(session(sessionConfig));

    const auth0Strategy = new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
      }
    );
    passport.use(auth0Strategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    server.use(passport.initialize());
    server.use(passport.session());
    server.use(auth);
    server.use(bodyParser.json());
    server.use(proxy);

    server.use(api);

    server.get("/collections/:title/:id", redirectIfUnauthed, (req, res, next) => {
      return app.render(req, res, "/games", {
        id: req.params.id,
        title: req.params.title
      });
    });

    server.get("/collections", redirectIfUnauthed);
    server.get("/games", redirectIfUnauthed);

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
