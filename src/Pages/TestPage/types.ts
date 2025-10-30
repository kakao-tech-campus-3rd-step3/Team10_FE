export type Answer = {
  q1?: string;
  q2?: string;
  q3: string[];
  q4?: string;
  q5?: string;
  q6?: string;
  q7?: string;
};

export type Step = 0 | 1 | 2 | 3;

export interface TestPageProps {
  onSubmit?: (answers: Answer) => void;
}

export type DiagnoseReq = { totalScore: number };
export type DiagnoseRes = { propensityKoreanName: string };

export type PropensityResponse = {
  isTested: boolean;
  propensityKoreanName?: string;
};
