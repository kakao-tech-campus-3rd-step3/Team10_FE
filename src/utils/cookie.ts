import { useCookies } from 'react-cookie';

/**
 * 쿠키 설정 옵션 타입
 */
export interface CookieOptions {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * 기본 쿠키 옵션
 */
const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7일
  secure: true, // HTTPS에서만 전송
  sameSite: 'strict', // CSRF 공격 방지
};

/**
 * 쿠키 설정 훅
 * @param cookieNames 관리할 쿠키 이름들
 * @returns 쿠키 객체와 설정 함수
 */
export const useCookieManager = (cookieNames: string[]) => {
  const [cookies, setCookie] = useCookies(cookieNames);

  /**
   * 쿠키 설정
   * @param name 쿠키 이름
   * @param value 쿠키 값
   * @param options 쿠키 옵션
   */
  const setCookieValue = (name: string, value: string, options?: Partial<CookieOptions>) => {
    setCookie(name, value, {
      ...DEFAULT_COOKIE_OPTIONS,
      ...options,
    });
  };

  /**
   * 쿠키 삭제
   * @param name 쿠키 이름
   */
  const removeCookie = (name: string) => {
    setCookie(name, '', {
      path: '/',
      maxAge: 0,
    });
  };

  return {
    cookies,
    setCookie: setCookieValue,
    removeCookie,
  };
};

/**
 * 토큰 관련 쿠키 관리 훅
 */
export const useTokenCookies = () => {
  const { cookies, setCookie, removeCookie } = useCookieManager(['access_token', 'refresh_token']);

  /**
   * 액세스 토큰 설정
   * @param token 토큰 값
   * @param days 만료일 (기본값: 7일)
   */
  const setAccessToken = (token: string, days: number = 7) => {
    setCookie('access_token', token, {
      maxAge: days * 24 * 60 * 60,
    });
  };

  /**
   * 리프레시 토큰 설정
   * @param token 토큰 값
   * @param days 만료일 (기본값: 30일)
   */
  const setRefreshToken = (token: string, days: number = 30) => {
    setCookie('refresh_token', token, {
      maxAge: days * 24 * 60 * 60,
    });
  };

  /**
   * 액세스 토큰 삭제
   */
  const removeAccessToken = () => {
    removeCookie('access_token');
  };

  /**
   * 리프레시 토큰 삭제
   */
  const removeRefreshToken = () => {
    removeCookie('refresh_token');
  };

  /**
   * 모든 토큰 삭제
   */
  const clearTokens = () => {
    removeAccessToken();
    removeRefreshToken();
  };

  return {
    accessToken: cookies.access_token,
    refreshToken: cookies.refresh_token,
    setAccessToken,
    setRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    clearTokens,
  };
};
