import styled from '@emotion/styled';

interface QuizConfirmButtonProps {
  text: string;
  disabled?: boolean;
}

export const QuizConfirmButton = ({ text, disabled = false }: QuizConfirmButtonProps) => {
  return <Container disabled={disabled}>{text}</Container>;
};

export default QuizConfirmButton;

const Container = styled.button<{ disabled: boolean }>`
  width: 160px;
  height: 54px;
  flex-shrink: 0;
  background-color: ${({ theme, disabled }) => (disabled ? '#cccccc' : theme.colors.secondary)};
  border-radius: 52px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 20px;
  color: ${({ theme, disabled }) => (disabled ? '#666666' : theme.colors.background)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, disabled }) => (disabled ? '#cccccc' : theme.colors.primary)};
  }
`;
