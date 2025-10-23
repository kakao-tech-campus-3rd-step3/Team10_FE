import { useMemo } from 'react';
import type { RankingUser } from '../types';

export const useTopRankList = (topRankingUsers: RankingUser[]) => {
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

  return { arranged, rankLabels };
};
