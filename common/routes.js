import { createUrl } from "./utils";

export const ENDPOINTS = {
  COLLECTION: createUrl("/api/collection"),
  GAME: createUrl("/api/game"),
  SEARCH: createUrl("/api/external/search/"),
  COVER: createUrl("/api/external/cover/")
};

export const ROUTES = {
  HOME: "/",
  APP: "/dashboard",
  COLLECTIONS: "/collections",
  GAMES: "/games",
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  ERROR: "/error"
};
