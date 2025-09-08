// 인증 관련 유틸리티 함수들 (쿠키 기반)

/**
 * 로그인 상태 확인
 * @returns boolean - 로그인 여부
 */
export const isAuthenticated = (): boolean => {
  // 쿠키에서 토큰 존재 여부 확인
  // 실제로는 서버에서 인증 상태를 확인하는 API를 호출하는 것이 더 안전
  return document.cookie.includes('token=') || document.cookie.includes('auth=');
};

/**
 * 로그아웃 처리
 * 서버에 로그아웃 요청을 보내고 쿠키를 삭제
 */
export const logout = async (): Promise<void> => {
  try {
    // 서버에 로그아웃 요청 (서버에서 쿠키 삭제)
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함
    });
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  } finally {
    // 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  }
};

/**
 * 로그인 페이지로 리다이렉트
 */
export const redirectToLogin = (): void => {
  window.location.href = '/login';
};

/**
 * 쿠키에서 특정 값 가져오기
 * @param name - 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

/**
 * 쿠키 설정 (클라이언트에서 직접 설정하는 경우)
 * 주의: 보안상 중요한 토큰은 서버에서 HttpOnly로 설정하는 것이 좋음
 * @param name - 쿠키 이름
 * @param value - 쿠키 값
 * @param days - 만료일 (기본 7일)
 */
export const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

/**
 * 쿠키 삭제
 * @param name - 쿠키 이름
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};
