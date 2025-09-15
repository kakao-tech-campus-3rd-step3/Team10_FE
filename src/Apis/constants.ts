export const DEFAULT_API_TIMEOUT = 10000;
export const DEFAULT_API_BASE_URL = '/api';

export const DEFAULT_COOKIE_EXPIRES_DAYS = 7;
export const COOKIE_NAMES = {
  TOKEN: 'token',
  AUTH: 'auth',
} as const;

export const HTTP_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export const CONTENT_TYPES = {
  JSON: 'application/json',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  LOGOUT: '/api/auth/logout',
} as const;

export const COOKIE_SETTINGS = {
  PATH: '/',
  SAME_SITE: 'Strict',
  EXPIRED_DATE: 'Thu, 01 Jan 1970 00:00:00 UTC',
} as const;

export const TIME_CONSTANTS = {
  DAY_IN_MS: 24 * 60 * 60 * 1000,
} as const;
