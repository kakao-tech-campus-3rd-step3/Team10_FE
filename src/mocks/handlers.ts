import { http, HttpResponse } from 'msw';

/**
 * MSW API 핸들러 모음
 *
 * @description 개발 환경에서 실제 API 서버 없이 가짜 응답을 반환하는 핸들러들
 * @author 개발팀
 * @version 1.0.0
 * @since 2024-01-01
 */
export const handlers = [
  /**
   * 카카오 로그인 API 모킹
   *
   * @description 카카오 OAuth 인증 코드를 받아서 액세스 토큰과 사용자 정보를 반환
   * @param {Object} request - HTTP 요청 객체
   * @param {Object} request.body - 요청 본문 (authorization code 포함)
   * @param {string} request.body.code - 카카오에서 받은 인증 코드
   * @returns {Object} 로그인 응답 데이터
   * @returns {string} returns.accessToken - 액세스 토큰
   * @returns {string} returns.refreshToken - 리프레시 토큰
   * @returns {string} returns.userId - 사용자 ID
   * @returns {Object} returns.user - 사용자 정보
   * @example
   * 요청
   * POST /api/login
   * { "code": "authorization_code_from_kakao" }
   *
   * 응답
   * {
   *   "accessToken": "mock-access-token-12345",
   *   "refreshToken": "mock-refresh-token-67890",
   *   "userId": "mock-user-123",
   *   "user": { "id": "mock-user-123", "nickname": "테스트유저" }
   * }
   */
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { code: string };
    console.log('MSW: 카카오 로그인 요청 받음', body);

    const response = {
      accessToken: 'mock-access-token-12345',
      refreshToken: 'mock-refresh-token-67890',
      userId: 'mock-user-123',
      user: {
        id: 'mock-user-123',
        nickname: '테스트유저',
        profileImage: 'https://via.placeholder.com/100',
        email: 'test@example.com',
      },
    };

    console.log('MSW: 카카오 로그인 응답 반환', response);
    return HttpResponse.json(response);
  }),

  /**
   * 토큰 갱신 API 모킹
   *
   * @description 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급
   * @param {Object} request - HTTP 요청 객체
   * @param {Object} request.body - 요청 본문
   * @param {string} request.body.refreshToken - 리프레시 토큰
   * @returns {Object} 토큰 갱신 응답 데이터
   * @returns {string} returns.accessToken - 새로운 액세스 토큰
   * @returns {string} returns.refreshToken - 새로운 리프레시 토큰
   * @throws {401} 유효하지 않은 리프레시 토큰인 경우
   * @example
   * 요청
   * POST /api/auth/refresh
   * { "refreshToken": "mock-refresh-token-67890" }
   *
   * 응답
   * {
   *   "accessToken": "new-mock-access-token-54321",
   *   "refreshToken": "new-mock-refresh-token-09876"
   * }
   */
  http.post('/api/auth/refresh', async ({ request }) => {
    const { refreshToken } = (await request.json()) as { refreshToken: string };

    if (refreshToken === 'mock-refresh-token-67890') {
      return HttpResponse.json({
        accessToken: 'new-mock-access-token-54321',
        refreshToken: 'new-mock-refresh-token-09876',
      });
    }

    return HttpResponse.json({ message: '유효하지 않은 리프레시 토큰' }, { status: 401 });
  }),

  /**
   * 로그아웃 API 모킹
   *
   * @description 사용자 로그아웃 처리
   * @returns {Object} 로그아웃 성공 메시지
   * @returns {string} returns.message - 성공 메시지
   * @example
   * 요청
   * POST /api/auth/logout
   *
   * 응답
   * { "message": "로그아웃 성공" }
   */
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: '로그아웃 성공' });
  }),

  /**
   * 퀴즈 목록 조회 API 모킹
   *
   * @description 사용 가능한 퀴즈 목록을 반환
   * @returns {Array} 퀴즈 목록 배열
   * @returns {number} returns[].id - 퀴즈 ID
   * @returns {string} returns[].title - 퀴즈 제목
   * @returns {string} returns[].description - 퀴즈 설명
   * @returns {string} returns[].difficulty - 난이도 (easy, medium, hard)
   * @returns {number} returns[].questionCount - 문제 개수
   * @returns {number} returns[].timeLimit - 제한 시간 (초)
   * @example
   * 요청
   * GET /api/quiz
   *
   * 응답
   * [
   *   {
   *     "id": 1,
   *     "title": "기본 경제 상식",
   *     "description": "경제의 기본 개념을 알아보세요",
   *     "difficulty": "easy",
   *     "questionCount": 10,
   *     "timeLimit": 300
   *   }
   * ]
   */
  http.get('/api/quiz', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: '기본 경제 상식',
        description: '경제의 기본 개념을 알아보세요',
        difficulty: 'easy',
        questionCount: 10,
        timeLimit: 300,
      },
      {
        id: 2,
        title: '주식 투자 기초',
        description: '주식 투자의 기본 원리를 학습하세요',
        difficulty: 'medium',
        questionCount: 15,
        timeLimit: 450,
      },
    ]);
  }),

  /**
   * 퀴즈 상세 조회 API 모킹
   *
   * @description 특정 퀴즈의 상세 정보와 문제들을 반환
   * @param {Object} params - URL 파라미터
   * @param {string} params.id - 퀴즈 ID
   * @returns {Object} 퀴즈 상세 정보
   * @returns {number} returns.id - 퀴즈 ID
   * @returns {string} returns.title - 퀴즈 제목
   * @returns {string} returns.description - 퀴즈 설명
   * @returns {Array} returns.questions - 문제 배열
   * @returns {number} returns.questions[].id - 문제 ID
   * @returns {string} returns.questions[].question - 문제 내용
   * @returns {Array} returns.questions[].options - 선택지 배열
   * @returns {number} returns.questions[].correctAnswer - 정답 인덱스
   * @returns {string} returns.questions[].explanation - 해설
   * @example
   * 요청
   * GET /api/quiz/1
   *
   * 응답
   * {
   *   "id": 1,
   *   "title": "기본 경제 상식",
   *   "questions": [
   *     {
   *       "id": 1,
   *       "question": "GDP는 무엇의 약자인가요?",
   *       "options": ["Gross Domestic Product", "General Data Processing"],
   *       "correctAnswer": 0,
   *       "explanation": "GDP는 국내총생산의 약자입니다."
   *     }
   *   ]
   * }
   */
  http.get('/api/quiz/:id', ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
      title: '기본 경제 상식',
      description: '경제의 기본 개념을 알아보세요',
      questions: [
        {
          id: 1,
          question: 'GDP는 무엇의 약자인가요?',
          options: [
            'Gross Domestic Product',
            'General Data Processing',
            'Global Development Program',
          ],
          correctAnswer: 0,
          explanation: 'GDP는 국내총생산(Gross Domestic Product)의 약자입니다.',
        },
        {
          id: 2,
          question: '인플레이션이란 무엇인가요?',
          options: ['물가 상승', '물가 하락', '경제 성장'],
          correctAnswer: 0,
          explanation: '인플레이션은 일반적인 물가 수준의 지속적인 상승을 의미합니다.',
        },
      ],
    });
  }),

  /**
   * 랭킹 조회 API 모킹
   *
   * @description 사용자 랭킹 정보와 상위 랭킹 목록을 반환
   * @returns {Object} 랭킹 정보
   * @returns {Object} returns.myRank - 내 랭킹 정보
   * @returns {number} returns.myRank.rank - 내 순위
   * @returns {number} returns.myRank.score - 내 점수
   * @returns {string} returns.myRank.nickname - 내 닉네임
   * @returns {Array} returns.topRanks - 상위 랭킹 목록
   * @returns {number} returns.topRanks[].rank - 순위
   * @returns {number} returns.topRanks[].score - 점수
   * @returns {string} returns.topRanks[].nickname - 닉네임
   * @example
   * 요청
   * GET /api/rank
   *
   * 응답
   * {
   *   "myRank": { "rank": 15, "score": 850, "nickname": "테스트유저" },
   *   "topRanks": [
   *     { "rank": 1, "score": 1200, "nickname": "경제고수" }
   *   ]
   * }
   */
  http.get('/api/rank', () => {
    return HttpResponse.json({
      myRank: {
        rank: 15,
        score: 850,
        nickname: '테스트유저',
      },
      topRanks: [
        { rank: 1, score: 1200, nickname: '경제고수' },
        { rank: 2, score: 1150, nickname: '투자왕' },
        { rank: 3, score: 1100, nickname: '머니마스터' },
      ],
    });
  }),

  /**
   * 학습 기록 조회 API 모킹
   *
   * @description 사용자의 퀴즈 학습 기록 목록을 반환
   * @returns {Array} 학습 기록 배열
   * @returns {number} returns[].id - 기록 ID
   * @returns {string} returns[].quizTitle - 퀴즈 제목
   * @returns {number} returns[].score - 획득 점수
   * @returns {string} returns[].completedAt - 완료 시간 (ISO 8601)
   * @returns {number} returns[].timeSpent - 소요 시간 (초)
   * @example
   * 요청
   * GET /api/learning-record
   *
   * 응답
   * [
   *   {
   *     "id": 1,
   *     "quizTitle": "기본 경제 상식",
   *     "score": 85,
   *     "completedAt": "2024-01-15T10:30:00Z",
   *     "timeSpent": 280
   *   }
   * ]
   */
  http.get('/api/learning-record', () => {
    return HttpResponse.json([
      {
        id: 1,
        quizTitle: '기본 경제 상식',
        score: 85,
        completedAt: '2024-01-15T10:30:00Z',
        timeSpent: 280,
      },
      {
        id: 2,
        quizTitle: '주식 투자 기초',
        score: 92,
        completedAt: '2024-01-14T15:45:00Z',
        timeSpent: 420,
      },
    ]);
  }),

  /**
   * 에러 응답 예시 API 모킹
   *
   * @description 서버 오류 상황을 시뮬레이션
   * @returns {Object} 에러 응답 (HTTP 500)
   * @returns {string} returns.message - 에러 메시지
   * @returns {string} returns.code - 에러 코드
   * @throws {500} 서버 내부 오류
   * @example
   * 요청
   * GET /api/error
   *
   * 응답 (HTTP 500)
   * {
   *   "message": "서버 오류가 발생했습니다",
   *   "code": "INTERNAL_SERVER_ERROR"
   * }
   */
  http.get('/api/error', () => {
    return HttpResponse.json(
      {
        message: '서버 오류가 발생했습니다',
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 },
    );
  }),

  /**
   * 네트워크 지연 시뮬레이션 API 모킹
   *
   * @description 네트워크 지연 상황을 시뮬레이션 (2초 지연)
   * @returns {Object} 지연 응답
   * @returns {string} returns.message - 응답 메시지
   * @example
   * 요청
   * GET /api/slow
   *
   * 응답 (2초 후)
   * { "message": "느린 응답" }
   */
  http.get('/api/slow', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return HttpResponse.json({ message: '느린 응답' });
  }),
];
