import styled from '@emotion/styled';
import QuizHeader from './QuizHeader';
import QuizConfirmButton from './QuizConfirmButton';
import { Container } from '@/Shared/components/Container';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { QuizResultState, QuizListResponse } from './types';
import { findNextQuiz, getNextQuizPath } from '@/utils/quizNavigationLogic';
import { queryClient } from '@/Apis/queryClient';

export const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topicId } = useParams<{ topicId?: string }>();

  const {
    selectedAnswer,
    isCorrect,
    quizData,
    isReview,
    reviewQuizzes,
    currentReviewIndex,
    currentPage,
    totalQuizCount,
  } = location.state as QuizResultState & {
    currentPage?: number;
    totalQuizCount?: number;
  };

  const isRecordPage = topicId === 'wrong' || topicId === 'bookmark';
  const isReviewMode = isReview === true;

  const currentPageForQuery = currentPage ?? 0;
  const { data: quizListData } = useQueryApi<QuizListResponse>(
    ['topics', topicId || '', currentPageForQuery],
    `/topics/${topicId || ''}?page=${currentPageForQuery}&size=10`,
    { enabled: !isRecordPage && !isReviewMode },
  );

  const nextPageIndex = currentPageForQuery + 1;
  const PAGE_SIZE = 10;
  const totalPages = totalQuizCount ? Math.ceil(totalQuizCount / PAGE_SIZE) : 0;
  const hasNextPage = nextPageIndex < totalPages;

  const { data: nextPageQuizListData } = useQueryApi<QuizListResponse>(
    ['topics', topicId || '', nextPageIndex],
    `/topics/${topicId || ''}?page=${nextPageIndex}&size=10`,
    { enabled: !isRecordPage && !isReviewMode && hasNextPage },
  );

  const handleBookmarkChange = (quizId: number) => {
    queryClient.invalidateQueries({ queryKey: ['quiz', String(quizId)] });
    if (topicId) {
      queryClient.invalidateQueries({ queryKey: ['topics', topicId] });
    }
  };

  if (!quizData) {
    return (
      <Container $hasTopNav={false}>
        <ErrorMessage>퀴즈 결과를 불러올 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  const { questionOrder, questionTitle, difficultyLevel, explanation, questionData, quizId } =
    quizData;

  const quizzes = quizListData?.quizzes || [];

  let nextQuiz = !isReviewMode ? findNextQuiz(quizzes, quizId) : null;

  const isLastInCurrentPage = quizzes.length > 0 && quizzes[quizzes.length - 1]?.quizId === quizId;

  if (
    !nextQuiz &&
    !isReviewMode &&
    isLastInCurrentPage &&
    hasNextPage &&
    nextPageQuizListData &&
    nextPageQuizListData.quizzes &&
    nextPageQuizListData.quizzes.length > 0
  ) {
    nextQuiz = nextPageQuizListData.quizzes[0];
  }

  let nextReviewQuiz = null;
  if (isReviewMode && reviewQuizzes && currentReviewIndex !== undefined) {
    const nextIndex = currentReviewIndex + 1;
    if (nextIndex < reviewQuizzes.length) {
      nextReviewQuiz = reviewQuizzes[nextIndex];
    }
  }

  const handleNextQuestion = () => {
    if (isReviewMode && nextReviewQuiz) {
      navigate(`/quiz/review/${nextReviewQuiz.quizId}`, {
        state: {
          isReview: true,
          reviewQuizzes,
          currentReviewIndex: currentReviewIndex! + 1,
        },
      });
    } else if (!isReviewMode && nextQuiz) {
      const nextPath = getNextQuizPath(Number(topicId), nextQuiz.quizId);

      const currentPageIndex = currentPage ?? 0;
      const isNextQuizInNextPage =
        nextPageQuizListData?.quizzes?.some((q) => q.quizId === nextQuiz.quizId) ?? false;
      const nextPageForState = isNextQuizInNextPage ? currentPageIndex + 1 : currentPageIndex;

      navigate(nextPath, {
        state: {
          currentPage: nextPageForState,
          topicName: location.state?.topicName,
          totalQuizCount: totalQuizCount,
        },
      });
    }
  };

  const handleBackToList = () => {
    if (isReviewMode) {
      navigate('/topics');
      queryClient.invalidateQueries({ queryKey: ['quiz', 'review'] });
    } else if (isRecordPage) {
      navigate('/record');
      queryClient.invalidateQueries({ queryKey: ['learningRecord', 'wrong'] });
      queryClient.invalidateQueries({ queryKey: ['learningRecord', 'bookmark'] });
    } else {
      const currentPageFromState = location.state?.currentPage ?? 0;
      navigate(`/topics/${topicId}/quizzes`, {
        state: {
          topicName: location.state?.topicName,
          totalQuizCount: location.state?.totalQuizCount,
          currentPage: currentPageFromState,
        },
      });
    }
  };

  const isLastReviewQuiz = isReviewMode && !nextReviewQuiz;

  return (
    <Container $scrollable $hasTopNav={false}>
      <Space />
      <QuizHeader
        questionOrder={questionOrder}
        questionText={questionTitle}
        difficultyLevel={difficultyLevel}
        quizId={quizId}
        isBookMarked={quizData.isBookmarked}
        onBookmarkChange={handleBookmarkChange}
      />
      <ResultContainer>
        <ResultTitle isCorrect={isCorrect}>
          {isCorrect ? '정답입니다! 🎉' : '틀렸습니다 😅'}
        </ResultTitle>

        {quizData.questionType === 'OX' ? (
          <>
            <AnswerDisplay>
              <AnswerLabel>내가 선택한 답:</AnswerLabel>
              <AnswerValue isCorrect={selectedAnswer === questionData.correctAnswer}>
                {selectedAnswer ? 'O' : 'X'}
              </AnswerValue>
            </AnswerDisplay>
            <AnswerDisplay>
              <AnswerLabel>정답:</AnswerLabel>
              <AnswerValue isCorrect={true}>{questionData.correctAnswer ? 'O' : 'X'}</AnswerValue>
            </AnswerDisplay>
          </>
        ) : (
          <>
            <AnswerDisplay>
              <AnswerLabel>내가 선택한 답:</AnswerLabel>
              <AnswerValue isCorrect={isCorrect}>
                {questionData.choices?.[selectedAnswer as number]?.text}
              </AnswerValue>
            </AnswerDisplay>
            <AnswerDisplay>
              <AnswerLabel>정답:</AnswerLabel>
              <AnswerValue isCorrect={true}>
                {questionData.choices?.find((choice) => choice.correctAnswer === true)?.text}
              </AnswerValue>
            </AnswerDisplay>
          </>
        )}

        <ExplanationContainer>
          <ExplanationLabel>해설:</ExplanationLabel>
          <ExplanationText>{explanation}</ExplanationText>
        </ExplanationContainer>
      </ResultContainer>
      <ButtonsWrapper>
        {!isReviewMode && !isRecordPage && !nextQuiz && (
          <LastQuizMessage>마지막 문제입니다!</LastQuizMessage>
        )}
        {isReviewMode && isLastReviewQuiz && (
          <LastQuizMessage>모든 복습 퀴즈를 완료했습니다!</LastQuizMessage>
        )}
        <ButtonRow>
          {(!isReviewMode || (isReviewMode && isLastReviewQuiz)) && (
            <ButtonContainer onClick={handleBackToList}>
              <QuizConfirmButton
                text={isReviewMode && isLastReviewQuiz ? '토픽 선택하기' : '목록 보기'}
              />
            </ButtonContainer>
          )}
          {((!isRecordPage && !isReviewMode && nextQuiz) || (isReviewMode && nextReviewQuiz)) && (
            <ButtonContainer onClick={handleNextQuestion}>
              <QuizConfirmButton text="다음 문제" />
            </ButtonContainer>
          )}
        </ButtonRow>
      </ButtonsWrapper>
    </Container>
  );
};

export default QuizResultPage;

const Space = styled.div`
  height: 60px;
`;
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 36px;
  border-radius: 40px;
  padding: 24px;
  gap: 14px;
  background-color: #fff;
`;

const ResultTitle = styled.div<{ isCorrect: boolean }>`
  font-size: 24px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ isCorrect }) => (isCorrect ? '#28a745' : '#dc3545')};
  text-align: center;
  margin-bottom: 20px;
`;

const AnswerDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const AnswerLabel = styled.span`
  font-size: 16px;
  font: ${({ theme }) => theme.font.regular};
  color: #666666;
`;

const AnswerValue = styled.span<{ isCorrect: boolean }>`
  font-size: 18px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ isCorrect }) => (isCorrect ? '#28a745' : '#dc3545')};
  background-color: ${({ isCorrect }) => (isCorrect ? '#e8f5e8' : '#f8d7da')};
  padding: 6px 12px;
  border-radius: 20px;
`;

const ExplanationContainer = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
`;

const ExplanationLabel = styled.div`
  font-size: 18px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const ExplanationText = styled.div`
  font-size: 16px;
  font: ${({ theme }) => theme.font.regular};
  color: #666666;
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #dc3545;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  margin-top: 20px;
`;

const LastQuizMessage = styled.div`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.regular.fontFamily};
  font-weight: ${({ theme }) => theme.font.regular.fontWeight};
  color: #ff6b6b;
  text-align: center;
  padding: 8px 16px;
  background-color: #fff5f5;
  border-radius: 20px;
  border: 1px solid #ffcccb;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
