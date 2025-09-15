import { DEFAULT_API_TIMEOUT, DEFAULT_API_BASE_URL, CONTENT_TYPES } from './constants';
import type { ApiConfig } from './types';

const createBaseURL = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (envUrl) {
    return envUrl;
  }

  console.warn('VITE_API_URL 환경 변수가 설정되지 않았습니다. 개발 환경 기본값을 사용합니다.');
  return DEFAULT_API_BASE_URL;
};

export const apiConfig: ApiConfig = {
  getBaseURL: createBaseURL,
  timeout: DEFAULT_API_TIMEOUT,
  withCredentials: true,
  defaultHeaders: {
    'Content-Type': CONTENT_TYPES.JSON,
  },
};
