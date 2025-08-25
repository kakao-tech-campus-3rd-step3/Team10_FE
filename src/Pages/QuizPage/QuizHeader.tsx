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
  totalQuestions: number;
  questionText: string;
  difficultyLevel?: string;
  className?: string;
};

export default function QuizHeader({
  questionOrder,
  totalQuestions,
  questionText,
  difficultyLevel,
  className,
}: QuizHeaderProps) {
  const difficultyLabel = toKoreanDifficulty(difficultyLevel);
  return (
    <HeaderContainer className={className}>
      <QuestionNumber>
        문제 {questionOrder}/{totalQuestions}
      </QuestionNumber>
      <QuestionText>{questionText}</QuestionText>
      {difficultyLabel && <DifficultyText>(난이도 : {difficultyLabel})</DifficultyText>}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionNumber = styled.h1`
  font-size: 2.51vh;
  font-weight: ${({ theme }) => theme.font.bold.fontWeight};
  font-family: ${({ theme }) => theme.font.bold.fontFamily};
  color: ${({ theme }) => theme.colors.text};
`;

const QuestionText = styled.div`
  width: 29.92vh;
  font-weight: ${({ theme }) => theme.font.bold.fontWeight};
  font-family: ${({ theme }) => theme.font.bold.fontFamily};
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
