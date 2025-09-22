import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from './axios';
import { processApiError } from './queryClient';
import type { QueryApiOptions } from './types';

const queryFnFactory =
  <TData>(url: string, options?: QueryApiOptions<TData>) =>
  async () => {
    try {
      const response = await api.get<TData>(url, {
        headers: options?.headers,
      });
      return response.data;
    } catch (error) {
      processApiError(error);
      options?.onError?.(error as AxiosError);
      throw error;
    }
  };

export const useQueryApi = <TData>(
  queryKey: (string | number)[],
  url: string,
  options?: QueryApiOptions<TData>,
) => {
  return useQuery<TData, AxiosError>({
    queryKey,
    queryFn: queryFnFactory<TData>(url, options),
    refetchOnWindowFocus: false, // 쿼리 클라이언트 기본값과 다른 값만 명시
    ...options,
  });
};
