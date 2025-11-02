// 퀴즈 상세 데이터 (개별 퀴즈 API 응답)
export interface QuizData {
  quizId: number;
  questionTitle: string;
  questionType: 'OX' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  questionData: {
    correctAnswer?: boolean;
    choices?: {
      text: string;
      correctAnswer: boolean;
    }[];
  };
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  explanation: string;
  questionOrder: number;
  correctRate: number;
  topicId: number;
  topicName: string;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

// 퀴즈 목록 아이템 (퀴즈 목록 API 응답 아이템)
export interface Quiz {
  quizId: number;
  questionOrder: number;
  questionTitle: string;
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  isSolved: boolean;
  isBookMarked: boolean;
}

// 퀴즈 목록 API 응답
export interface QuizListResponse {
  quizzes: Quiz[];
}

// 퀴즈 결과 페이지 state
export interface QuizResultState {
  selectedAnswer: string | boolean | number;
  isCorrect: boolean;
  quizData: QuizData;
}

// 답안 제출 요청 타입
export interface QuizSubmitRequest {
  isCorrect: boolean;
}
