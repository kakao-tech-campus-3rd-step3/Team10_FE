import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import CharacterMain from '@/assets/HomeImg/character.webp';
import QuizIcon from '@/assets/HomeImg/quiz.webp';
import NewsIcon from '@/assets/HomeImg/news.webp';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/Shared/components/Header';
import { StatusActionBar } from '@/Shared/components/StatusActionBar';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { HomeResponse, PropensityResponse } from './types';
import { toAbsoluteUrl } from '@/utils/urlUtils';
import type { ReviewQuizResponse } from '@/Pages/QuizPage/types';

export const HomePage = () => {
  const navigate = useNavigate();
  const {
    data: homeData,
    error: homeError,
    isLoading: homeIsLoading,
  } = useQueryApi<HomeResponse>(['page', 'home'], '/page/home');

  const {
    data: propensityData,
    error: propensityError,
    isLoading: propensityIsLoading,
  } = useQueryApi<PropensityResponse>(['users', 'me', 'propensity'], '/users/me/propensity');

  // 복습 퀴즈 확인 (수동으로만 호출)
  const { refetch: refetchReviewQuizzes } = useQueryApi<ReviewQuizResponse>(
    ['quiz', 'review'],
    '/quiz/review',
    {
      enabled: false,
    },
  );

  const handleInvestmentTest = async () => {
    // 복습 퀴즈 확인
    const { data } = await refetchReviewQuizzes();

    if (data?.reviewQuizzes && data.reviewQuizzes.length > 0) {
      // 복습 퀴즈가 있으면 첫 번째 복습 퀴즈로 이동
      navigate(`/quiz/review/${data.reviewQuizzes[0].quizId}`, {
        state: {
          isReview: true,
          reviewQuizzes: data.reviewQuizzes,
          currentReviewIndex: 0,
        },
      });
    } else {
      // 복습 퀴즈가 없으면 토픽 선택 페이지로 이동
      navigate('/topics');
    }
  };
  const goToTestPage = () => {
    navigate('/test');
  };
  const goToContentsPage = () => {
    navigate('/contents');
  };

  if (homeIsLoading) {
    return (
      <Container $scrollable={true}>
        <Header title="홈 화면" hasPrevPage={false} />
        <NavigationBar />
        <StatusActionBar />
        <HomePageContainer>
          <LoadingMessage role="status" aria-live="polite" aria-label="로딩 중">
            홈 데이터를 불러오는 중...
          </LoadingMessage>
        </HomePageContainer>
      </Container>
    );
  }

  if (homeError || !homeData) {
    return (
      <Container $scrollable={true}>
        <Header title="홈 화면" hasPrevPage={false} />
        <NavigationBar />
        <StatusActionBar />
        <HomePageContainer>
          <ErrorMessage role="alert" aria-live="assertive" aria-label="오류 메시지">
            홈 데이터를 불러오는데 실패했습니다.
          </ErrorMessage>
        </HomePageContainer>
      </Container>
    );
  }

  const { characterUri, nickname } = homeData;
  const characterSrc = toAbsoluteUrl(characterUri) || CharacterMain;

  const isTested = propensityData?.isTested;
  const testResult = propensityData?.propensityKoreanName || '';
  let propensityText: string = '';
  if (propensityIsLoading) {
    propensityText = '나의 투자 성향을 불러오는 중...';
  } else if (propensityError || !propensityData) {
    propensityText = '나의 투자 성향을 불러오는데 실패했습니다';
  } else if (!isTested) {
    propensityText = '나의 투자 성향을 테스트 해보세요';
  }

  return (
    <Container $scrollable={true}>
      <Header title="홈 화면" hasPrevPage={false} />
      <NavigationBar />
      <StatusActionBar />
      <HomePageContainer>
        <CharacterSectionWrapper role="region" aria-label="캐릭터 섹션">
          <Character
            key={characterSrc}
            src={characterSrc}
            alt="사용자 캐릭터"
            onError={(e) => {
              e.currentTarget.src = CharacterMain;
            }}
          />
        </CharacterSectionWrapper>
        <BottomSectionWrapper role="region" aria-label="사용자 정보 및 메뉴">
          <NicknameBox role="group" aria-label="닉네임 정보">
            <Nickname aria-label={`닉네임: ${nickname}`}>{nickname}</Nickname>
            <NicknameChangeButton
              type="button"
              aria-label="닉네임 변경하기"
              onClick={() => navigate('/nickname-edit')}
            >
              닉네임 변경하기
            </NicknameChangeButton>
          </NicknameBox>
          <InvestmentTypeBox role="region" aria-label="투자 성향 정보">
            {isTested ? (
              <>
                <InvestmentText aria-label={`투자 성향: ${testResult}`}>
                  {testResult}
                </InvestmentText>
                <RetestButton
                  type="button"
                  aria-label="투자 성향 테스트 다시하기"
                  onClick={goToTestPage}
                >
                  다시 테스트 하기
                </RetestButton>
              </>
            ) : (
              <TestButton type="button" aria-label="투자 성향 테스트하기" onClick={goToTestPage}>
                {propensityText}
              </TestButton>
            )}
          </InvestmentTypeBox>
          <TwoButtonsWrapper role="group" aria-label="주요 메뉴">
            <QuizButton onClick={handleInvestmentTest} aria-label="퀴즈 풀기">
              <IconImg src={QuizIcon} alt="" aria-hidden="true" />
              <ButtonText>퀴즈 풀기</ButtonText>
            </QuizButton>
            <FinanceButton onClick={goToContentsPage} aria-label="금융 콘텐츠 보기">
              <IconImg src={NewsIcon} alt="" aria-hidden="true" />
              <ButtonText>금융 콘텐츠</ButtonText>
            </FinanceButton>
          </TwoButtonsWrapper>
        </BottomSectionWrapper>
      </HomePageContainer>
    </Container>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const CharacterSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing(3)};
`;

const Character = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;
`;

const BottomSectionWrapper = styled.div`
  width: 90%; /* 가로 폭을 90%로 줄임 */
  margin: 0 auto; /* 가운데 정렬 */
  background-color: #fafafa;
  border-radius: ${theme.spacing(2)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing(5)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  margin-top: ${theme.spacing(5)};
`;

const NicknameBox = styled.div`
  background-color: transparent;
  margin-top: ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nickname = styled.p`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
`;

const NicknameChangeButton = styled.button`
  background: transparent;
  border: none;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 12px;
  color: ${theme.colors.text};
  opacity: 0.7;
  cursor: pointer;
  margin-top: ${theme.spacing(1)};
  padding: 0;

  &:hover {
    opacity: 1;
  }
`;

const InvestmentTypeBox = styled.div`
  width: 100%;
  padding: ${theme.spacing(2)};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(2)};
