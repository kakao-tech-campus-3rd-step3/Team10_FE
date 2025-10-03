import styled from '@emotion/styled';
import { Container as BaseContainer } from '@/Shared/components/Container';
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
      <Header title="티어 페이지" hasPrevPage={true} />
      <ContentWrapper>
        <TierCard>
          <TierList>
            {TIERS.map((t) => (
              <TierRow key={t.grade}>
                <IconImg src={t.icon} alt={`${t.label} 아이콘`} />
                <TierTexts>
                  <TierName>{t.label}</TierName>
                  <TierRange>{t.max ? `${t.min}점 ~ ${t.max}점` : `${t.min}점 이상`}</TierRange>
                </TierTexts>
              </TierRow>
            ))}
          </TierList>
          <TierSummary>
            <SummaryContent>
              <img src={currentTier.icon} alt="현재 티어 아이콘" width="100" />
              <SummaryText>
                <b>{nickname}</b> 님은
                <br />
                현재 <Highlight>{currentTier.label}</Highlight> 입니다
              </SummaryText>
            </SummaryContent>
            <ScoreArea>
              <ScoreBlock>
                <ScoreLabel>현재 점수</ScoreLabel>
                <ScoreValue>{score.toLocaleString()}</ScoreValue>
              </ScoreBlock>
              <CharacterImg src={CharacterMain} alt="캐릭터 이미지" />
            </ScoreArea>
          </TierSummary>
        </TierCard>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled(BaseContainer)`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
  overflow-y: auto;
`;

const TierCard = styled.section`
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(247, 243, 243, 0.1);
  margin-top: 20px;
`;

const TierList = styled.div`
  background: #f7f7f7c5;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TierRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const TierTexts = styled.div`
  text-align: left;
`;

const TierName = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #100b01ff;
`;

const TierRange = styled.div`
  font-size: 22px;
  color: #277911;
  font-weight: bold;
`;

const TierSummary = styled.section`
  background: #c6f290;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  font-size: 36px;
  font-weight: 500;
`;

const SummaryText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #333;

  b {
    font-weight: 700;
    color: #277911;
  }
`;

const Highlight = styled.span`
  color: #764c05;
  font-weight: 700;
`;

const ScoreArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
`;

const ScoreBlock = styled.div``;

const ScoreLabel = styled.div`
  font-size: 14px;
  color: #555;
`;

const ScoreValue = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 52px;
  color: #3f4a3c;
  line-height: 1;
  text-align: center;

  &::after {
    content: '점';
    font-size: 30px;
    font-weight: 500;
    margin-left: 4px;
  }
`;

const CharacterImg = styled.img`
  width: 140px;
  height: auto;
  object-fit: contain;
  align-self: center;
`;
