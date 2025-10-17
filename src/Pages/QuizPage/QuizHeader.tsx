import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

type Difficulty = 'low' | 'medium' | 'high';

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  low: '하',
  medium: '중',
  high: '상',
};

function toKoreanDifficulty(level?: string) {
  if (!level) return undefined;
  const key = level.toLowerCase() as keyof typeof DIFFICULTY_LABEL;
  return DIFFICULTY_LABEL[key];
}

export type QuizHeaderProps = {
  questionOrder: number;
  questionText: string;
  difficultyLevel?: string;
  className?: string;
};

export const QuizHeader = ({
  questionOrder,
  questionText,
  difficultyLevel,
  className,
}: QuizHeaderProps) => {
  const difficultyLabel = toKoreanDifficulty(difficultyLevel);
  return (
    <HeaderContainer className={className}>
      <QuestionNumber>문제 {questionOrder}</QuestionNumber>
      <QuestionText>{questionText}</QuestionText>
      {difficultyLabel && <DifficultyText>(난이도 : {difficultyLabel})</DifficultyText>}
    </HeaderContainer>
  );
};

export default QuizHeader;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionNumber = styled.h1`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.font.bold.fontWeight};
  font-family: ${({ theme }) => theme.font.bold.fontFamily};
  color: ${({ theme }) => theme.colors.text};
`;

const QuestionText = styled.div`
  padding: 0 ${theme.spacing(5)};
  font-weight: ${({ theme }) => theme.font.bold.fontWeight};
  font-family: ${({ theme }) => theme.font.bold.fontFamily};
  font-size: 24px;
  margin-top: 58px;
  color: ${({ theme }) => theme.colors.text};
`;

const DifficultyText = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 16px;
`;
