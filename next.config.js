require("dotenv").config();
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withCss(
  withSass({
    env: {
      HOST: process.env.HOST,
      API_BASE: process.env.API_BASE,
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE
    }
  })
);
