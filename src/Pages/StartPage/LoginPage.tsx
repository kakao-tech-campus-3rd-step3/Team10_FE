import styled from '@emotion/styled';
import LogoFace from './assets/kongsik_face.png';
import KakaoLoginButton from './kakaoLoginButton';
import { Container } from '@/Shared/components/Container';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    navigate('/character-create');
  };
  return (
    <CenteredContainer>
      <Logo src={LogoFace} alt="앱 로고" />
      <Slogan>쉽고 정확하게, 나만의 경제 교과서</Slogan>
      <AppName>이게 머니</AppName>
      <KakaoLoginButton onClick={handleKakaoLogin} />
    </CenteredContainer>
  );
}

const CenteredContainer = styled(Container)`
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 228px;
  height: 228px;
  object-fit: contain;
`;

const Slogan = styled.p`
  margin: 0;
  font-size: 22px;
  font: ${({ theme }) => theme.font.regular};
  color: ${({ theme }) => theme.colors.text};
`;

const AppName = styled.h1`
  margin: 27px 0 86px 0;
  font-size: 29px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
`;
