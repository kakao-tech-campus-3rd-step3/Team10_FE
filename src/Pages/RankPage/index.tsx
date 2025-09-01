import { Container } from '@/Shared/components/Container';
import NavigationBar from '@/Shared/components/NavigationBar';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import CalenderIcon from '@/MockData/calendar.png';
import { RankButton } from './RankButton';
import { useMemo, useState } from 'react';
import { ChracterBox } from './ChracterBox';
import RankData from '@/MockData/Rank.json';
import { MyRank } from './MyRank';
import MyRankData from '@/MockData/MyRank.json';
export const RankPage = () => {
  const [isActive, setIsActive] = useState(false);
  const { data: rankData } = RankData;
  const sortedData = useMemo(() => {
    const desiredOrder = [2, 1, 3];
    const getRank = (item: { ScoreRank: number; AttandanceRank: number }) =>
      isActive ? item.ScoreRank : item.AttandanceRank;
    return [...rankData].sort(
      (a, b) => desiredOrder.indexOf(getRank(a)) - desiredOrder.indexOf(getRank(b)),
    );
  }, [rankData, isActive]);
  const { data: myRankData } = MyRankData;
  const { scoreRank, attandanceRank } = myRankData;
  return (
    <Container>
      <Header>
        <Title>랭크</Title>
      </Header>
      <NavigationBar />
      <StatusAndCalendarWrapper>
        <StatusLabel>
          <span role="img" aria-label="growth chart">
            📈
          </span>{' '}
          성장주 투자자
        </StatusLabel>
        <CalendarButton>
          <CalendarIcon src={CalenderIcon} alt="캘린더" />
        </CalendarButton>
      </StatusAndCalendarWrapper>
      <RankPageContainer>
        <RankButtonWrapper>
          <RankButton
            $isActive={isActive}
            buttonText="점수 랭킹"
            onClick={() => setIsActive(true)}
          />
          <RankButton
            $isActive={!isActive}
            buttonText="성실 랭킹"
            onClick={() => setIsActive(false)}
          />
        </RankButtonWrapper>
        <ChracterBoxWrapper>
          {sortedData.map((item) => (
            <ChracterBox
              key={`${item.name}-${isActive ? item.ScoreRank : item.AttandanceRank}`}
              $rank={isActive ? item.ScoreRank : item.AttandanceRank}
              name={item.name}
              score={item.score}
            />
          ))}
        </ChracterBoxWrapper>
        <MyRank
          myName={isActive ? scoreRank.myName : attandanceRank.myName}
          myRank={isActive ? scoreRank.myRank : attandanceRank.myRank}
          myScore={isActive ? scoreRank.myScore : attandanceRank.myScore}
          prevName={isActive ? scoreRank.prevName : attandanceRank.prevName}
          prevRank={isActive ? scoreRank.prevRank : attandanceRank.prevRank}
          prevScore={isActive ? scoreRank.prevScore : attandanceRank.prevScore}
          nextName={isActive ? scoreRank.nextName : attandanceRank.nextName}
          nextRank={isActive ? scoreRank.nextRank : attandanceRank.nextRank}
          nextScore={isActive ? scoreRank.nextScore : attandanceRank.nextScore}
          isScoreRank={isActive}
        />
      </RankPageContainer>
    </Container>
  );
};
const Header = styled.header`
  padding: ${theme.spacing(5)};
  text-align: center;
  background-color: ${theme.colors.background};
  border-bottom-left-radius: ${theme.spacing(5)};
  border-bottom-right-radius: ${theme.spacing(5)};
`;
const Title = styled.h1`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
`;
const StatusAndCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing(5)};
  margin-top: ${theme.spacing(4)};
`;
const StatusLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
`;
const CalendarButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;
const CalendarIcon = styled.img`
  width: ${theme.spacing(12)};
  height: ${theme.spacing(12)};
`;
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
const RankButtonWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: -20px;
  align-items: center;
  /* Overlap the second button by ~10px horizontally */
  button + button {
    /* Sum of button widths: active(240px) + inactive(180px) = 420px */
    margin-left: min(0px, calc(100% - 420px));
  }
`;
const ChracterBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 ${theme.spacing(2)};
  gap: ${theme.spacing(3)};
  margin-top: ${theme.spacing(12)};
`;
