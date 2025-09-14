import {
  COOKIE_NAMES,
  DEFAULT_COOKIE_EXPIRES_DAYS,
  ROUTES,
  COOKIE_SETTINGS,
  TIME_CONSTANTS,
} from './constants';

const isValidCookieValue = (value: string | null): boolean => {
  return !!(value && value !== 'null' && value !== 'undefined');
};

export const isAuthenticated = (): boolean => {
  const token = getCookie(COOKIE_NAMES.TOKEN);
  const auth = getCookie(COOKIE_NAMES.AUTH);
  return isValidCookieValue(token) || isValidCookieValue(auth);
};

export const logout = async (): Promise<void> => {
  try {
    await fetch(ROUTES.LOGOUT, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  } finally {
    window.location.href = ROUTES.LOGIN;
  }
};

export const redirectToLogin = (): void => {
  window.location.href = ROUTES.LOGIN;
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const getSecureFlag = (): string => {
  const isSecure = window.location.protocol === 'https:';
  return isSecure ? ';Secure' : '';
};

export const setCookie = (
  name: string,
  value: string,
  days: number = DEFAULT_COOKIE_EXPIRES_DAYS,
): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * TIME_CONSTANTS.DAY_IN_MS);
  const secureFlag = getSecureFlag();
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${COOKIE_SETTINGS.PATH};SameSite=${COOKIE_SETTINGS.SAME_SITE}${secureFlag}`;
};

export const deleteCookie = (name: string): void => {
  const secureFlag = getSecureFlag();

  document.cookie = `${name}=;expires=${COOKIE_SETTINGS.EXPIRED_DATE};path=${COOKIE_SETTINGS.PATH};SameSite=${COOKIE_SETTINGS.SAME_SITE}${secureFlag}`;
  document.cookie = `${name}=;expires=${COOKIE_SETTINGS.EXPIRED_DATE};path=${COOKIE_SETTINGS.PATH};domain=${window.location.hostname};SameSite=${COOKIE_SETTINGS.SAME_SITE}${secureFlag}`;
};
