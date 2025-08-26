import styled from '@emotion/styled';
import QuestionButton from './questionButton';
import ConfirmButton from './confirmButton';
import QuizHeader from './QuizHeader';
import { Container } from '@/Shared/components/Container';
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

export default function QuizSolvePage({ data }: QuizSolvePageProps) {
  const { questionText, difficultyLevel, questionOrder, totalQuestions, questionData } = data;
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
      <ConfirmButtonContainer>
        <ConfirmButton text="제출하기" />
      </ConfirmButtonContainer>
    </Container>
  );
}

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
