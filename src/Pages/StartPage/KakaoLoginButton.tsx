import styled from '@emotion/styled';
import KakaoLoginImg from '@/assets/StartPage/kakao_login_large_narrow.webp';
import { useKakaoAuth } from '@/Apis/kakao';

export const KakaoLoginButton = () => {
  const { startKakaoLogin } = useKakaoAuth();

  return (
    <Container type="button" onClick={startKakaoLogin}>
      <img src={KakaoLoginImg} alt="카카오 로그인" />
    </Container>
  );
};

export default KakaoLoginButton;

const Container = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    max-width: 243px;
    height: auto;
  }
`;
