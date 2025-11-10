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

export interface Quiz {
  quizId: number;
  questionOrder: number;
  questionTitle: string;
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  isSolved: boolean;
  isBookMarked: boolean;
}

export interface QuizListResponse {
  quizzes: Quiz[];
}

export interface ReviewQuizResponse {
  reviewQuizzes: ReviewQuiz[];
}

export interface ReviewQuiz {
  quizId: number;
  topicId: number;
  questionTitle: string;
  questionType: 'OX' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  questionData: string;
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  explanation: string;
  correctRate: number;
  reviewStep: string;
}

export interface QuizResultState {
  selectedAnswer: string | boolean | number;
  isCorrect: boolean;
  quizData: QuizData;
  isReview?: boolean;
  reviewQuizzes?: ReviewQuiz[];
  currentReviewIndex?: number;
}

export interface QuizSubmitRequest {
  isCorrect: boolean;
}
