import { describe, it, expect } from 'vitest';
import {
  getKakaoLoginUrl,
  getKakaoAuthorizationCode,
  getKakaoErrorMessage,
  isKakaoLoginSuccess,
  isKakaoLoginError,
  getKakaoLoginStatus,
} from './utils';

describe('Kakao Utils - Pure Functions', () => {
  describe('getKakaoLoginUrl', () => {
    it('카카오 로그인 URL을 생성한다', () => {
      const url = getKakaoLoginUrl();

      expect(url).toContain('https://kauth.kakao.com/oauth/authorize');
      expect(url).toContain('client_id=');
      expect(url).toContain('redirect_uri=');
      expect(url).toContain('response_type=code');
    });
  });

  describe('getKakaoAuthorizationCode', () => {
    it('URL에서 authorization code를 추출한다', () => {
      const url = 'http://localhost/callback?code=test-auth-code-123';
      const code = getKakaoAuthorizationCode(url);

      expect(code).toBe('test-auth-code-123');
    });

    it('code 파라미터가 없으면 null을 반환한다', () => {
      const url = 'http://localhost/callback';
      const code = getKakaoAuthorizationCode(url);

      expect(code).toBeNull();
    });

    it('다른 파라미터가 있어도 code만 정확히 추출한다', () => {
      const url = 'http://localhost/callback?state=abc&code=my-code&other=value';
      const code = getKakaoAuthorizationCode(url);

      expect(code).toBe('my-code');
    });
  });

  describe('getKakaoErrorMessage', () => {
    it('error_description을 우선적으로 반환한다', () => {
      const url = 'http://localhost/callback?error_description=Access+denied&error=denied';
      const message = getKakaoErrorMessage(url);

      expect(message).toBe('Access denied');
    });

    it('error_description이 없으면 error를 반환한다', () => {
      const url = 'http://localhost/callback?error=access_denied';
      const message = getKakaoErrorMessage(url);

      expect(message).toBe('access_denied');
    });

    it('에러 파라미터가 없으면 null을 반환한다', () => {
      const url = 'http://localhost/callback';
      const message = getKakaoErrorMessage(url);

      expect(message).toBeNull();
    });
  });

  describe('isKakaoLoginSuccess', () => {
    it('code가 있으면 true를 반환한다', () => {
      const url = 'http://localhost/callback?code=abc123';
      expect(isKakaoLoginSuccess(url)).toBe(true);
    });

    it('code가 없으면 false를 반환한다', () => {
      const url = 'http://localhost/callback';
      expect(isKakaoLoginSuccess(url)).toBe(false);
    });
  });

  describe('isKakaoLoginError', () => {
    it('error 파라미터가 있으면 true를 반환한다', () => {
      const url = 'http://localhost/callback?error=access_denied';
      expect(isKakaoLoginError(url)).toBe(true);
    });

    it('error 파라미터가 없으면 false를 반환한다', () => {
      const url = 'http://localhost/callback?code=abc';
      expect(isKakaoLoginError(url)).toBe(false);
    });
  });

  describe('getKakaoLoginStatus', () => {
    it('code가 있으면 "success"를 반환한다', () => {
      const url = 'http://localhost/callback?code=abc123';
      expect(getKakaoLoginStatus(url)).toBe('success');
    });

    it('error가 있으면 "error"를 반환한다', () => {
      const url = 'http://localhost/callback?error=access_denied';
      expect(getKakaoLoginStatus(url)).toBe('error');
    });

    it('code와 error가 모두 없으면 "pending"을 반환한다', () => {
      const url = 'http://localhost/callback';
      expect(getKakaoLoginStatus(url)).toBe('pending');
    });

    it('code와 error가 모두 있으면 "success"를 우선한다', () => {
      const url = 'http://localhost/callback?code=abc&error=test';
      expect(getKakaoLoginStatus(url)).toBe('success');
    });
  });
});
