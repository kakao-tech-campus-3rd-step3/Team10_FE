// 카카오 로그인 관련 유틸리티 함수들

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

/**
 * 카카오 로그인 URL 생성
 * @returns 카카오 로그인 페이지 URL
 */
export const getKakaoLoginUrl = (): string => {
  if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
    throw new Error('카카오 클라이언트 ID 또는 리다이렉트 URI가 설정되지 않았습니다.');
  }

  const params = new URLSearchParams({
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: 'code',
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

/**
 * 카카오 로그인 페이지로 리다이렉트
 */
export const redirectToKakaoLogin = (): void => {
  const loginUrl = getKakaoLoginUrl();
  window.location.href = loginUrl;
};

/**
 * URL에서 authorization code 추출
 * @param url - 현재 페이지 URL (기본값: window.location.href)
 * @returns authorization code 또는 null
 */
export const getKakaoAuthorizationCode = (url: string = window.location.href): string | null => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('code');
};

/**
 * 카카오 로그인 성공 여부 확인
 * @param url - 현재 페이지 URL (기본값: window.location.href)
 * @returns 로그인 성공 여부
 */
export const isKakaoLoginSuccess = (url: string = window.location.href): boolean => {
  return getKakaoAuthorizationCode(url) !== null;
};

/**
 * 카카오 에러 메시지 추출
 * @param url - 현재 페이지 URL (기본값: window.location.href)
 * @returns 에러 메시지 또는 null
 */
export const getKakaoErrorMessage = (url: string = window.location.href): string | null => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('error_description') || urlObj.searchParams.get('error');
};

/**
 * 카카오 로그인 에러 여부 확인
 * @param url - 현재 페이지 URL (기본값: window.location.href)
 * @returns 에러 발생 여부
 */
export const isKakaoLoginError = (url: string = window.location.href): boolean => {
  const urlObj = new URL(url);
  return urlObj.searchParams.has('error');
};

/**
 * 카카오 로그인 상태 확인 (성공, 실패, 대기 중)
 * @param url - 현재 페이지 URL (기본값: window.location.href)
 * @returns 'success' | 'error' | 'pending'
 */
export const getKakaoLoginStatus = (
  url: string = window.location.href,
): 'success' | 'error' | 'pending' => {
  if (isKakaoLoginSuccess(url)) {
    return 'success';
  }
  if (isKakaoLoginError(url)) {
    return 'error';
  }
  return 'pending';
};
