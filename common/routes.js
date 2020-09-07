import { createUrl } from "./utils";

// External API routes
export const API_ENDPOINTS = {
  COLLECTION: createUrl(process.env.API_BASE, "/api/collection"),
  GAME: createUrl(process.env.HOST, "/api/games"),
  REGISTER: createUrl(process.env.API_BASE, "/api/user/register"),
  SEARCH: createUrl(process.env.API_BASE, "/api/external/search/"),
  COVER: createUrl(process.env.API_BASE, "/api/external/cover/"),
  USER: createUrl(process.env.API_BASE, "/api/user/check"),
};

// Nextjs API routes
export const API_ROUTES = {
  COLLECTION: createUrl(process.env.HOST, "/api/collections"),
  GAME: createUrl(process.env.HOST, "/api/games"),
  AUTH: createUrl(process.env.HOST, "/api/check-auth"),
  REGISTER: "/api/register",
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  USER: createUrl(process.env.HOST, "/api/user"),
};

// Application routes
export const APP_ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  APP: "/[userName]/dashboard",
  GAMES: "/[userName]/games/[collectionSlug]",
  GAME: "/[userName]/[gameSlug]",
  ERROR: "/error",
  MISSING: "/404",
};
