import styled from '@emotion/styled';

export const QuestionButton = ({ text }: { text: string }) => {
  return <Container>{text}</Container>;
};

export default QuestionButton;

const Container = styled.button`
  width: 280px;
  height: 54px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
