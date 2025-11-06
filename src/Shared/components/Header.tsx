import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import BackButton from './backButton';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  title: string;
  hasPrevPage: boolean;
  backButtonTo?: string | number; // 백버튼이 이동할 경로. 미지정 시 BackButton 기본 동작
};

export const Header = ({ title, hasPrevPage, backButtonTo }: HeaderProps) => {
  const navigate = useNavigate();
  const onTitleClick = () => {
    navigate('/home');
  };
  return (
    <Container role="banner">
      {hasPrevPage && <BackButton to={backButtonTo} />}
      <Title onClick={onTitleClick} role="button" aria-label="홈으로 이동" tabIndex={0}>
        {title}
      </Title>
    </Container>
  );
};
export default Header;

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateZ(0);
  width: 100%;
  max-width: 720px;
  height: ${theme.spacing(15)};
  padding: ${theme.spacing(5)};
  display: flex;
  align-items: center;
  background-color: ${theme.colors.background};
  border-bottom-left-radius: ${theme.spacing(5)};
  border-bottom-right-radius: ${theme.spacing(5)};
  z-index: 10000;
  -webkit-transform: translateX(-50%) translateZ(0);
  will-change: transform;
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
