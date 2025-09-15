import styled from '@emotion/styled';
import QuestionButton from './QuestionButton';
import ConfirmButton from './ConfirmButton';
import QuizHeader from './QuizHeader';
import { Container } from '@/Shared/components/Container';
import { useNavigate } from 'react-router-dom';
interface QuizSolvePageProps {
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
    solved: boolean;
    bookmarked: boolean;
  };
}

export const QuizSolvePage = ({ data }: QuizSolvePageProps) => {
  const { questionText, difficultyLevel, questionOrder, totalQuestions, questionData } = data;
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate('/quizResult');
  };
  return (
    <Container>
      <Space />
      <QuizHeader
        questionOrder={questionOrder}
        totalQuestions={totalQuestions}
        questionText={questionText}
        difficultyLevel={difficultyLevel}
      />
      <QuestionButtonContainer>
        {questionData.choices.map((choice) => (
          <QuestionButton key={choice.choiceId} text={choice.text} />
        ))}
      </QuestionButtonContainer>
      <ConfirmButtonContainer onClick={handleConfirm}>
        <ConfirmButton text="제출하기" />
      </ConfirmButtonContainer>
    </Container>
  );
};

export default QuizSolvePage;

const Space = styled.div`
  height: 60px;
`;
const QuestionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 50px;
`;
const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
