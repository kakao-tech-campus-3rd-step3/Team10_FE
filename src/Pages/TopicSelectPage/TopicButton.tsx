import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

type TopicButtonProps = {
  title: string;
  solvedQuizCount: number;
  totalQuizCount: number;
  isAble: boolean;
  onClick: () => void;
};
export const TopicButton = ({
  title,
  solvedQuizCount,
  totalQuizCount,
  isAble,
  onClick,
}: TopicButtonProps) => {
  return (
    <Button
      onClick={isAble ? onClick : undefined}
      $isAble={isAble}
      type="button"
      disabled={!isAble}
      aria-label={`${title} 토픽 ${isAble ? `선택하기, 푼 문제 ${solvedQuizCount}개 중 전체 ${totalQuizCount}개` : '잠금 해제 필요'}`}
      role="listitem"
    >
      <Title $isAble={isAble}>{title}</Title>
      <Description $isAble={isAble}>
        {isAble
          ? `푼 문제 ${solvedQuizCount} / 전체 문제 ${totalQuizCount}`
          : '새싹 단계 이상에서 잠금 해제'}
      </Description>
    </Button>
  );
};
const Button = styled.button<{ $isAble: boolean }>`
  width: 248px;
  height: 62px;
  background-color: ${({ $isAble }) => ($isAble ? theme.colors.background : '#f5f5f5')};
  border-radius: 50px;
  border: 2px solid ${({ $isAble }) => ($isAble ? theme.colors.secondary : '#d0d0d0')};
  cursor: ${({ $isAble }) => ($isAble ? 'pointer' : 'not-allowed')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ $isAble }) => ($isAble ? 1 : 0.6)};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isAble }) => ($isAble ? '#f8f9fa' : '#f5f5f5')};
    transform: ${({ $isAble }) => ($isAble ? 'translateY(-2px)' : 'none')};
    box-shadow: ${({ $isAble }) => ($isAble ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  }

  &:active {
    transform: ${({ $isAble }) => ($isAble ? 'translateY(0)' : 'none')};
  }
`;
const Title = styled.div<{ $isAble: boolean }>`
  font-size: 24px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ $isAble }) => ($isAble ? '#000000' : '#999999')};
  text-align: center;
`;
const Description = styled.div<{ $isAble: boolean }>`
  font-size: 12px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  color: ${({ $isAble }) => ($isAble ? theme.colors.secondary : '#cccccc')};
  text-align: center;
  margin-top: 2px;
`;
