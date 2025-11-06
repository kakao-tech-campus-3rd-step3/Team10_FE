import styled from '@emotion/styled';
import LogoFace from '@/assets/HomeImg/character.webp';
import { Container } from '@/Shared/components/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/Shared/components/LoadingSpinner';

export const SplashPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (isAuthenticated) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      }, 1000);
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <CenteredContainer>
      <Logo src={LogoFace} alt="앱 로고" />
      {isLoading && (
        <LoadingContainer>
          <LoadingSpinner size="medium" message="앱을 시작하는 중..." />
        </LoadingContainer>
      )}
    </CenteredContainer>
  );
};

export default SplashPage;

const CenteredContainer = styled(Container)`
  > * {
    align-items: center;
    justify-content: center;
  }
`;

const Logo = styled.img`
  width: 228px;
  height: 228px;
  object-fit: contain;
`;

const LoadingContainer = styled.div`
  margin-top: 40px;
`;
