import styled from '@emotion/styled';
import LogoFace from './assets/kongsik_face.png';
import { Container } from '@/Shared/components/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const SplashPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }, [navigate]);
  return (
    <CenteredContainer>
      <Logo src={LogoFace} alt="앱 로고" />
    </CenteredContainer>
  );
};

export default SplashPage;

const CenteredContainer = styled(Container)`
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 228px;
  height: 228px;
  object-fit: contain;
`;
