import { MyRank } from './MyRank';
import MyRankData from '@/MockData/MyRank.json';

export const MyRankSection = ({ isScoreRank }: { isScoreRank: boolean }) => {
  const { data } = MyRankData;
  const { scoreRank, attandanceRank } = data;
  return <MyRank data={isScoreRank ? scoreRank : attandanceRank} isScoreRank={isScoreRank} />;
};
