import axios from 'axios';

// 환경에 따른 baseURL 설정
const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return 'https://sadajobe.shop'; // 프로덕션
  }
  return '/api'; // 개발환경 (Vite 프록시)
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // 10초 타임아웃
  withCredentials: true, // 쿠키 자동 전송
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (쿠키는 자동으로 전송됨)
api.interceptors.request.use(
  (config) => {
    // withCredentials: true로 설정되어 있어 쿠키가 자동으로 전송됨
    // 추가 헤더나 인증 정보가 필요하면 여기에 추가
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 로그인 페이지로 리다이렉트
    // 쿠키는 서버에서 HttpOnly로 관리되므로 클라이언트에서 직접 삭제할 수 없음
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
