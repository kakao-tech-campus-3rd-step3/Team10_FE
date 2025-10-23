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

  const myRank = 100;

  const data = {
    prevRank: myRank - 1,
    prevName: prev?.nickname ?? '',
    prevScore: prev?.point ?? 0,
    myRank: myRank,
    myName: currentUser.nickname,
    myScore: currentUser.point,
    nextRank: myRank + 1,
    nextName: next?.nickname ?? '',
    nextScore: next?.point ?? 0,
  };

  return <MyRank data={data} isScoreRank={isScoreRank} />;
};

export default MyRankSection;
