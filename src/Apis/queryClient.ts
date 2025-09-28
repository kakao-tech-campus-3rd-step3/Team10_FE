import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: (failureCount, error) => {
        if (
          error instanceof AxiosError &&
          error.response?.status &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});

export const handleApiError = (error: unknown) => {
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';

  console.error('API Error:', errorMessage);

  return { shouldRedirect: false };
};

export const processApiError = (error: unknown): AxiosError => {
  const axiosError = error as AxiosError;
  handleApiError(axiosError);
  return axiosError;
};
