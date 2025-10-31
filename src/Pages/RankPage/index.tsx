import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import NavigationBar from '@/Shared/components/NavigationBar';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { SelectableButtonTabs } from '@/Shared/components/SelectableButton/SelectableButtonTabs';
import { useState } from 'react';
import { TopRankList } from './TopRankList';
import { MyRankSection } from './MyRankSection';
import { StatusActionBar } from '@/Shared/components/StatusActionBar';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { RankingResponse } from './types';

export const RankPage = () => {
  const [isScoreRank, setIsScoreRank] = useState<boolean>(true);

  const endpoint = isScoreRank
    ? '/user/ranking/ratingPoint'
    : '/user/ranking/consecutiveAttendance';

  const queryKey: (string | number)[] = [
    'user',
    'ranking',
    isScoreRank ? 'ratingPoint' : 'consecutiveAttendance',
  ];

  const { data: rankingData, error, isLoading } = useQueryApi<RankingResponse>(queryKey, endpoint);

  if (isLoading) {
    return (
      <Container $scrollable={true}>
        <Header title="랭킹" hasPrevPage={true} />
        <NavigationBar />
        <StatusActionBar />
        <RankPageContainer>
          <LoadingMessage>랭킹 데이터를 불러오는 중...</LoadingMessage>
        </RankPageContainer>
      </Container>
    );
  }

  if (error || !rankingData) {
    return (
      <Container $scrollable={true}>
        <Header title="랭킹" hasPrevPage={true} />
        <NavigationBar />
        <StatusActionBar />
        <RankPageContainer>
          <ErrorMessage>랭킹 데이터를 불러오는데 실패했습니다.</ErrorMessage>
        </RankPageContainer>
      </Container>
    );
  }

  return (
    <Container $scrollable={true}>
      <Header title="랭킹" hasPrevPage={true} />
      <NavigationBar />
      <StatusActionBar />
      <RankPageContainer>
        <SelectableButtonTabs
          isActive={isScoreRank}
          onSelect={setIsScoreRank}
          firstButtonText="점수 랭킹"
          secondButtonText="성실 랭킹"
        />
        <TopRankList topRankingUsers={rankingData.topRankingUsers} />
        <Spacing />
        <MyRankSection
          isScoreRank={isScoreRank}
          currentUser={rankingData.currentUser}
          adjacentUsers={rankingData.adjacentUsers}
        />
      </RankPageContainer>
    </Container>
  );
};

export default RankPage;

const RankPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 ${theme.spacing(3)};
  padding-top: ${theme.spacing(8)};
  position: relative;
  background-color: #ffffff;
  border-radius: ${theme.spacing(5)};
  padding-bottom: ${theme.spacing(6)};
`;

const Spacing = styled.div`
  height: 8px;
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
