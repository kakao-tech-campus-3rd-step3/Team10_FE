const isValidCookieValue = (value: string | null): boolean => {
  return !!(value && value !== 'null' && value !== 'undefined');
};

export const isAuthenticated = (): boolean => {
  const token = getCookie('token');
  const auth = getCookie('auth');
  return isValidCookieValue(token) || isValidCookieValue(auth);
};

export const logout = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  } finally {
    window.location.href = '/login';
  }
};

export const redirectToLogin = (): void => {
  window.location.href = '/login';
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

export const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const secureFlag = getSecureFlag();
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secureFlag}`;
};

export const deleteCookie = (name: string): void => {
  const secureFlag = getSecureFlag();

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict${secureFlag}`;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.hostname};SameSite=Strict${secureFlag}`;
};
