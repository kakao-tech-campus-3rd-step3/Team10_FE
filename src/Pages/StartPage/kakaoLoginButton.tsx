import styled from '@emotion/styled';
import KakaoLoginImg from './assets/kakao_login_large_narrow.png';

export default function KakaoLoginButton() {
  return (
    <Container type="button">
      <img src={KakaoLoginImg} alt="카카오 로그인" />
    </Container>
  );
}

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
