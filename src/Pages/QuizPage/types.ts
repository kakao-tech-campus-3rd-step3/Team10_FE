export interface QuizData {
  quizId: number;
  questionTitle: string;
  questionType: 'OX' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  questionData: {
    correctAnswer?: boolean;
    choices?: {
      choiceId: string;
      text: string;
    }[];
  };
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  explanation: string;
  questionOrder: number;
  correctRate: number;
  topicId: number;
  topicName: string;
  createdAt: string;
  updatedAt: string;
}

// 답안 제출 요청 타입
export interface QuizSubmitRequest {
  isCorrect: boolean;
}
