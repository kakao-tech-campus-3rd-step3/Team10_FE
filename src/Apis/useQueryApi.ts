import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from './axios';
import { handleApiError } from './queryClient';
export interface QueryApiOptions<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, 'queryKey' | 'queryFn'> {
  onError?: (error: AxiosError) => void;
}

// queryFnFactory 패턴
const queryFnFactory =
  <TData>(url: string, options?: QueryApiOptions<TData>) =>
  async () => {
    try {
      const response = await api.get<TData>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      handleApiError(axiosError);

      if (options?.onError) {
        options.onError(axiosError);
      }

      throw axiosError;
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
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    ...options, // 사용자 옵션이 기본값을 덮어씀
  });
};

// 사용 예시:
// const { data, isLoading, error } = useQueryApi(
//   ['users', page],
//   `/users?page=${page}`,
//   {
//     onError: (error) => console.log('사용자 목록 조회 실패:', error),
//     enabled: true,
//   }
// );
