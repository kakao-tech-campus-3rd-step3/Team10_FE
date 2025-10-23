import styled from '@emotion/styled';
import { useMemo } from 'react';
import { ChracterBox } from './ChracterBox';
import { theme } from '@/styles/theme';
import type { RankingUser } from './types';

export const TopRankList = ({ topRankingUsers }: { topRankingUsers: RankingUser[] }) => {
  const sortedByPoint = useMemo(
    () => [...topRankingUsers].sort((a, b) => b.point - a.point),
    [topRankingUsers],
  );
  const top3 = useMemo(() => sortedByPoint.slice(0, 3), [sortedByPoint]);
  const arranged = useMemo(() => {
    const [first, second, third] = top3;
    return [second, first, third].filter(Boolean) as RankingUser[];
  }, [top3]);

  const rankLabels = useMemo(() => {
    const labels = [2, 1, 3];
    return labels.slice(0, arranged.length);
  }, [arranged]);

  return (
    <Wrapper>
      {arranged.map((user, idx) => (
        <ChracterBox
          key={`${user.nickname}-${idx}`}
          $rank={rankLabels[idx]}
          name={user.nickname}
          score={user.point}
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
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.spacing(2)};
  gap: clamp(8px, 2vw, ${theme.spacing(3)});
  margin-top: ${theme.spacing(4)};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
