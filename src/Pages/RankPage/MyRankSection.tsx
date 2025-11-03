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
  const sortedAbove = [...(aboveUsers ?? [])].sort((a, b) => b.point - a.point).slice(0, 2);
  const sortedBelow = [...(belowUsers ?? [])].sort((a, b) => b.point - a.point).slice(0, 2);

  const above1 = sortedAbove[0];
  const above2 = sortedAbove[1];

  const below1 = sortedBelow[0];
  const below2 = sortedBelow[1];

  const data = {
    above1Rank: above1?.rank ?? 0,
    above1Name: above1?.nickname ?? '',
    above1Score: above1?.point ?? 0,
    above2Rank: above2?.rank ?? 0,
    above2Name: above2?.nickname ?? '',
    above2Score: above2?.point ?? 0,
    myRank: currentUser.rank,
    myName: currentUser.nickname,
    myScore: currentUser.point,
    below1Rank: below1?.rank ?? 0,
    below1Name: below1?.nickname ?? '',
    below1Score: below1?.point ?? 0,
    below2Rank: below2?.rank ?? 0,
    below2Name: below2?.nickname ?? '',
    below2Score: below2?.point ?? 0,
  };

  return <MyRank data={data} isScoreRank={isScoreRank} />;
};

export default MyRankSection;
