import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import BackButton from './backButton';
import { useNavigate } from 'react-router-dom';
export const Header = ({ title, hasPrevPage }: { title: string; hasPrevPage: boolean }) => {
  const navigate = useNavigate();
  const onTitleClick = () => {
    navigate('/home');
  };
  return (
    <Container>
      {hasPrevPage && <BackButton />}
      <Title onClick={onTitleClick}>{title}</Title>
    </Container>
  );
};
const Container = styled.header`
  padding: ${theme.spacing(5)};
  display: flex;
  align-items: center;
  position: relative;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;
