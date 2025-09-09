import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from './axios';

export type MutationApiOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables>,
  'mutationFn'
>;

export const useMutationApi = <TData, TVariables = void>(
  method: 'post' | 'put' | 'delete' | 'patch',
  url: string,
  options?: MutationApiOptions<TData, TVariables>,
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await api[method]<TData>(url, variables);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError;
      }
    },
    ...options,
  });
};

export const usePostApi = <TData, TVariables = void>(
  url: string,
  options?: MutationApiOptions<TData, TVariables>,
) => {
  return useMutationApi<TData, TVariables>('post', url, options);
};

export const usePutApi = <TData, TVariables = void>(
  url: string,
  options?: MutationApiOptions<TData, TVariables>,
) => {
  return useMutationApi<TData, TVariables>('put', url, options);
};

export const usePatchApi = <TData, TVariables = void>(
  url: string,
  options?: MutationApiOptions<TData, TVariables>,
) => {
  return useMutationApi<TData, TVariables>('patch', url, options);
};

export const useDeleteApi = <TData, TVariables = void>(
  url: string,
  options?: MutationApiOptions<TData, TVariables>,
) => {
  return useMutationApi<TData, TVariables>('delete', url, options);
};
