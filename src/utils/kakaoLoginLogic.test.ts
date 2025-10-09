import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AxiosError } from 'axios';
import {
  isNewUserError,
  shouldUseRegisterFlow,
  getSavedNickname,
  saveNickname,
  clearSavedNickname,
  getErrorNavigationTarget,
  getSuccessNavigationTarget,
  getRedirectDelay,
  getLoginSuccessDelay,
  getSuccessMessage,
  getErrorMessage,
  getStatusFromError,
} from './kakaoLoginLogic';

describe('카카오 로그인 비즈니스 로직', () => {
  // sessionStorage 초기화
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('통합 시나리오 테스트', () => {
    it('신규 사용자 플로우: 401 에러 → 캐릭터 생성 페이지 (2초)', () => {
      const error = { response: { status: 401 } } as AxiosError;

      expect(isNewUserError(error)).toBe(true);
      expect(getStatusFromError(error)).toBe('success');
      expect(getErrorMessage(error)).toContain('새로운 계정');
      expect(getErrorNavigationTarget(error)).toBe('/character-create');
      expect(getRedirectDelay('/character-create')).toBe(2000);
    });

    it('기존 사용자 플로우: 로그인 성공 → 홈 (3초)', () => {
      const isRegistration = false;

      expect(getSuccessMessage(isRegistration)).toContain('로그인이 완료');
      expect(getLoginSuccessDelay(isRegistration)).toBe(3000);
      expect(getSuccessNavigationTarget()).toBe('/home');
    });

    it('회원가입 플로우: 닉네임 있음 → 회원가입 → 홈 (2초)', () => {
      saveNickname('테스트유저');

      expect(shouldUseRegisterFlow()).toBe(true);
      expect(getSavedNickname()).toBe('테스트유저');

      const isRegistration = true;
      expect(getSuccessMessage(isRegistration)).toContain('회원가입이 완료');
      expect(getLoginSuccessDelay(isRegistration)).toBe(2000);
      expect(getSuccessNavigationTarget()).toBe('/home');

      clearSavedNickname();
      expect(getSavedNickname()).toBeNull();
    });

    it('서버 에러 플로우: 500 에러 → 로그인 페이지 (3초)', () => {
      const error = { response: { status: 500 } } as AxiosError;

      expect(isNewUserError(error)).toBe(false);
      expect(getStatusFromError(error)).toBe('error');
      expect(getErrorMessage(error)).toContain('로그인에 실패');
      expect(getErrorNavigationTarget(error)).toBe('/login');
      expect(getRedirectDelay('/login')).toBe(3000);
    });
  });
});
