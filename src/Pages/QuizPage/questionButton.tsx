import styled from '@emotion/styled';

export default function QuestionButton({ text }: { text: string }) {
  return <Container>{text}</Container>;
}

const Container = styled.button`
  width: 273px;
  height: 53px;
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
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
