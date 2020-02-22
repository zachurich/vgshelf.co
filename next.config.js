require("dotenv").config();
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withCss(
  withSass({
    env: {
      API_BASE: process.env.API_BASE
    }
  })
);
