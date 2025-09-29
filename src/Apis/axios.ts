import axios, { type AxiosRequestConfig, AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { apiConfig } from './config';
import { handle401Error } from '@/utils/authInterceptor';

const axiosConfig: AxiosRequestConfig = {
  baseURL: apiConfig.getBaseURL(),
  timeout: apiConfig.timeout,
  withCredentials: apiConfig.withCredentials,
  headers: apiConfig.defaultHeaders,
};

export const api = axios.create(axiosConfig);

api.interceptors.request.use(
  (config) => {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith('access_token='));

    if (accessTokenCookie) {
      const accessToken = accessTokenCookie.split('=')[1];
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      originalRequest?.url?.includes('/user/login') ||
      originalRequest?.url?.includes('/auth/refresh')
    ) {
      console.log('로그인 관련 요청 - 토큰 갱신 시도하지 않음:', originalRequest?.url);
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      console.log('401 에러 감지 - 토큰 갱신 시도:', originalRequest?.url);
      originalRequest._retry = true;

      try {
        return await handle401Error(originalRequest);
      } catch (refreshError) {
        console.log('토큰 갱신 실패:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    console.log('에러 반환:', error.response?.status, originalRequest?.url);
    return Promise.reject(error);
  },
);

export default api;
