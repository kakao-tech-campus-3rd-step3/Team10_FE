import { AxiosError } from 'axios';

/**
 * 카카오 로그인 비즈니스 로직 유틸리티
 * 순수 함수로 구성하여 테스트 가능하도록 설계
 */

/**
 * 신규 사용자 에러인지 확인 (401 에러)
 */
export const isNewUserError = (error: unknown): boolean => {
  const axiosError = error as AxiosError;
  return axiosError?.response?.status === 401;
};

/**
 * 회원가입 플로우를 사용해야 하는지 확인
 * sessionStorage에 닉네임이 저장되어 있는지 체크
 */
export const shouldUseRegisterFlow = (): boolean => {
  return sessionStorage.getItem('temp_nickname') !== null;
};

/**
 * 저장된 닉네임 가져오기
 */
export const getSavedNickname = (): string | null => {
  return sessionStorage.getItem('temp_nickname');
};

/**
 * 닉네임 저장 (캐릭터 생성 페이지에서 사용)
 */
export const saveNickname = (nickname: string): void => {
  sessionStorage.setItem('temp_nickname', nickname);
};

/**
 * 닉네임 삭제 (회원가입 완료 후)
 */
export const clearSavedNickname = (): void => {
  sessionStorage.removeItem('temp_nickname');
};

/**
 * 에러 발생 시 네비게이션 타겟 결정
 * @param error - 발생한 에러
 * @returns 리다이렉트할 경로
 */
export const getErrorNavigationTarget = (error: unknown): string => {
  if (isNewUserError(error)) {
    return '/character-create';
  }
  return '/login';
};

/**
 * 성공 시 네비게이션 타겟 결정
 * @returns 리다이렉트할 경로
 */
export const getSuccessNavigationTarget = (): string => {
  return '/home'; // 로그인/회원가입 모두 홈으로 이동
};

/**
 * 리다이렉트 지연 시간 결정
 * @param target - 리다이렉트 타겟 경로
 * @returns 지연 시간 (ms)
 */
export const getRedirectDelay = (target: string): number => {
  switch (target) {
    case '/home':
      return 2000; // 회원가입 성공 시
    case '/character-create':
      return 2000; // 신규 사용자
    case '/login':
      return 3000; // 에러 발생 시
    default:
      return 3000;
  }
};

/**
 * 로그인 성공 시 지연 시간 결정
 * @param isRegistration - 회원가입 플로우인지 여부
 * @returns 지연 시간 (ms)
 */
export const getLoginSuccessDelay = (isRegistration: boolean): number => {
  return isRegistration ? 2000 : 3000;
};

/**
 * 성공 메시지 생성
 * @param isRegistration - 회원가입 플로우인지 여부
 * @returns 성공 메시지
 */
export const getSuccessMessage = (isRegistration: boolean): string => {
  return isRegistration ? '회원가입이 완료되었습니다!' : '로그인이 완료되었습니다!';
};

/**
 * 에러 메시지 생성
 * @param error - 발생한 에러
 * @param kakaoErrorMessage - 카카오에서 받은 에러 메시지
 * @returns 사용자에게 표시할 에러 메시지
 */
export const getErrorMessage = (error: unknown, kakaoErrorMessage?: string | null): string => {
  if (isNewUserError(error)) {
    return '새로운 계정이 생성되었습니다!';
  }

  if (kakaoErrorMessage) {
    return `로그인 실패: ${kakaoErrorMessage}`;
  }

  return '로그인에 실패했습니다. 다시 시도해주세요.';
};

/**
 * 상태 타입 결정
 * @param error - 발생한 에러
 * @returns 상태 ('success' 또는 'error')
 */
export const getStatusFromError = (error: unknown): 'success' | 'error' => {
  return isNewUserError(error) ? 'success' : 'error';
};
