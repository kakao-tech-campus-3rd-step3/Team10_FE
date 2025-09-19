import { usePostApi } from './useMutationApi';

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * 토큰 갱신 API 훅
 */
export const useRefreshToken = () => {
  return usePostApi<RefreshTokenResponse, RefreshTokenRequest>('/api/auth/refresh');
};

/**
 * 로그아웃 API 훅
 */
export const useLogout = () => {
  return usePostApi<void, void>('/api/auth/logout');
};
