import { describe, it, expect } from 'vitest';
import type { Quiz } from '@/Pages/QuizPage/types';
import {
  findNextQuiz,
  findNextUnsolvedQuiz,
  isLastQuiz,
  getQuizProgress,
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
    it('중간 문제의 다음 문제를 찾는다', () => {
      const nextQuiz = findNextQuiz(mockQuizzes, 2);
      expect(nextQuiz?.quizId).toBe(3);
    });

    it('마지막 문제의 다음 문제는 null을 반환한다', () => {
      const nextQuiz = findNextQuiz(mockQuizzes, 5);
      expect(nextQuiz).toBeNull();
    });

    it('존재하지 않는 퀴즈 ID는 null을 반환한다', () => {
      const nextQuiz = findNextQuiz(mockQuizzes, 999);
      expect(nextQuiz).toBeNull();
    });

    it('빈 배열에서는 null을 반환한다', () => {
      const nextQuiz = findNextQuiz([], 1);
      expect(nextQuiz).toBeNull();
    });
  });

  describe('findNextUnsolvedQuiz - 안 푼 문제 찾기', () => {
    it('다음 안 푼 문제를 찾는다', () => {
      const nextUnsolved = findNextUnsolvedQuiz(mockQuizzes, 3);
      expect(nextUnsolved?.quizId).toBe(5); // 4번은 이미 풀어서 건너뜀
    });

    it('바로 다음이 안 푼 문제면 그것을 반환한다', () => {
      const nextUnsolved = findNextUnsolvedQuiz(mockQuizzes, 1);
      expect(nextUnsolved?.quizId).toBe(2);
    });

    it('다음 안 푼 문제가 없으면 null을 반환한다', () => {
      const nextUnsolved = findNextUnsolvedQuiz(mockQuizzes, 5);
      expect(nextUnsolved).toBeNull();
    });

    it('존재하지 않는 퀴즈 ID는 null을 반환한다', () => {
      const nextUnsolved = findNextUnsolvedQuiz(mockQuizzes, 999);
      expect(nextUnsolved).toBeNull();
    });
  });

  describe('isLastQuiz - 마지막 문제 확인', () => {
    it('마지막 문제면 true를 반환한다', () => {
      expect(isLastQuiz(mockQuizzes, 5)).toBe(true);
    });

    it('마지막이 아닌 문제면 false를 반환한다', () => {
      expect(isLastQuiz(mockQuizzes, 3)).toBe(false);
    });

    it('존재하지 않는 퀴즈 ID는 false를 반환한다', () => {
      expect(isLastQuiz(mockQuizzes, 999)).toBe(false);
    });

    it('빈 배열에서는 true를 반환한다', () => {
      expect(isLastQuiz([], 1)).toBe(true);
    });
  });

  describe('getQuizProgress - 진행 상황 계산', () => {
    it('현재 문제의 진행 상황을 반환한다', () => {
      expect(getQuizProgress(mockQuizzes, 3)).toEqual({ current: 3, total: 5 });
    });

    it('첫 번째 문제의 진행 상황을 반환한다', () => {
      expect(getQuizProgress(mockQuizzes, 1)).toEqual({ current: 1, total: 5 });
    });

    it('마지막 문제의 진행 상황을 반환한다', () => {
      expect(getQuizProgress(mockQuizzes, 5)).toEqual({ current: 5, total: 5 });
    });

    it('존재하지 않는 퀴즈 ID는 current 0을 반환한다', () => {
      expect(getQuizProgress(mockQuizzes, 999)).toEqual({ current: 0, total: 5 });
    });
  });

  describe('getNextQuizPath - 다음 경로 결정', () => {
    it('다음 퀴즈가 있으면 풀이 페이지 경로를 반환한다', () => {
      const path = getNextQuizPath(10, 3);
      expect(path).toBe('/topics/10/quizzes/3');
    });

    it('다음 퀴즈가 없으면 목록 페이지 경로를 반환한다', () => {
      const path = getNextQuizPath(10, null);
      expect(path).toBe('/topics/10/quizzes');
    });
  });

  describe('통합 시나리오 테스트', () => {
    it('시나리오 1: 중간 문제에서 다음 문제로 이동', () => {
      const currentQuizId = 2;

      // 1. 다음 문제 찾기
      const nextQuiz = findNextQuiz(mockQuizzes, currentQuizId);
      expect(nextQuiz?.quizId).toBe(3);

      // 2. 마지막 문제가 아님을 확인
      const isLast = isLastQuiz(mockQuizzes, currentQuizId);
      expect(isLast).toBe(false);

      // 3. 다음 문제 경로 생성
      const path = getNextQuizPath(10, nextQuiz?.quizId || null);
      expect(path).toBe('/topics/10/quizzes/3');
    });

    it('시나리오 2: 마지막 문제에서 목록으로 이동', () => {
      const currentQuizId = 5;

      // 1. 다음 문제 없음
      const nextQuiz = findNextQuiz(mockQuizzes, currentQuizId);
      expect(nextQuiz).toBeNull();

      // 2. 마지막 문제임을 확인
      const isLast = isLastQuiz(mockQuizzes, currentQuizId);
      expect(isLast).toBe(true);

      // 3. 목록 페이지 경로 생성
      const path = getNextQuizPath(10, null);
      expect(path).toBe('/topics/10/quizzes');
    });

    it('시나리오 3: 안 푼 문제만 필터링하여 이동', () => {
      const currentQuizId = 3;

      // 1. 일반 다음 문제는 4번
      const nextQuiz = findNextQuiz(mockQuizzes, currentQuizId);
      expect(nextQuiz?.quizId).toBe(4);

      // 2. 안 푼 다음 문제는 5번 (4번은 이미 풀림)
      const nextUnsolved = findNextUnsolvedQuiz(mockQuizzes, currentQuizId);
      expect(nextUnsolved?.quizId).toBe(5);

      // 3. 사용자 설정에 따라 다른 경로 생성 가능
      const normalPath = getNextQuizPath(10, nextQuiz?.quizId || null);
      const unsolvedPath = getNextQuizPath(10, nextUnsolved?.quizId || null);

      expect(normalPath).toBe('/topics/10/quizzes/4');
      expect(unsolvedPath).toBe('/topics/10/quizzes/5');
    });
  });
});
