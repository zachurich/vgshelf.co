import { createUrl } from "./utils";

// External API routes
export const API_ENDPOINTS = {
  COLLECTION: createUrl(process.env.API_BASE, "/api/collection"),
  GAME: createUrl(process.env.API_BASE, "/api/game"),
  USER: createUrl(process.env.API_BASE, "/api/user/register"),
  SEARCH: createUrl(process.env.API_BASE, "/api/external/search/"),
  COVER: createUrl(process.env.API_BASE, "/api/external/cover/"),
};

// Nextjs API routes
export const API_ROUTES = {
  COLLECTION: createUrl(process.env.HOST, "/api/collections"),
  GAME: createUrl(process.env.HOST, "/api/games"),
  AUTH: createUrl(process.env.HOST, "/api/check-auth"),
};

// Application routes
export const APP_ROUTES = {
  HOME: "/",
  APP: "/[userName]/dashboard",
  GAMES: "/[userName]/games/[collectionSlug]",
  GAME: "/[userName]/[gameSlug]",
  LOGIN: "/api/login",
  USER: "/api/user",
  LOGOUT: "/api/logout",
  ERROR: "/error",
  MISSING: "/404",
};
