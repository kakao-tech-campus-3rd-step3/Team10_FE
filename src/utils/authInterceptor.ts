import type { InternalAxiosRequestConfig } from 'axios';
import { api } from '@/Apis/axios';

/**
 * 토큰 갱신 함수
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const cookies = document.cookie.split(';');
    const refreshTokenCookie = cookies.find((cookie) => cookie.trim().startsWith('refresh_token='));

    if (!refreshTokenCookie) {
      return null;
    }

    const refreshToken = refreshTokenCookie.split('=')[1];

    const response = await api.post('/auth/refresh', {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    document.cookie = `access_token=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
    document.cookie = `refresh_token=${newRefreshToken}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=strict`;

    return accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
};

/**
 * 로그아웃 처리 함수
 */
export const handleLogout = () => {
  document.cookie = 'access_token=; path=/; max-age=0';
  document.cookie = 'refresh_token=; path=/; max-age=0';
  localStorage.removeItem('userId');
  window.location.href = '/login';
};

/**
 * 401 에러 처리 함수
 */
export const handle401Error = async (
  originalRequest: InternalAxiosRequestConfig,
): Promise<unknown> => {
  const newAccessToken = await refreshAccessToken();

  if (newAccessToken) {
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return api(originalRequest);
  } else {
    handleLogout();
    return Promise.reject(new Error('토큰 갱신 실패'));
  }
};
