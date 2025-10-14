import { describe, it, expect } from 'vitest';
import type { Quiz } from '@/Pages/QuizPage/types';
import {
  findNextQuiz,
  findNextUnsolvedQuiz,
  isLastQuiz,
  getQuizProgress,
  getNextQuizButtonText,
  getNextQuizPath,
} from './quizNavigationLogic';

describe('퀴즈 네비게이션 로직', () => {
  const mockQuizzes: Quiz[] = [
    {
      quizId: 1,
      questionOrder: 1,
      questionTitle: '문제1',
      difficultyLevel: 'EASY',
      isSolved: true,
    },
    {
      quizId: 2,
      questionOrder: 2,
      questionTitle: '문제2',
      difficultyLevel: 'MEDIUM',
      isSolved: false,
    },
    {
      quizId: 3,
      questionOrder: 3,
      questionTitle: '문제3',
      difficultyLevel: 'HARD',
      isSolved: false,
    },
    {
      quizId: 4,
      questionOrder: 4,
      questionTitle: '문제4',
      difficultyLevel: 'EASY',
      isSolved: true,
    },
    {
      quizId: 5,
      questionOrder: 5,
      questionTitle: '문제5',
      difficultyLevel: 'MEDIUM',
      isSolved: false,
    },
  ];

  describe('findNextQuiz - 다음 문제 찾기', () => {
    it('현재 퀴즈의 다음 퀴즈를 반환한다', () => {
      const next = findNextQuiz(mockQuizzes, 2);
      expect(next?.quizId).toBe(3);
      expect(next?.questionOrder).toBe(3);
    });

    it('마지막 퀴즈면 null을 반환한다', () => {
      const next = findNextQuiz(mockQuizzes, 5);
      expect(next).toBeNull();
    });

    it('존재하지 않는 quizId면 null을 반환한다', () => {
      const next = findNextQuiz(mockQuizzes, 999);
      expect(next).toBeNull();
    });

    it('빈 배열이면 null을 반환한다', () => {
      const next = findNextQuiz([], 1);
      expect(next).toBeNull();
    });

    it('첫 번째 퀴즈의 다음 퀴즈를 찾는다', () => {
      const next = findNextQuiz(mockQuizzes, 1);
      expect(next?.quizId).toBe(2);
      expect(next?.questionOrder).toBe(2);
    });
  });

  describe('findNextUnsolvedQuiz - 다음 안 푼 문제 찾기', () => {
    it('다음 안 푼 문제를 찾는다', () => {
      const next = findNextUnsolvedQuiz(mockQuizzes, 1);
      expect(next?.quizId).toBe(2);
      expect(next?.isSolved).toBe(false);
    });

    it('푼 문제는 건너뛴다', () => {
      const next = findNextUnsolvedQuiz(mockQuizzes, 3);
      // quizId 4는 isSolved: true이므로 건너뜀
      expect(next?.quizId).toBe(5);
      expect(next?.isSolved).toBe(false);
    });

    it('다음 안 푼 문제가 없으면 null을 반환한다', () => {
      const allSolved = mockQuizzes.map((q) => ({ ...q, isSolved: true }));
      const next = findNextUnsolvedQuiz(allSolved, 1);
      expect(next).toBeNull();
    });

    it('마지막 문제면 null을 반환한다', () => {
      const next = findNextUnsolvedQuiz(mockQuizzes, 5);
      expect(next).toBeNull();
    });
  });

  describe('isLastQuiz - 마지막 문제 확인', () => {
    it('마지막 퀴즈면 true를 반환한다', () => {
      expect(isLastQuiz(mockQuizzes, 5)).toBe(true);
    });

    it('마지막이 아니면 false를 반환한다', () => {
      expect(isLastQuiz(mockQuizzes, 3)).toBe(false);
    });

    it('빈 배열이면 true를 반환한다', () => {
      expect(isLastQuiz([], 1)).toBe(true);
    });

    it('존재하지 않는 quizId면 false를 반환한다', () => {
      expect(isLastQuiz(mockQuizzes, 999)).toBe(false);
    });
  });

  describe('getQuizProgress - 진행 상황', () => {
    it('현재 위치와 전체 개수를 반환한다', () => {
      const progress = getQuizProgress(mockQuizzes, 3);
      expect(progress).toEqual({ current: 3, total: 5 });
    });

    it('첫 번째 퀴즈의 진행 상황', () => {
      const progress = getQuizProgress(mockQuizzes, 1);
      expect(progress).toEqual({ current: 1, total: 5 });
    });

    it('마지막 퀴즈의 진행 상황', () => {
      const progress = getQuizProgress(mockQuizzes, 5);
      expect(progress).toEqual({ current: 5, total: 5 });
    });

    it('존재하지 않는 quizId면 current: 0을 반환한다', () => {
      const progress = getQuizProgress(mockQuizzes, 999);
      expect(progress).toEqual({ current: 0, total: 5 });
    });

    it('빈 배열이면 0/0을 반환한다', () => {
      const progress = getQuizProgress([], 1);
      expect(progress).toEqual({ current: 0, total: 0 });
    });
  });

  describe('getNextQuizButtonText - 버튼 텍스트', () => {
    it('다음 문제가 있고 안 푼 문제면 "다음 문제"', () => {
      const text = getNextQuizButtonText(true, true);
      expect(text).toBe('다음 문제');
    });

    it('다음 문제가 있지만 이미 풀었으면 "다음 문제 (풀이 완료)"', () => {
      const text = getNextQuizButtonText(true, false);
      expect(text).toBe('다음 문제 (풀이 완료)');
    });

    it('다음 문제가 없으면 "완료"', () => {
      const text = getNextQuizButtonText(false, false);
      expect(text).toBe('완료');
    });

    it('다음 문제가 없으면 안 푼 문제 여부와 무관하게 "완료"', () => {
      const text = getNextQuizButtonText(false, true);
      expect(text).toBe('완료');
    });
  });

  describe('getNextQuizPath - 네비게이션 경로', () => {
    it('다음 퀴즈가 있으면 퀴즈 풀기 경로', () => {
      const path = getNextQuizPath(10, 25);
      expect(path).toBe('/quizSolve/25');
    });

    it('다음 퀴즈가 없으면 퀴즈 목록 경로', () => {
      const path = getNextQuizPath(10, null);
      expect(path).toBe('/quizList/10');
    });

    it('topicId가 다르면 해당 토픽의 목록으로', () => {
      const path = getNextQuizPath(5, null);
      expect(path).toBe('/quizList/5');
    });
  });

  describe('통합 시나리오 테스트', () => {
    it('시나리오 1: 중간 문제 → 다음 문제로', () => {
      const currentQuizId = 2;

      const nextQuiz = findNextQuiz(mockQuizzes, currentQuizId);
      expect(nextQuiz?.quizId).toBe(3);

      const isLast = isLastQuiz(mockQuizzes, currentQuizId);
      expect(isLast).toBe(false);

      const progress = getQuizProgress(mockQuizzes, currentQuizId);
      expect(progress).toEqual({ current: 2, total: 5 });

      const path = getNextQuizPath(10, nextQuiz?.quizId || null);
      expect(path).toBe('/quizSolve/3');
    });

    it('시나리오 2: 마지막 문제 → 목록으로', () => {
      const currentQuizId = 5;

      const nextQuiz = findNextQuiz(mockQuizzes, currentQuizId);
      expect(nextQuiz).toBeNull();

      const isLast = isLastQuiz(mockQuizzes, currentQuizId);
      expect(isLast).toBe(true);

      const progress = getQuizProgress(mockQuizzes, currentQuizId);
      expect(progress).toEqual({ current: 5, total: 5 });

      const path = getNextQuizPath(10, null);
      expect(path).toBe('/quizList/10');

      const buttonText = getNextQuizButtonText(false, false);
      expect(buttonText).toBe('완료');
    });

    it('시나리오 3: 안 푼 문제만 찾기', () => {
      const currentQuizId = 3; // 다음이 4번(풀림), 5번(안 풀림)

      const nextUnsolved = findNextUnsolvedQuiz(mockQuizzes, currentQuizId);
      expect(nextUnsolved?.quizId).toBe(5); // 4번은 건너뜀

      const buttonText = getNextQuizButtonText(true, true);
      expect(buttonText).toBe('다음 문제');
    });
  });
});
