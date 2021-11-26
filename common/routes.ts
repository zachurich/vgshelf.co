import { applyBaseUrl } from './utils';

const API_ENDPOINTS_DEF = {
  COLLECTION: '/api/v1/collections',
  GAME: '/api/v1/games',
  REGISTER: '/api/v1/user/register',
  SEARCH: '/api/v1/external/search/',
  COVER: '/api/v1/external/cover/',
  USER: '/api/v1/user/check',
};

// External API routes
export const API_ENDPOINTS: typeof API_ENDPOINTS_DEF = applyBaseUrl(
  process.env.API_BASE,
  API_ENDPOINTS_DEF,
);

// Nextjs API routes
export const API_ROUTES = applyBaseUrl(process.env.HOST, {
  COLLECTION: '/api/collections',
  GAME: '/api/games',
  AUTH: '/api/check-auth',
  USER: '/api/user',
  REGISTER: '/api/register',

  // Dynamic API Routes created by @auth0/nextjs-auth0
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  CALLBACK: '/api/auth/callback',
});

// Application routes
export const APP_ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  APP: '/[userName]/dashboard',
  GAMES: '/[userName]/games/[collectionSlug]',
  GAME: '/[userName]/[gameSlug]',
  ERROR: '/error',
  MISSING: '/404',
};
