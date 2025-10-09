import { http, HttpResponse } from 'msw';

/**
 * 테스트용 MSW 핸들러
 * 카카오 로그인 전체 플로우 시나리오별 Mock 응답
 */
export const kakaoTestHandlers = [
  /**
   * 카카오 로그인 API
   * 시나리오별로 다른 응답 반환
   */
  http.post('https://sadajobe.shop/api/user/login', async ({ request }) => {
    const body = (await request.json()) as { code: string };

    // 시나리오 1: 기존 사용자 (200 성공)
    if (body.code === 'existing-user-code') {
      return HttpResponse.json({
        accessToken: 'mock-existing-user-token-12345',
      });
    }

    // 시나리오 2: 신규 사용자 (401 에러)
    if (body.code === 'new-user-code') {
      return HttpResponse.json({ message: 'User not found' }, { status: 401 });
    }

    // 시나리오 3: 회원가입 후 로그인
    if (body.code === 'after-register-code') {
      return HttpResponse.json({
        accessToken: 'mock-registered-user-token-12345',
      });
    }

    // 시나리오 4: 서버 에러
    if (body.code === 'server-error-code') {
      return HttpResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

    // 기본: 잘못된 코드
    return HttpResponse.json({ message: 'Invalid authorization code' }, { status: 400 });
  }),

  /**
   * 카카오 회원가입 API
   */
  http.post('https://sadajobe.shop/api/user/register', async ({ request }) => {
    const body = (await request.json()) as { code: string; nickname: string };

    // 닉네임 검증 실패
    if (body.nickname === '시발' || body.nickname === '병신') {
      return HttpResponse.json({ message: 'Invalid nickname' }, { status: 400 });
    }

    // 성공
    return HttpResponse.json({
      accessToken: 'mock-new-user-token-67890',
    });
  }),
];
