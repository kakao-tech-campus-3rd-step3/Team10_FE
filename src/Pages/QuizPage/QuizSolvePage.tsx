import styled from '@emotion/styled';
import QuestionButton from './QuestionButton';
import QuizConfirmButton from './QuizConfirmButton';
import QuizHeader from './QuizHeader';
import { Container } from '@/Shared/components/Container';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import { usePostApi } from '@/Apis/useMutationApi';
import { useState } from 'react';
import type { QuizData, QuizSubmitRequest, ReviewQuiz } from './types';
import Header from '@/Shared/components/Header';
import { useQueryClient } from '@tanstack/react-query';

export const QuizSolvePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topicId, quizId } = useParams<{ topicId?: string; quizId: string }>();
  const queryClient = useQueryClient();

  // 복습 모드 확인
  const isReview = location.pathname.startsWith('/quiz/review');
  const reviewState = location.state as {
    isReview?: boolean;
    reviewQuizzes?: ReviewQuiz[];
    currentReviewIndex?: number;
  } | null;

  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | number | null>(null);

  const {
    data: quizData,
    error,
    isLoading,
  } = useQueryApi<QuizData>(['quiz', quizId || ''], `/quiz/${quizId || ''}`);

  // 복습 모드일 때는 /quiz/review/{quizId}, 일반 모드일 때는 /quiz/{quizId}/submit
  const submitUrl = isReview ? `/quiz/review/${quizId}` : `/quiz/${quizId}/submit`;

  const submitQuizMutation = usePostApi<void, QuizSubmitRequest>(submitUrl);

  const checkAnswer = (selectedAnswer: string | boolean | number, quizData: QuizData): boolean => {
    if (quizData.questionType === 'OX') {
      return selectedAnswer === quizData.questionData.correctAnswer;
    } else if (quizData.questionType === 'MULTIPLE_CHOICE') {
      const choiceIndex = selectedAnswer as number;
      return quizData.questionData.choices?.[choiceIndex]?.correctAnswer === true;
    }
    return false;
  };

  const handleConfirm = async () => {
    if (selectedAnswer === null) {
      alert('답을 선택해주세요!');
      return;
    }

    if (!quizData) {
      alert('퀴즈 데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const isCorrect = checkAnswer(selectedAnswer, quizData);

      await submitQuizMutation.mutateAsync({ isCorrect });

      queryClient.invalidateQueries({ queryKey: ['quiz', quizId || ''] });
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      if (topicId) {
        queryClient.invalidateQueries({ queryKey: ['topics', topicId] });
      }
      // 복습 퀴즈 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['quiz', 'review'] });
      // 출석체크 상태 캐시 무효화 (퀴즈를 풀면 출석체크가 업데이트되므로)
      queryClient.invalidateQueries({ queryKey: ['attendanceStatus'] });

      // 복습 모드일 때와 일반 모드일 때 결과 페이지 경로가 다름
      const resultPath = isReview
        ? `/quiz/review/${quizId}/result`
        : `/topics/${topicId}/quizzes/${quizId}/result`;

      navigate(resultPath, {
        state: {
          selectedAnswer,
          isCorrect,
          quizData,
          isReview: isReview || reviewState?.isReview,
          reviewQuizzes: reviewState?.reviewQuizzes,
          currentReviewIndex: reviewState?.currentReviewIndex,
        },
      });
    } catch {
      alert('답안 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAnswerSelect = (answer: string | boolean | number) => {
    setSelectedAnswer(answer);
  };

  const handleBookmarkChange = (quizId: number) => {
    queryClient.invalidateQueries({ queryKey: ['quiz', String(quizId)] });
    if (topicId) {
      queryClient.invalidateQueries({ queryKey: ['topics', topicId] });
    }
  };

  if (isLoading) {
    return (
      <Container $hasBottomNav={false}>
        <LoadingMessage role="status" aria-live="polite" aria-label="로딩 중">
          퀴즈를 불러오는 중...
        </LoadingMessage>
      </Container>
    );
  }

  if (error || !quizData) {
    return (
      <Container $hasBottomNav={false}>
        <ErrorMessage role="alert" aria-live="assertive" aria-label="오류 메시지">
          퀴즈를 불러오는데 실패했습니다.
        </ErrorMessage>
      </Container>
    );
  }

  const { questionTitle, difficultyLevel, questionOrder, questionType, questionData, topicName } =
    quizData;
  const headerTitle = isReview ? '복습 퀴즈' : topicName;

  // 백버튼 경로 설정: 일반 모드일 때는 해당 토픽의 퀴즈 목록으로, 복습 모드일 때는 홈으로
  const backButtonPath = isReview ? '/home' : topicId ? `/topics/${topicId}/quizzes` : '/topics';

  const renderQuestionContent = () => {
    switch (questionType) {
      case 'OX':
        return (
          <OXButtonContainer>
            <QuestionButton
              text="O"
              isSelected={selectedAnswer === true}
              onClick={() => handleAnswerSelect(true)}
            />
            <QuestionButton
              text="X"
              isSelected={selectedAnswer === false}
              onClick={() => handleAnswerSelect(false)}
            />
          </OXButtonContainer>
        );
      case 'MULTIPLE_CHOICE':
        return (
          <QuestionButtonContainer>
            {questionData.choices?.map((choice, index) => (
              <QuestionButton
                key={index}
                text={choice.text}
                isSelected={selectedAnswer === index}
                onClick={() => handleAnswerSelect(index)}
              />
            ))}
          </QuestionButtonContainer>
        );
      default:
        return (
          <QuestionButtonContainer>
            <ErrorMessage>지원하지 않는 문제 유형입니다.</ErrorMessage>
          </QuestionButtonContainer>
        );
    }
  };

  return (
    <Container $scrollable $hasBottomNav={false}>
      <Header title={headerTitle} hasPrevPage={true} backButtonTo={backButtonPath} />
      <Space />
      <QuizHeader
        questionOrder={questionOrder}
        questionText={questionTitle}
        difficultyLevel={difficultyLevel}
        quizId={quizData.quizId}
        isBookMarked={quizData.isBookmarked}
        onBookmarkChange={handleBookmarkChange}
      />
      {renderQuestionContent()}
      <ConfirmButtonContainer
        onClick={handleConfirm}
        role="button"
        aria-label="답안 제출하기"
        tabIndex={0}
      >
        <QuizConfirmButton
          text={submitQuizMutation.isPending ? '제출 중...' : '제출하기'}
          disabled={submitQuizMutation.isPending}
        />
      </ConfirmButtonContainer>
    </Container>
  );
};

export default QuizSolvePage;

const Space = styled.div`
  height: 40px;
`;
const QuestionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 50px;
`;

const OXButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
`;
const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #dc3545;
`;
