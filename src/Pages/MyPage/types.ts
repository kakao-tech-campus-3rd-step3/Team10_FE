export interface MyPageResponse {
  characterUri: string;
  nickname: string;
  tierName: string;
  ratingPoint: number;
  testResult: string;
  testResultDescription: string;
}
export interface TestResult {
  propensity: string;
  propensityKoreanName: string;
  isTested: boolean;
}
interface SharingResponse {
  characterUri: string;
  nickname: string;
  tierName: string;
  ratingPoint: number;
  testResult: string;
  testResultDescription: string;
}
