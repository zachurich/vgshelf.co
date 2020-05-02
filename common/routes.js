import { createUrl } from "./utils";

// External API routes
export const API_ENDPOINTS = {
  COLLECTION: createUrl(process.env.API_BASE, "/api/collection"),
  GAME: createUrl(process.env.API_BASE, "/api/game"),
  SEARCH: createUrl(process.env.API_BASE, "/api/external/search/"),
  COVER: createUrl(process.env.API_BASE, "/api/external/cover/")
};

// Nextjs API routes
export const API_ROUTES = {
  COLLECTION: createUrl(process.env.HOST, "/api/collections"),
  GAME: createUrl(process.env.HOST, "/api/games"),
  AUTH: createUrl(process.env.HOST, "/api/check-auth")
};

// Application routes
export const APP_ROUTES = {
  HOME: "/",
  APP: "/dashboard",
  COLLECTIONS: "/collections",
  GAMES: "/games",
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  ERROR: "/error"
};
