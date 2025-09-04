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
export const RankPage = () => {
  const [isScoreRank, setIsScoreRank] = useState<boolean>(true);

  return (
    <Container>
      <Header title="랭킹" />
      <NavigationBar />
      <StatusActionBar />
      <RankPageContainer>
        <SelectableButtonTabs
          isActive={isScoreRank}
          onSelect={setIsScoreRank}
          firstButtonText="점수 랭킹"
          secondButtonText="성실 랭킹"
        />
        <TopRankList isScoreRank={isScoreRank} />
        <MyRankSection isScoreRank={isScoreRank} />
      </RankPageContainer>
    </Container>
  );
};

const RankPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing(8)} ${theme.spacing(3)};
  padding-top: ${theme.spacing(12)};
  position: relative;
  background-color: #ffffff;
  border-radius: ${theme.spacing(5)};
  padding-bottom: ${theme.spacing(6)};
`;
