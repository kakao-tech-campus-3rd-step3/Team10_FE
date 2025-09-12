import styled from '@emotion/styled';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { theme } from '@/styles/theme';
import { useMemo } from 'react';
import IconBoss from '@/assets/TierImg/tier_boss.png';
import IconDividend from '@/assets/TierImg/tier_dividend.png';
import IconBlueChip from '@/assets/TierImg/tier_bluechip.png';
import IconGrowth from '@/assets/TierImg/tier_growth.png';
import IconSeed from '@/assets/TierImg/tier_seed.png';
import CharacterMain from '@/assets/HomeImg/character.png';

type Tier = {
  grade: string;
  label: string;
  min: number;
  max?: number;
  icon?: string;
  scoreColor?: string;
};

const TIERS: Tier[] = [
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

interface TierPageProps {
  nickname?: string;
  score?: number;
}

export const TierPage = ({ nickname = '카테캠 귀요미', score = 3020 }: TierPageProps) => {
  const currentTier = useMemo(() => {
    return (
      TIERS.find((t) => score >= t.min && (t.max === undefined || score <= t.max)) ??
      TIERS[TIERS.length - 1]
    );
  }, [score]);

  return (
    <Container>
      <Header title="" hasPrevPage={true} />
      <TierCard>
        <TierList>
          {TIERS.map((t) => (
            <TierRow key={t.grade}>
              <IconImg src={t.icon} alt={`${t.grade} 아이콘`} />
              <TierTexts>
                <TierName>{t.label}</TierName>
                <TierRange style={{ color: t.scoreColor }}>
                  {t.max ? `${t.min}점 ~ ${t.max}점` : `${t.min}점 이상`}
                </TierRange>
              </TierTexts>
            </TierRow>
          ))}
        </TierList>
        <TierSummary>
          <SummaryTop>
            <SummaryIcon src={currentTier.icon} alt="현재 티어 아이콘" />
            <SummaryText>
              <b>{nickname}</b> 님은
              <br />
              현재 <Highlight>“{currentTier.label}”</Highlight> 입니다.
            </SummaryText>
          </SummaryTop>
          <ScoreArea>
            <ScoreBlock>
              <ScoreLabel>현재 점수</ScoreLabel>
              <ScoreValue>{score}점</ScoreValue>
            </ScoreBlock>
            <CharacterImg src={CharacterMain} alt="캐릭터 이미지" />
          </ScoreArea>
        </TierSummary>
      </TierCard>
    </Container>
  );
};

export default TierPage;

const TierCard = styled.section`
  margin: 0 33px;
  border-radius: 47px;
  overflow: hidden;
`;

const TierList = styled.section`
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 22px 40px;
`;

const TierRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const IconImg = styled.img`
  width: 77px;
  height: 77px;
  object-fit: contain;
`;

const TierTexts = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TierName = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 22px;
`;

const TierRange = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 13px;
`;

const TierSummary = styled.section`
  background: #dbc399ff;
  padding: 10px 10px 23px 10px;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SummaryTop = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`;

const SummaryIcon = styled.img`
  width: 113px;
  height: 113px;
  object-fit: contain;
  flex-shrink: 0;
`;

const SummaryText = styled.p`
  flex: 1;
  margin: 0;
  line-height: 1.25;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  b {
    font-family: ${theme.font.bold.fontFamily};
    font-weight: ${theme.font.bold.fontWeight};
    color: #87943e;
  }
`;

const Highlight = styled.span`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`;

const ScoreArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
`;

const ScoreBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

const ScoreLabel = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: #878181;
  font-size: 16px;
`;

const ScoreValue = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 46px;
`;

const CharacterImg = styled.img`
  width: 133px;
  height: 133px;
  object-fit: contain;
`;
