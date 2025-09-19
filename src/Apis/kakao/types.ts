// 카카오 로그인 관련 타입 정의

export interface KakaoLoginRequest {
  code: string;
}

export interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  user: KakaoUser;
}

export interface KakaoUser {
  id: string;
  nickname: string;
  email?: string;
  profile_image?: string;
}

export interface KakaoError {
  error: string;
  error_description?: string;
}

export interface KakaoLoginUrlParams {
  client_id: string;
  redirect_uri: string;
  response_type: 'code';
  scope?: string;
  state?: string;
}
