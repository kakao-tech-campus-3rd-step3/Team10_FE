import styled from '@emotion/styled';

export default function QuestionButton({ text }: { text: string }) {
  return <Container>{text}</Container>;
}

const Container = styled.button`
  width: 28.56vh;
  height: 5.54vh;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 0.21vh solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 1.88vh;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  box-shadow: 0 0.42vh 0.42vh 0 rgba(0, 0, 0, 0.25);
`;
