import IconBoss from '@/assets/TierImg/tier_boss.webp';
import IconDividend from '@/assets/TierImg/tier_dividend.webp';
import IconBlueChip from '@/assets/TierImg/tier_bluechip.webp';
import IconGrowth from '@/assets/TierImg/tier_growth.webp';
import IconSeed from '@/assets/TierImg/tier_seed.webp';
import type { Tier } from './types';

export const TIERS: Tier[] = [
  {
    grade: 'S',
    label: '세력',
    min: 5401,
    icon: IconBoss,
    scoreColor: '#B47101',
  },
  {
    grade: 'A',
    label: '배당주 수확자',
    min: 4801,
    max: 5400,
    icon: IconDividend,
    scoreColor: '#BAA782',
  },
  {
    grade: 'B',
    label: '우량주 투자자',
    min: 3201,
    max: 4800,
    icon: IconBlueChip,
    scoreColor: '#D7C49E',
  },
  {
    grade: 'C',
    label: '성장주 투자자',
    min: 1601,
    max: 3200,
    icon: IconGrowth,
    scoreColor: '#ACACAC',
  },
  {
    grade: 'D',
    label: '기초 자본',
    min: 0,
    max: 1600,
    icon: IconSeed,
    scoreColor: '#D3D3D3',
  },
];
