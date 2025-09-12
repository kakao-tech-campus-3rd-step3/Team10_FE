// API 설정 관리
export const apiConfig = {
  getBaseURL: () => {
    const envUrl = import.meta.env.VITE_API_URL;

    if (envUrl) {
      return envUrl;
    }

    console.warn('VITE_API_URL 환경 변수가 설정되지 않았습니다. 개발 환경 기본값을 사용합니다.');
    return '/api';
  },

  timeout: 10000,

  withCredentials: true,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
} as const;
