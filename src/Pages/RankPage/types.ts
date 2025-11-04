export interface RankingUser {
  nickname: string;
  point: number;
  rank: number;
  kongSkinUrl: string;
}
export interface RankingResponse {
  currentUser: RankingUser;
  topRankingUsers: RankingUser[];
  aboveUsers: RankingUser[];
  belowUsers: RankingUser[];
}
