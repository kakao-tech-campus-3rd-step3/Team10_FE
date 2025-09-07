import styled from '@emotion/styled';
import KakaoLoginImg from './assets/kakao_login_large_narrow.png';

export const KakaoLoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Container type="button" onClick={onClick}>
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
