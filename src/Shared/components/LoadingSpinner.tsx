import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = theme.colors.primary,
  message = '로딩 중...',
}) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} color={color} />
      {message && <Message>{message}</Message>}
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
`;

const Spinner = styled.div<{ size: string; color: string }>`
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${({ color }) => color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          width: 20px;
          height: 20px;
          border-width: 2px;
        `;
      case 'large':
        return `
          width: 60px;
          height: 60px;
          border-width: 4px;
        `;
      default:
        return `
          width: 40px;
          height: 40px;
          border-width: 3px;
        `;
    }
  }}
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.font.regular.fontFamily};
  opacity: 0.7;
`;

// 전체 화면 로딩 스피너
export const FullScreenLoadingSpinner: React.FC<{ message?: string }> = ({
  message = '로딩 중...',
}) => {
  return (
    <FullScreenContainer>
      <LoadingSpinner size="large" message={message} />
    </FullScreenContainer>
  );
};

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
