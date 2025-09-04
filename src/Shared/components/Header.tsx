import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

export const Header = ({ title }: { title: string }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};
const Container = styled.header`
  padding: ${theme.spacing(5)};
  text-align: center;
  background-color: ${theme.colors.background};
  border-bottom-left-radius: ${theme.spacing(5)};
  border-bottom-right-radius: ${theme.spacing(5)};
`;
const Title = styled.h1`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
`;
