import { useMemo } from 'react';
import { MyRank } from './MyRank';
import type { RankingUser } from './types';

export const MyRankSection = ({
  isScoreRank,
  currentUser,
  aboveUsers,
  belowUsers,
  topRankingUsers,
}: {
  isScoreRank: boolean;
  currentUser: RankingUser;
  aboveUsers: RankingUser[];
  belowUsers: RankingUser[];
  topRankingUsers: RankingUser[];
}) => {
  const availableUsers = useMemo(() => {
    return topRankingUsers
      .filter((user) => user.nickname !== currentUser.nickname)
      .sort((a, b) => b.point - a.point);
  }, [topRankingUsers, currentUser.nickname]);

  const allAboveUsers = useMemo(() => {
    const combined = [
      ...(aboveUsers ?? []),
      ...availableUsers.filter((user) => user.rank < currentUser.rank),
    ];
    const unique = Array.from(new Map(combined.map((user) => [user.nickname, user])).values());
    return unique.sort((a, b) => a.rank - b.rank).slice(0, 2);
  }, [aboveUsers, availableUsers, currentUser.rank]);

  const allBelowUsers = useMemo(() => {
    const combined = [
      ...(belowUsers ?? []),
      ...availableUsers.filter((user) => user.rank > currentUser.rank),
    ];
    const unique = Array.from(new Map(combined.map((user) => [user.nickname, user])).values());
    return unique.sort((a, b) => a.rank - b.rank).slice(0, 2);
  }, [belowUsers, availableUsers, currentUser.rank]);

  const above1 = allAboveUsers[0];
  const above2 = allAboveUsers[1];
  const below1 = allBelowUsers[0];
  const below2 = allBelowUsers[1];

  const data = {
    above1: above1 || null,
    above2: above2 || null,
    myRank: currentUser.rank,
    myName: currentUser.nickname,
    myScore: currentUser.point,
    below1: below1 || null,
    below2: below2 || null,
  };

  return <MyRank data={data} isScoreRank={isScoreRank} />;
};

export default MyRankSection;
