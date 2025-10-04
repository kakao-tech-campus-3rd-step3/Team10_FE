import styled from '@emotion/styled';

interface QuestionButtonProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const QuestionButton = ({ text, isSelected = false, onClick }: QuestionButtonProps) => {
  return (
    <Container isSelected={isSelected} onClick={onClick}>
      {text}
    </Container>
  );
};

export default QuestionButton;

const Container = styled.button<{ isSelected: boolean }>`
  width: 280px;
  height: 54px;
  flex-shrink: 0;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.background};
  border: 2px solid
    ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : theme.colors.secondary)};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme, isSelected }) => (isSelected ? '#ffffff' : theme.colors.text)};
  cursor: pointer;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : '#f8f9fa')};
  }

  &:active {
    transform: scale(0.98);
  }
`;
