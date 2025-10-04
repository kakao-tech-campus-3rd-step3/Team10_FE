import styled from '@emotion/styled';
import QuizHeader from './QuizHeader';
import ConfirmButton from './ConfirmButton';
import { Container } from '@/Shared/components/Container';
import { useNavigate } from 'react-router-dom';

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
export const QuizResultPage = ({ data }: QuizResultPageProps) => {
  const {
    questionOrder,
    questionText,
    difficultyLevel,
    correctAnswer,
    selectedAnswer,
    questionData,
    explanation,
  } = data;
  const navigate = useNavigate();
  const handleNextQuestion = () => {
    navigate('/home');
  };
  return (
    <Container $scrollable>
      <Space />
      <QuizHeader
        questionOrder={questionOrder}
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
      <ButtonContainer onClick={handleNextQuestion}>
        <ConfirmButton text="다음 문제" />
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

const ResultTitle = styled.div`
  font-size: 24px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CorrectAnswer = styled.div`
  font-size: 16px;
`;

const SelectedAnswer = styled.div`
  font-size: 16px;
`;

const ExplanationText = styled.div`
  font-size: 16px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
