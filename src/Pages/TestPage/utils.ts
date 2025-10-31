import {
  Q1_SCORES,
  Q2_SCORES,
  Q3_SCORES,
  Q4_SCORES,
  Q5_SCORES,
  Q6_SCORES,
  Q7_SCORES,
} from './constants';
import type { Answer, Step } from './types';

export const scoreOf = (table: Record<string, number>, picked?: string) =>
  picked ? (table[picked] ?? 0) : 0;

export const computeTotalScore = (a: Answer) => {
  const s1 = scoreOf(Q1_SCORES, a.q1);
  const s2 = scoreOf(Q2_SCORES, a.q2);
  const s3 = a.q3.reduce((sum, v) => sum + (Q3_SCORES[v] ?? 0), 0);
  const s4 = scoreOf(Q4_SCORES, a.q4);
  const s5 = scoreOf(Q5_SCORES, a.q5);
  const s6 = scoreOf(Q6_SCORES, a.q6);
  const s7 = scoreOf(Q7_SCORES, a.q7);
  const total = s1 + s2 + s3 + s4 + s5 + s6 + s7;
  return Number.isFinite(total) ? total : 0;
};

export const isStepValid = (currentStep: Step, currentAnswers: Answer) => {
  switch (currentStep) {
    case 0:
      return !!currentAnswers.q1 && !!currentAnswers.q2;
    case 1:
      return currentAnswers.q3.length > 0 && !!currentAnswers.q4;
    case 2:
      return !!currentAnswers.q5 && !!currentAnswers.q6;
    case 3:
      return !!currentAnswers.q7;
    default:
      return false;
  }
};
