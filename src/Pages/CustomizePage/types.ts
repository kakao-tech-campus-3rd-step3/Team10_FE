export type CostumeItem = {
  id: number;
  isWorn: boolean;
  costumeItemImageUrl: string;
};
export type CostumeListResponse = {
  costumeItems: CostumeItem[];
};
export interface HomeResponse {
  characterUri: string;
  nickname: string;
  tierName: string;
  testResult: string;
}
