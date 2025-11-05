import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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
  headers?: Record<string, string>;
}
export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void;
}

// API 설정 관련 타입
export interface ApiConfig {
  getBaseURL: () => string;
  timeout: number;
  withCredentials: boolean;
  defaultHeaders: {
    'Content-Type': string;
  };
}

// HTTP 메서드 타입
export type HttpMethod = 'post' | 'put' | 'delete' | 'patch';

// 뮤테이션 API 옵션 타입
export type MutationApiOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables>,
  'mutationFn'
>;
