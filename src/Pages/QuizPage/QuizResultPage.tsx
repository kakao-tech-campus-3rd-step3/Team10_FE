import styled from '@emotion/styled';
import QuizHeader from './QuizHeader';
import ConfirmButton from './confirmButton';

interface QuizResultPageProps {
  data: {
    questionId: number;
    questionText: string;
    questionType: string;
    difficultyLevel: string;
    questionOrder: number;
    totalQuestions: number;
    questionData: {
      choices: {
        choiceId: string;
        text: string;
      }[];
    };
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  };
}
export default function QuizResultPage({ data }: QuizResultPageProps) {
  const {
    questionOrder,
    totalQuestions,
    questionText,
    difficultyLevel,
    correctAnswer,
    selectedAnswer,
    questionData,
    explanation,
  } = data;
  return (
    <Container>
      <QuizHeader
        questionOrder={questionOrder}
        totalQuestions={totalQuestions}
        questionText={questionText}
        difficultyLevel={difficultyLevel}
      />
      <ResultContainer>
        <ResultTitle>정답</ResultTitle>
        <CorrectAnswer>
          내가 선택한 답 : {selectedAnswer}{' '}
          {questionData?.choices.find((choice) => choice.choiceId === selectedAnswer)?.text}
        </CorrectAnswer>
        <SelectedAnswer>
          정답 : {correctAnswer}{' '}
          {questionData?.choices.find((choice) => choice.choiceId === correctAnswer)?.text}
        </SelectedAnswer>
        <ExplanationText>{explanation}</ExplanationText>
      </ResultContainer>
      <ButtonContainer>
        <ConfirmButton text="다음 문제" />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 46.02vh;
  height: 100vh;
  min-height: 100svh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  padding-top: 11.72vh;
  overflow: hidden;
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

const ResultTitle = styled.div`
  font-size: 2.51vh;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CorrectAnswer = styled.div`
  font-size: 1.46vh;
`;

const SelectedAnswer = styled.div`
  font-size: 1.46vh;
`;

const ExplanationText = styled.div`
  font-size: 1.46vh;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
