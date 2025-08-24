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
  width: 440px;
  height: 956px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  padding: 100px 76px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionNumber = styled.h1`
  font-size: 24px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const QuestionText = styled.div`
  width: 286px;
  font: ${({ theme }) => theme.font.bold};
  font-size: 24px;
  margin-top: 84px;
  color: ${({ theme }) => theme.colors.text};
`;

const DifficultyText = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 14px;
  align-self: flex-start;
`;
const QuestionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  margin-top: 68px;
`;
const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 112px;
`;

const DIFFICULTY_LABEL: Record<'low' | 'medium' | 'high', string> = {
  low: '하',
  medium: '중',
  high: '상',
};
