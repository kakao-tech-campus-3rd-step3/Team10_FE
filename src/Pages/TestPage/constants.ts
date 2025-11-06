import ActiveInvestmentTypeImg from '@/assets/TestPage/Active_investment_type.webp';
import AttackInvestmentTypeImg from '@/assets/TestPage/Attack_investment_type.webp';
import RiskNeutralTypeImg from '@/assets/TestPage/Risk_neutral_type.webp';
import SafetySeekingTypeImg from '@/assets/TestPage/Safety_seeking_type.webp';
import StableTypeImg from '@/assets/TestPage/Stable_type.webp';

export const Q1 = ['19세 이하', '20세~40세', '41세~50세', '51세~60세', '61세 이상'] as const;
export const Q2 = [
  '6개월 이내',
  '6개월 이상~1년 이내',
  '1년 이상~2년 이내',
  '2년 이상~3년 이내',
  '3년 이상',
] as const;
export const Q3 = [
  '은행의 예·적금, 국채, 지방채, 보증채, MMF, CMA 등',
  '금융채, 신용도가 높은 회사채, 채권형펀드, 원금보존추구형ELS 등',
  '신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형펀드 등',
  '신용도가 낮은 회사채, 주식, 원금이 보장되지 않는 ELS, 시장수익률 수준의 수익을 추구하는 주식형펀드 등',
  'ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품에 투자하는 펀드, 주식 신용거래 등',
] as const;
export const Q4 = [
  '[매우 낮은 수준] 투자의사 결정을 스스로 내려본 경험이 없는 정도',
  '[낮은 수준] 주식과 채권의 차이를 구별할 수 있는 정도',
  '[높은 수준] 투자할 수 있는 대부분의 금융상품의 차이를 구별할 수 있는 정도',
  '[매우 높은 수준] 금융상품을 비롯하여 모든 투자대상 상품의 차이를 이해할 수 있는 정도',
] as const;
export const Q5 = [
  '10% 이내',
  '10%이상~20% 이내',
  '20%이상~30% 이내',
  '30%이상~40% 이내',
  '40% 이상',
] as const;
export const Q6 = [
  '현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상된다.',
  '현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상된다.',
  '현재 일정한 수입이 없으며, 연금이 주수입원이다.',
] as const;
export const Q7 = [
  '무슨 일이 있어도 투자원금은 보전되어야 한다.',
  '10% 미만까지는 손실을 감수할 수 있을 것 같다.',
  '20% 미만까지는 손실을 감수할 수 있을 것 같다.',
  '기대수익이 높다면 위험이 높아도 상관하지 않겠다.',
] as const;

const mapScores = (choices: readonly string[], scores: number[]) =>
  Object.fromEntries(choices.map((text, i) => [text, scores[i] ?? 0])) as Record<string, number>;

export const Q1_SCORES = mapScores(Q1, [12, 12, 9, 6, 3]);
export const Q2_SCORES = mapScores(Q2, [3, 6, 9, 12, 15]);
export const Q3_SCORES = mapScores(Q3, [3, 6, 9, 12, 15]);
export const Q4_SCORES = mapScores(Q4, [3, 6, 9, 12]);
export const Q5_SCORES = mapScores(Q5, [15, 12, 9, 6, 3]);
export const Q6_SCORES = mapScores(Q6, [9, 6, 3]);
export const Q7_SCORES = mapScores(Q7, [-6, 6, 12, 18]);

export const DESCRIPTIONS: Record<string, string> = {
  안정형:
    `🛡️ 원금 사수! 안정형\n\n` +
    `수익이 낮아도 원금을 잃는 것은 절대 싫어요. 안전한 예금, 적금이 가장 마음 편해요.\n` +
    `(추천 방향: 정기예금, 적금, 국채)`,

  안정추구형:
    `🌱 차곡차곡! 안정추구형\n\n` +
    `원금은 최대한 지키면서, 예금보다 조금 더 높은 수익을 원해요. 약간의 위험은 감수할 수 있어요.\n` +
    `(추천 방향: 채권, 배당주 펀드, 우량주)`,

  위험중립형:
    `⚖️ 균형 추구! 위험중립형\n\n` +
    `예금보다 높은 수익을 원하며, 이를 위해 어느 정도의 손실 위험은 감수할 수 있어요. 위험과 수익의 균형이 중요해요.\n` +
    `(추천 방향: 혼합형 펀드, 적립식 투자)`,

  적극투자형:
    `📈 고수익 희망! 적극투자형\n\n` +
    `원금을 지키는 것보다 높은 수익을 내는 것이 더 중요해요. 큰 손실 위험을 감수하더라도 주식 비중이 높은 곳에 투자할 수 있어요.\n` +
    `(추천 방향: 주식형 펀드, 성장주)`,

  공격투자형:
    `🚀 과감하게! 공격투자형\n\n` +
    `시장 평균을 훨씬 넘는 고수익을 목표로 해요. 이를 위해 자산 가치가 크게 변동하는 매우 큰 위험도 적극 감수할 수 있어요.\n` +
    `(추천 방향: 주식 직접투자, 고위험/고수익 펀드)`,
};

export const RESULT_IMAGES: Record<string, string> = {
  안정형: StableTypeImg,
  안정추구형: SafetySeekingTypeImg,
  위험중립형: RiskNeutralTypeImg,
  적극투자형: ActiveInvestmentTypeImg,
  공격투자형: AttackInvestmentTypeImg,
};
