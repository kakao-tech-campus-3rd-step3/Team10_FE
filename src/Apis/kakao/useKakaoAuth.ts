import { usePostApi } from '../useMutationApi';
import { getKakaoLoginUrl } from './utils';
import type { KakaoLoginRequest, KakaoLoginResponse } from './types';

/**
 * 카카오 로그인 API 호출 훅
 */
export const useKakaoLogin = () => {
  return usePostApi<KakaoLoginResponse, KakaoLoginRequest>('/auth/kakao/login', {
    onSuccess: (data) => {
      // 로그인 성공 시 처리
      console.log('카카오 로그인 성공:', data);

      // 토큰을 쿠키에 저장 (백엔드에서 HttpOnly로 설정하는 것이 더 안전)
      // 또는 로컬스토리지에 저장
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
      }

      // 메인 페이지로 리다이렉트
      window.location.href = '/home';
    },
    onError: (error) => {
      // 로그인 실패 시 처리
      console.error('카카오 로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');

      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    },
  });
};

/**
 * 카카오 로그인 전체 프로세스 훅
 */
export const useKakaoAuth = () => {
  const { mutate: kakaoLogin, isPending } = useKakaoLogin();

  /**
   * 카카오 로그인 시작
   */
  const startKakaoLogin = () => {
    try {
      // 카카오 로그인 페이지로 리다이렉트
      const loginUrl = getKakaoLoginUrl();
      window.location.href = loginUrl;
    } catch (error) {
      console.error('카카오 로그인 URL 생성 실패:', error);
      alert('카카오 로그인 설정에 문제가 있습니다.');
    }
  };

  /**
   * authorization code로 백엔드에 로그인 요청
   */
  const loginWithCode = (authorizationCode: string) => {
    kakaoLogin({ authorization_code: authorizationCode });
  };

  return {
    startKakaoLogin,
    loginWithCode,
    isPending,
  };
};
