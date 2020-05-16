require("dotenv").config();
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new MiniCssExtractPlugin({
        ignoreOrder: true, // Enable to remove warnings about conflicting order
      })
    );
    return config;
  },
  env: {
    HOST: process.env.HOST,
    API_BASE: process.env.API_BASE,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  },
};

module.exports = withCss(withSass(nextConfig));
