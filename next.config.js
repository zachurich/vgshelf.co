require("dotenv").config();

module.exports = {
  env: {
    HOST: process.env.HOST,
    API_BASE: process.env.API_BASE,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
    IGDB_KEY: process.env.IGDB_KEY,
    AUTH0_TEST_USER: process.env.AUTH0_TEST_USER,
    AUTH0_TEST_USER_EMAIL: process.env.AUTH0_TEST_USER_EMAIL,
  },
};
