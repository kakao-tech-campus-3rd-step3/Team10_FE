import styled from '@emotion/styled';
import { Container as BaseContainer } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { theme } from '@/styles/theme';

import CharacterMain from '@/assets/HomeImg/character.webp';
import { useQueryApi } from '@/Apis/useQueryApi';
import { TIERS } from './constants';
import type { Tier } from './types';
import type { Nickname, UserTier } from './types';
import { useCurrentTier } from './hooks/useCurrentTier';

export const TierPage = () => {
  const {
    data: nickname,
    isLoading: isNicknameLoading,
    isError: isNicknameError,
  } = useQueryApi<Nickname>(['user', 'nickname'], '/users/me/nickname');
  const {
    data: userTier,
    isLoading: isUserTierLoading,
    isError: isUserTierError,
  } = useQueryApi<UserTier>(['user', 'tier'], '/users/me/tier');

  const currentTier = useCurrentTier(userTier);

  const displayName = nickname?.nickname?.trim() || '사용자';

  const isLoading = isNicknameLoading || isUserTierLoading;
  const isError = isNicknameError || isUserTierError;

  if (isLoading) {
    return (
      <Container $scrollable={true} $hasBottomNav={false}>
        <Header title="티어 페이지" hasPrevPage={true} />
        <ContentWrapper>
          <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
        </ContentWrapper>
      </Container>
    );
  }

  if (isError || !userTier) {
    return (
      <Container $scrollable={true} $hasBottomNav={false}>
        <Header title="티어 페이지" hasPrevPage={true} />
        <ContentWrapper>
          <ErrorMessage>티어 정보를 불러올 수 없습니다.</ErrorMessage>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container $scrollable={true} $hasBottomNav={false}>
      <Header title="티어 페이지" hasPrevPage={true} />
      <ContentWrapper>
        <TierCard>
          <TierList>
            {TIERS.map((t: Tier) => (
              <TierRow key={t.grade}>
                <IconImg src={t.icon} alt={`${t.label} 아이콘`} />
                <TierTexts>
                  <TierName>{t.label}</TierName>
                  <TierRange>{t.max ? `${t.min}점 ~ ${t.max}점` : `${t.min}점 이상`}</TierRange>
                </TierTexts>
              </TierRow>
            ))}
          </TierList>
          <TierSummary>
            <SummaryContent>
              <img src={currentTier.icon} alt="현재 티어 아이콘" width="100" />
              <SummaryText>
                <b>{displayName}</b>님은 현재
                <br />
                <Highlight>{currentTier.label}</Highlight> 입니다
              </SummaryText>
            </SummaryContent>
            <ScoreArea>
              <ScoreBlock>
                <ScoreLabel>현재 점수</ScoreLabel>
                <ScoreValue>{userTier.userRatingPoint.toLocaleString()}</ScoreValue>
              </ScoreBlock>
              <CharacterImg src={CharacterMain} alt="캐릭터 이미지" />
            </ScoreArea>
          </TierSummary>
        </TierCard>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled(BaseContainer)`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
`;

const TierCard = styled.section`
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(247, 243, 243, 0.1);
  margin-top: 20px;
`;

const TierList = styled.div`
  background: #f7f7f7c5;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TierRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const IconImg = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
`;

const TierTexts = styled.div`
  width: 158px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TierName = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #100b01ff;
`;

const TierRange = styled.div`
  font-size: 20px;
  color: #277911;
  font-weight: bold;
`;

const TierSummary = styled.section`
  background: #c6f290;
  padding: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  font-size: 36px;
  font-weight: 500;
`;

const SummaryText = styled.p`
  width: 160px;
  margin: 0;
  line-height: 1.5;
  color: #333;
  font-size: 24px;

  b {
    font-weight: 700;
    color: #277911;
  }
`;

const Highlight = styled.span`
  color: #764c05;
  font-weight: 700;
`;

const ScoreArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  gap: 16px;
`;

const ScoreBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScoreLabel = styled.div`
  font-size: 14px;
  color: #555;
`;

const ScoreValue = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 42px;
  color: #3f4a3c;
  line-height: 1;
  text-align: center;

  &::after {
    content: '점';
    font-size: 16px;
    font-weight: 500;
    margin-left: 2px;
  }

  @media (max-width: 420px) {
    &::after {
      content: none;
    }
  }
`;

const CharacterImg = styled.img`
  width: 140px;
  height: auto;
  object-fit: contain;
  align-self: center;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: ${theme.colors.text};
  font-family: ${theme.font.regular.fontFamily};
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #dc3545;
  font-family: ${theme.font.regular.fontFamily};
`;
