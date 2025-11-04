export type Tier = {
  grade: string;
  label: string;
  min: number;
  max?: number;
  icon: string;
  scoreColor?: string;
};

export interface UserTier {
  userRatingPoint: number;
  userTier: string;
}

export interface Nickname {
  nickname: string;
}
