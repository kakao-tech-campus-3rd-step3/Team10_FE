// API 응답 타입 정의
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

// 에러 응답 타입
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// 쿼리 옵션 타입
export interface QueryOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  staleTime?: number;
  cacheTime?: number;
}

// 뮤테이션 옵션 타입
export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void;
}
