import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import Rank1 from '@/assets/RankImg/first.png';
import Rank2 from '@/assets/RankImg/second.png';
import Rank3 from '@/assets/RankImg/third.png';

export const ChracterBox = ({
  $rank,
  name,
  score,
}: {
  $rank: number;
  name: string;
  score: number;
}) => {
  // If using src imports, uncomment above imports and use this map:
  // const rankIconMap: Record<number, string> = { 1: Rank1, 2: Rank2, 3: Rank3 };
  // If using public/Ranking, use absolute public paths instead:
  const rankIconMap: Record<number, string> = {
    1: Rank1,
    2: Rank2,
    3: Rank3,
  };
  return (
    <Container $rank={$rank}>
      <RankIcon $rank={$rank} src={rankIconMap[$rank]} alt={`${$rank} rank`} />
      <ImageContainer $rank={$rank} />
      <InfoContainer $rank={$rank}>
        <Name $rank={$rank}>{name}</Name>
        <Score $rank={$rank}>{score}</Score>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div<{ $rank: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${({ $rank }) => ($rank === 1 ? '0px' : '72px')};
  position: relative;
`;
const ImageContainer = styled.div<{ $rank: number }>`
  width: ${({ $rank }) => ($rank === 1 ? '128px' : '108px')};
  height: ${({ $rank }) => ($rank === 1 ? '120px' : '100px')};
  background-color: ${({ $rank }) =>
    $rank === 1 ? '#AABCEC' : $rank === 2 ? '#B4B6BC' : '#FEBAC7'};
  border-radius: 10px 10px 0 0;
`;
const InfoContainer = styled.div<{ $rank: number }>`
  width: ${({ $rank }) => ($rank === 1 ? '128px' : '108px')};
  height: ${({ $rank }) => ($rank === 1 ? '65px' : '50px')};
  background-color: ${({ $rank }) =>
    $rank === 1 ? '#D8E1F6' : $rank === 2 ? '#DEDFE1' : '#FFE0E6'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
`;
const Name = styled.div<{ $rank: number }>`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: ${({ $rank }) => ($rank === 1 ? '24px' : '18px')};
`;
const Score = styled.div<{ $rank: number }>`
  color: #ee756f;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: ${({ $rank }) => ($rank === 1 ? '20px' : '16px')};
`;
const RankIcon = styled.img<{ $rank: number }>`
  width: ${({ $rank }) => ($rank === 1 ? '56px' : '44.77px')};
  height: ${({ $rank }) => ($rank === 1 ? '94px' : '75px')};
  position: absolute;
  z-index: 1;
  top: ${({ $rank }) => ($rank === 1 ? '-44px' : '-36px')};
  left: ${({ $rank }) => ($rank === 1 ? '36px' : '32px')};
  right: 0;
  bottom: 0;
`;
