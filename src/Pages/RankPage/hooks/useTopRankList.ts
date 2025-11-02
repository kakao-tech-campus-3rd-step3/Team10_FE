import { useMemo } from 'react';
import type { RankingUser } from '../types';

export const useTopRankList = (topRankingUsers: RankingUser[]) => {
  const { arranged, rankLabels } = useMemo(() => {
    const sortedByPoint = [...topRankingUsers].sort((a, b) => b.point - a.point);
    const top3 = sortedByPoint.slice(0, 3);
    const [first, second, third] = top3;
    const arranged = [second, first, third].filter(Boolean) as RankingUser[];
    const labels = [2, 1, 3];
    const rankLabels = labels.slice(0, arranged.length);

    return { arranged, rankLabels };
  }, [topRankingUsers]);

  return { arranged, rankLabels };
};
