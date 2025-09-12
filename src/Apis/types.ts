import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface QueryOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  staleTime?: number;
  cacheTime?: number;
}

// 쿼리 API 옵션 타입
export interface QueryApiOptions<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, 'queryKey' | 'queryFn'> {
  onError?: (error: AxiosError) => void;
  headers?: Record<string, string>;
}
export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void;
}
