import styled from '@emotion/styled';
import LogoFace from './assets/kongsik_face.png';
import { Container } from '@/Shared/components/Container';

export default function SplashPage() {
  return (
    <CenteredContainer>
      <Logo src={LogoFace} alt="앱 로고" />
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
