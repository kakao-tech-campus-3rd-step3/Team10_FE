import styled from '@emotion/styled';

interface ConfirmButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ConfirmButton = ({ text, onClick, disabled = false }: ConfirmButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <Container onClick={handleClick} disabled={disabled}>
      {text}
    </Container>
  );
};

export default ConfirmButton;

const Container = styled.button`
  width: 155px;
  height: 50px;
  flex-shrink: 0;
  background-color: ${({ theme, disabled }) => (disabled ? '#cccccc' : theme.colors.secondary)};
  border-radius: 52px;
  border: 2px solid #d3e0b4;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme, disabled }) => (disabled ? '#666666' : theme.colors.background)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.6 : 0.9)};
  }
`;
