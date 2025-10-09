import styled from '@emotion/styled';
import { useMemo } from 'react';
import { ChracterBox } from './ChracterBox';
import RankData from '@/MockData/Rank.json';
import { theme } from '@/styles/theme';

export const TopRankList = ({ isScoreRank }: { isScoreRank: boolean }) => {
  const { data } = RankData;
  const sortedData = useMemo(() => {
    const desiredOrder = [2, 1, 3];
    const getRank = (item: { ScoreRank: number; AttandanceRank: number }) =>
      isScoreRank ? item.ScoreRank : item.AttandanceRank;
    return [...data].sort(
      (a, b) => desiredOrder.indexOf(getRank(a)) - desiredOrder.indexOf(getRank(b)),
    );
  }, [data, isScoreRank]);

  return (
    <Wrapper>
      {sortedData.map((item) => (
        <ChracterBox
          key={`${item.name}-${isScoreRank ? item.ScoreRank : item.AttandanceRank}`}
          $rank={isScoreRank ? item.ScoreRank : item.AttandanceRank}
          name={item.name}
          score={item.score}
        />
      ))}
    </Wrapper>
  );
};

export default TopRankList;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding: 0 ${theme.spacing(2)};
  gap: clamp(8px, 2vw, ${theme.spacing(3)});
  margin-top: ${theme.spacing(12)};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
