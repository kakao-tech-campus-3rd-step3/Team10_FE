import styled from '@emotion/styled';
import QuizHeader from './QuizHeader';
import QuizConfirmButton from './QuizConfirmButton';
import { Container } from '@/Shared/components/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { QuizResultState, QuizListResponse } from './types';
import { findNextQuiz, getNextQuizPath } from '@/utils/quizNavigationLogic';

export const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedAnswer, isCorrect, quizData } = location.state as QuizResultState;

  const { data: quizListData } = useQueryApi<QuizListResponse>(
    ['topics', quizData?.topicId?.toString() || ''],
    `/topics/${quizData?.topicId || ''}`,
  );

  if (!quizData) {
    return (
      <Container>
        <ErrorMessage>퀴즈 결과를 불러올 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  const {
    questionOrder,
    questionTitle,
    difficultyLevel,
    explanation,
    questionData,
    topicId,
    quizId,
  } = quizData;

  const quizzes = quizListData?.quizzes || [];
  const nextQuiz = findNextQuiz(quizzes, quizId);

  const handleNextQuestion = () => {
    const nextPath = getNextQuizPath(topicId, nextQuiz?.quizId || null);
    navigate(nextPath);
  };

  const handleBackToList = () => {
    navigate(`/quizList/${topicId}`);
  };
  return (
    <Container $scrollable>
      <Space />
      <QuizHeader
        questionOrder={questionOrder}
        questionText={questionTitle}
        difficultyLevel={difficultyLevel}
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
              <AnswerValue isCorrect={selectedAnswer === questionData.correctAnswer}>
                {questionData.choices?.find((choice) => choice.choiceId === selectedAnswer)?.text}
              </AnswerValue>
            </AnswerDisplay>
            <AnswerDisplay>
              <AnswerLabel>정답:</AnswerLabel>
              <AnswerValue isCorrect={true}>
                {
                  questionData.choices?.find(
                    (choice) => choice.choiceId === String(questionData.correctAnswer),
                  )?.text
                }
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
        {!nextQuiz && <LastQuizMessage>마지막 문제입니다!</LastQuizMessage>}
        <ButtonRow>
          <ButtonContainer onClick={handleBackToList}>
            <QuizConfirmButton text="목록 보기" />
          </ButtonContainer>
          <ButtonContainer onClick={nextQuiz ? handleNextQuestion : undefined}>
            <QuizConfirmButton text="다음 문제" disabled={!nextQuiz} />
          </ButtonContainer>
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
