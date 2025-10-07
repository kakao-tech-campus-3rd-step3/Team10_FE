import styled from '@emotion/styled';
import QuizHeader from './QuizHeader';
import QuizConfirmButton from './QuizConfirmButton';
import { Container } from '@/Shared/components/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import type { QuizData } from './types';

interface QuizResultState {
  selectedAnswer: string | boolean;
  isCorrect: boolean;
  quizData: QuizData;
}

export const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedAnswer, isCorrect, quizData } = location.state as QuizResultState;

  if (!quizData) {
    return (
      <Container>
        <ErrorMessage>퀴즈 결과를 불러올 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  const { questionOrder, questionTitle, difficultyLevel, explanation, questionData } = quizData;

  const handleNextQuestion = () => {
    navigate('/home');
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
      <ButtonContainer onClick={handleNextQuestion}>
        <QuizConfirmButton text="다음 문제" />
      </ButtonContainer>
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
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
