import axios from 'axios';
import { apiConfig } from './config';

export const api = axios.create({
  baseURL: apiConfig.getBaseURL(),
  timeout: apiConfig.timeout,
  withCredentials: apiConfig.withCredentials,
  headers: apiConfig.defaultHeaders,
});

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
