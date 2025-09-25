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

    if (originalRequest?.url?.includes('/user/login')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        return await handle401Error(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
