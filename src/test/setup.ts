import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { kakaoTestHandlers } from './handlers';

// 테스트 환경변수 설정
import.meta.env.VITE_KAKAO_CLIENT_ID = 'test-client-id';
import.meta.env.VITE_KAKAO_REDIRECT_URI = 'http://localhost:5173/auth/kakao/callback';

// MSW 서버 설정 (Node 환경용)
export const server = setupServer(...kakaoTestHandlers);

// 모든 테스트 시작 전 MSW 서버 시작
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

// 각 테스트 후 정리
afterEach(() => {
  cleanup();
  server.resetHandlers();
  sessionStorage.clear();
  localStorage.clear();
});

// 모든 테스트 종료 후 서버 종료
afterAll(() => {
  server.close();
});
