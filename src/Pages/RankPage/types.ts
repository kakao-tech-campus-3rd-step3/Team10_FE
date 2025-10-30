export interface RankingUser {
  nickname: string;
  point: number;
  rank: number;
}
export interface RankingResponse {
  currentUser: RankingUser;
  topRankingUsers: RankingUser[];
  adjacentUsers: RankingUser[];
}
