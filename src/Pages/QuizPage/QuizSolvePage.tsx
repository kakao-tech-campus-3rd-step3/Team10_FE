import styled from '@emotion/styled';
import QuestionButton from './questionButton';
import ConfirmButton from './confirmButton';
import QuizHeader from './QuizHeader';
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

/* 헤더는 QuizHeader로 분리 */
const QuestionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.02vh;
  margin-top: clamp(1.67vh, 5vh, 7.11vh);
`;
const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10.46vh;
`;

// 난이도 표기는 QuizHeader로 이동
