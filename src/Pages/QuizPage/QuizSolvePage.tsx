import styled from '@emotion/styled';
import QuestionButton from './questionButton';
import ConfirmButton from './confirmButton';
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
  const difficultyLabel = toKoreanDifficulty(difficultyLevel);
  return (
    <Container>
      <QuestionContainer>
        <QuestionNumber>
          문제 {questionOrder}/{totalQuestions}
        </QuestionNumber>
        <QuestionText>{questionText}</QuestionText>
        {difficultyLabel && <DifficultyText>(난이도 : {difficultyLabel})</DifficultyText>}
      </QuestionContainer>
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
function toKoreanDifficulty(level?: string) {
  if (!level) return undefined;
  const key = level.toLowerCase() as keyof typeof DIFFICULTY_LABEL;
  return DIFFICULTY_LABEL[key];
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

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionNumber = styled.h1`
  font-size: 2.51vh;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const QuestionText = styled.div`
  width: 29.92vh;
  font-weight: ${({ theme }) => theme.font.bold.fontWeight};
  font-size: 2.51vh;
  margin-top: 5.86vh;
  color: ${({ theme }) => theme.colors.text};
`;

const DifficultyText = styled.div`
  margin-top: 0.21vh;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 1.46vh;
`;
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

const DIFFICULTY_LABEL: Record<'low' | 'medium' | 'high', string> = {
  low: '하',
  medium: '중',
  high: '상',
};
