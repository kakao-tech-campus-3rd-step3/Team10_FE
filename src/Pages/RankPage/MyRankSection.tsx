import { MyRank } from './MyRank';
import type { RankingUser } from './types';

export const MyRankSection = ({
  isScoreRank,
  currentUser,
  aboveUsers,
  belowUsers,
}: {
  isScoreRank: boolean;
  currentUser: RankingUser;
  aboveUsers: RankingUser[];
  belowUsers: RankingUser[];
}) => {
  const above1 = aboveUsers?.[0] || null;
  const above2 = aboveUsers?.[1] || null;
  const below1 = belowUsers?.[0] || null;
  const below2 = belowUsers?.[1] || null;

  const data = {
    above1,
    above2,
    myRank: currentUser.rank,
    myName: currentUser.nickname,
    myScore: currentUser.point,
    below1,
    below2,
  };

  return <MyRank data={data} isScoreRank={isScoreRank} />;
};

export default MyRankSection;
