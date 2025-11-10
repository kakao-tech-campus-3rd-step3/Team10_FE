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

export interface QueryApiOptions<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, 'queryKey' | 'queryFn'> {
  headers?: Record<string, string>;
}
export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void;
}

export interface ApiConfig {
  getBaseURL: () => string;
  timeout: number;
  withCredentials: boolean;
  defaultHeaders: {
    'Content-Type': string;
  };
}

export type HttpMethod = 'post' | 'put' | 'delete' | 'patch';

export type MutationApiOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables>,
  'mutationFn'
>;
