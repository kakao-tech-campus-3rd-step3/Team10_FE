import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분
    },
    mutations: {
      retry: 1,
    },
  },
});

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError && error.response?.status === 401) {
    // 401 에러 시 로그인 페이지로 리다이렉트
    window.location.href = '/login';
    return { shouldRedirect: true, path: '/login' };
  }

  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';

  console.error('API Error:', errorMessage);

  return { shouldRedirect: false };
};
