import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from './axios';
import { processApiError } from './queryClient';
import type { HttpMethod, MutationApiOptions } from './types';

export const useMutationApi = <TData, TVariables = void>(
  method: HttpMethod,
  url: string,
  options?: MutationApiOptions<TData, TVariables>,
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await api[method]<TData>(url, variables);
        return response.data;
      } catch (error) {
        processApiError(error);
        throw error;
      }
    },
    ...options,
  });
};

const createMethodHook = <TData, TVariables = void>(method: HttpMethod) => {
  return (url: string, options?: MutationApiOptions<TData, TVariables>) =>
    useMutationApi<TData, TVariables>(method, url, options);
};

export const usePostApi = createMethodHook('post');
export const usePutApi = createMethodHook('put');
export const usePatchApi = createMethodHook('patch');
export const useDeleteApi = createMethodHook('delete');
