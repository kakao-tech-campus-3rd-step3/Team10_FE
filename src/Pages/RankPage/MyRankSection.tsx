import { MyRank } from './MyRank';
import type { RankingUser } from './types';

export const MyRankSection = ({
  isScoreRank,
  currentUser,
  adjacentUsers,
}: {
  isScoreRank: boolean;
  currentUser: RankingUser;
  adjacentUsers: RankingUser[];
}) => {
  const prev = adjacentUsers[0];
  const next = adjacentUsers[1];

  const data = {
    prevRank: prev?.rank ?? 0,
    prevName: prev?.nickname ?? '',
    prevScore: prev?.point ?? 0,
    myRank: currentUser.rank,
    myName: currentUser.nickname,
    myScore: currentUser.point,
    nextRank: next?.rank ?? 0,
    nextName: next?.nickname ?? '',
    nextScore: next?.point ?? 0,
  };

  return <MyRank data={data} isScoreRank={isScoreRank} />;
};

export default MyRankSection;