`;

const InvestmentText = styled.p`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 18px;
  color: ${theme.colors.text};
  margin: 0;
  flex-grow: 1;
  text-align: center;
`;

const RetestButton = styled.button`
  background: transparent;
  border: none;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 12px;
  color: ${theme.colors.text};
  opacity: 0.85;
  cursor: pointer;
`;

const TestButton = styled.button`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${theme.colors.text};
  margin: 0;
  flex-grow: 1;
  text-align: center;

  background: transparent;
  border: none;
  cursor: pointer;
`;

const TwoButtonsWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: ${theme.spacing(4)};
  flex-wrap: nowrap;
  overflow: visible;
`;

const QuizButton = styled.button`
  --icon-size: clamp(75px, 25vw, 100px);
  --pad: clamp(16px, 4vw, ${theme.spacing(6)});
  background-color: ${theme.colors.background};
  border: none;
  border-radius: ${theme.spacing(2)};
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(1)};
  width: min(360px, calc((100% - ${theme.spacing(4)}) / 2));
  min-width: calc(var(--icon-size) + (var(--pad) * 2));
  padding: var(--pad);
  box-sizing: border-box;
  flex: 0 1 auto;
`;

const IconImg = styled.img`
  width: var(--icon-size);
  height: auto;
  object-fit: contain;
`;

const FinanceButton = styled(QuizButton)``;

const ButtonText = styled.span`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${theme.colors.text};
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #dc3545;
`;
