import axios, { type AxiosRequestConfig } from 'axios';
import { apiConfig } from './config';

const axiosConfig: AxiosRequestConfig = {
  baseURL: apiConfig.getBaseURL(),
  timeout: apiConfig.timeout,
  withCredentials: apiConfig.withCredentials,
  headers: apiConfig.defaultHeaders,
};

export const api = axios.create(axiosConfig);

api.interceptors.request.use(
  (config) => {
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
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
