import styled from '@emotion/styled';

export const ConfirmButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return <Container onClick={onClick}>{text}</Container>;
};

export default ConfirmButton;

const Container = styled.button`
  width: 160px;
  height: 54px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 52px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
