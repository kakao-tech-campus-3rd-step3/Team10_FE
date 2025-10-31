import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { BookmarkIcon } from '@/Shared/components/BookmarkIcon';

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
  quizId?: number;
  isBookMarked?: boolean;
  onBookmarkChange?: (quizId: number, newBookmarkState: boolean) => void;
};

export const QuizHeader = ({
  questionOrder,
  questionText,
  difficultyLevel,
  className,
  quizId,
  isBookMarked,
  onBookmarkChange,
}: QuizHeaderProps) => {
  const difficultyLabel = toKoreanDifficulty(difficultyLevel);
  return (
    <HeaderContainer className={className}>
      <QuestionNumberContainer>
        <QuestionNumber>문제 {questionOrder}</QuestionNumber>
        {quizId && (
          <BookmarkIcon
            quizId={quizId}
            isBookMarked={isBookMarked || false}
            onBookmarkChange={onBookmarkChange}
            size={60}
          />
        )}
      </QuestionNumberContainer>
      <QuestionTextContainer>
        <QuestionText>{questionText}</QuestionText>
      </QuestionTextContainer>
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

const QuestionTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 58px;
`;

const QuestionText = styled.div`
  padding: 0 ${theme.spacing(5)};
  font-weight: ${({ theme }) => theme.font.bold.fontWeight};
  font-family: ${({ theme }) => theme.font.bold.fontFamily};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const DifficultyText = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 16px;
`;

const QuestionNumberContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateX(30px);
`;
