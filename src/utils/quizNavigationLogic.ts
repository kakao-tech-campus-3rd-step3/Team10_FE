/**
 * 퀴즈 네비게이션 관련 비즈니스 로직
 */

import type { Quiz } from '@/Pages/QuizPage/types';

/**
 * 현재 퀴즈의 다음 문제 찾기
 * @param quizzes - 전체 퀴즈 배열
 * @param currentQuizId - 현재 퀴즈 ID
 * @returns 다음 퀴즈 또는 null
 */
export const findNextQuiz = (quizzes: Quiz[], currentQuizId: number): Quiz | null => {
  const currentIndex = quizzes.findIndex((quiz) => quiz.quizId === currentQuizId);

  if (currentIndex === -1 || currentIndex === quizzes.length - 1) {
    return null; // 현재 퀴즈를 못 찾거나 마지막 문제
  }

  return quizzes[currentIndex + 1];
};

/**
 * 다음 안 푼 문제 찾기
 * @param quizzes - 전체 퀴즈 배열
 * @param currentQuizId - 현재 퀴즈 ID
 * @returns 다음 안 푼 퀴즈 또는 null
 */
export const findNextUnsolvedQuiz = (quizzes: Quiz[], currentQuizId: number): Quiz | null => {
  const currentIndex = quizzes.findIndex((quiz) => quiz.quizId === currentQuizId);

  if (currentIndex === -1) {
    return null; // 현재 퀴즈를 못 찾음
  }

  // 현재 문제 다음부터 안 푼 문제 찾기
  for (let i = currentIndex + 1; i < quizzes.length; i++) {
    if (!quizzes[i].isSolved) {
      return quizzes[i];
    }
  }

  return null; // 다음 안 푼 문제가 없음
};

/**
 * 마지막 문제인지 확인
 * @param quizzes - 전체 퀴즈 배열
 * @param currentQuizId - 현재 퀴즈 ID
 * @returns 마지막 문제 여부
 */
export const isLastQuiz = (quizzes: Quiz[], currentQuizId: number): boolean => {
  if (quizzes.length === 0) return true;

  const currentIndex = quizzes.findIndex((quiz) => quiz.quizId === currentQuizId);

  if (currentIndex === -1) return false;

  return currentIndex === quizzes.length - 1;
};

/**
 * 현재 퀴즈의 순서 정보
 * @param quizzes - 전체 퀴즈 배열
 * @param currentQuizId - 현재 퀴즈 ID
 * @returns { current: number, total: number }
 */
export const getQuizProgress = (
  quizzes: Quiz[],
  currentQuizId: number,
): { current: number; total: number } => {
  const currentIndex = quizzes.findIndex((quiz) => quiz.quizId === currentQuizId);

  return {
    current: currentIndex === -1 ? 0 : currentIndex + 1,
    total: quizzes.length,
  };
};

/**
 * 다음 문제로 이동할 경로 결정
 * @param topicId - 토픽 ID
 * @param nextQuizId - 다음 퀴즈 ID (없으면 null)
 * @returns 이동할 경로
 */
export const getNextQuizPath = (topicId: number, nextQuizId: number | null): string => {
  if (nextQuizId === null) {
    return `/topics/${topicId}/quizzes`; // 마지막 문제면 목록으로
  }

  return `/topics/${topicId}/quizzes/${nextQuizId}`;
};
