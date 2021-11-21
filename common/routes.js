import { createUrl } from "./utils";

// External API routes
export const API_ENDPOINTS = {
  COLLECTION: createUrl(process.env.API_BASE, "/api/v1/collections"),
  GAME: createUrl(process.env.API_BASE, "/api/v1/games"),
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
  USER: createUrl(process.env.HOST, "/api/user"),
  REGISTER: "/api/register",

  // Dynamic API Routes created by @auth0/nextjs-auth0
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",
  CALLBACK: "/api/auth/callback",
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
