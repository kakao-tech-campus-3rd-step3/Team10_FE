import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Header } from '@/Shared/components/Header';
import NavigationBar from '@/Shared/components/NavigationBar';
import { StatusActionBar } from '@/Shared/components/StatusActionBar';
import { Container } from '@/Shared/components/Container';
import CharacterMain from '@/assets/HomeImg/character.webp';
import { useNavigate } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import { toAbsoluteUrl } from '@/utils/urlUtils';
import { DESCRIPTIONS } from '@/Pages/TestPage/constants';
import type { MyPageResponse, TestResult } from './types';
import { useTokenCookies } from '@/utils/cookie';
import { useQueryClient } from '@tanstack/react-query';

export const MyPage = () => {
  const navigate = useNavigate();
  const { clearTokens } = useTokenCookies();
  const queryClient = useQueryClient();

  const { data: myPageData } = useQueryApi<MyPageResponse>(['page', 'mypage'], '/page/mypage');
  const { data: testResultData } = useQueryApi<TestResult>(
    ['users', 'me', 'propensity'],
    '/users/me/propensity',
  );
  const handleShareClick = () => {
    navigate('/sharing');
  };

  const handleLogout = () => {
    clearTokens();
    queryClient.clear();
    navigate('/login');
  };

  const characterSrc = toAbsoluteUrl(myPageData?.characterUri) || CharacterMain;
  const resultDescription = testResultData?.propensityKoreanName
    ? DESCRIPTIONS[testResultData.propensityKoreanName]
    : undefined;

  return (
    <Container>
      <Header title="마이 페이지" hasPrevPage={true} />
      <NavigationBar />
      <StatusActionBar />
      <CharacterAndNicknameWrapper>
        <Character
          key={characterSrc}
          src={characterSrc}
          alt="캐릭터"
          onError={(e) => {
            e.currentTarget.src = CharacterMain;
          }}
        />
        <NicknameBox>
          <Nickname>{myPageData?.nickname}</Nickname>
        </NicknameBox>
      </CharacterAndNicknameWrapper>
      <ResultWrapper>
        <ResultTitle>{testResultData?.propensityKoreanName}</ResultTitle>
        <ResultDescription>{resultDescription}</ResultDescription>
      </ResultWrapper>
      <ButtonWrapper>
        <ShareButton onClick={handleShareClick}>공유하기</ShareButton>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ButtonWrapper>
    </Container>
  );
};

export default MyPage;

const CharacterAndNicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${theme.spacing(5)};
`;

const Character = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;
`;

const NicknameBox = styled.div`
  border: 2px solid ${theme.colors.secondary};
  background-color: ${theme.colors.background};
  padding: ${theme.spacing(2)} ${theme.spacing(5)};
  border-radius: 999px;
  margin-top: ${theme.spacing(4)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
`;

const Nickname = styled.p`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 18px;
  margin: 0;
`;

const ResultWrapper = styled.div`
  width: 90%;
  margin: ${theme.spacing(5)} auto;
  background-color: #ffffff;
  border-radius: ${theme.spacing(8)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: ${theme.spacing(5)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ResultTitle = styled.h2`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 20px;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing(2)};
`;

const ResultDescription = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 14px;
  color: ${theme.colors.text};
  line-height: 1.5;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  margin: ${theme.spacing(4)} auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`;

const ShareButton = styled.button`
  width: 100%;
  padding: ${theme.spacing(4)};
  background-color: ${theme.colors.secondary};
  color: #fff;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  border: none;
  border-radius: ${theme.spacing(5)};
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
  color: #666666;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: ${theme.spacing(5)};
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f7f7f7;
    border-color: #999999;
  }

  &:active {
    transform: scale(0.98);
  }
`;
