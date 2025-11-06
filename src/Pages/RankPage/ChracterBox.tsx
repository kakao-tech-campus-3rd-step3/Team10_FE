import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import Rank1 from '@/assets/RankImg/first.webp';
import Rank2 from '@/assets/RankImg/second.webp';
import Rank3 from '@/assets/RankImg/third.webp';

export const ChracterBox = ({
  $rank,
  name,
  score,
  kongSkinUrl,
}: {
  $rank: number;
  name: string;
  score: number;
  kongSkinUrl: string;
}) => {
  const rankIconMap: Record<number, string> = {
    1: Rank1,
    2: Rank2,
    3: Rank3,
  };

  // 닉네임이 4글자 이상이면 4글자만 표시하고 ... 추가
  const displayName = name.length > 4 ? `${name.slice(0, 4)}...` : name;

  return (
    <Container $rank={$rank}>
      <RankIcon $rank={$rank} src={rankIconMap[$rank]} alt={`${$rank} rank`} />
      <ImageWrapper $rank={$rank}>
        <ImageContainer $rank={$rank} src={kongSkinUrl} alt="kong skin" />
      </ImageWrapper>
      <InfoContainer $rank={$rank}>
        <Name $rank={$rank}>{displayName}</Name>
        <Score $rank={$rank}>{score}</Score>
      </InfoContainer>
    </Container>
  );
};

export default ChracterBox;

const Container = styled.div<{ $rank: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${({ $rank }) => ($rank === 1 ? '0px' : '80px')};
  position: relative;
  flex: 1;
  min-width: 0;
`;
const ImageWrapper = styled.div<{ $rank: number }>`
  width: ${({ $rank }) => ($rank === 1 ? '28vw' : '24vw')};
  max-width: ${({ $rank }) => ($rank === 1 ? '180px' : '160px')};
  min-width: ${({ $rank }) => ($rank === 1 ? '92px' : '80px')};
  height: ${({ $rank }) => ($rank === 1 ? '26vw' : '22vw')};
  max-height: ${({ $rank }) => ($rank === 1 ? '172px' : '152px')};
  min-height: ${({ $rank }) => ($rank === 1 ? '100px' : '90px')};
  background-color: ${({ $rank }) =>
    $rank === 1 ? '#AABCEC' : $rank === 2 ? '#B4B6BC' : '#FEBAC7'};
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.img<{ $rank: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transform: scale(1.5) translateY(16px);
`;
const InfoContainer = styled.div<{ $rank: number }>`
  width: ${({ $rank }) => ($rank === 1 ? '28vw' : '24vw')};
  max-width: ${({ $rank }) => ($rank === 1 ? '180px' : '160px')};
  min-width: ${({ $rank }) => ($rank === 1 ? '92px' : '80px')};
  height: ${({ $rank }) => ($rank === 1 ? '14vw' : '12vw')};
  max-height: ${({ $rank }) => ($rank === 1 ? '92px' : '68px')};
  min-height: ${({ $rank }) => ($rank === 1 ? '50px' : '45px')};
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
  font-size: ${({ $rank }) => ($rank === 1 ? '22px' : '18px')};
`;
const Score = styled.div<{ $rank: number }>`
  color: #ee756f;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: ${({ $rank }) => ($rank === 1 ? '18px' : '16px')};
`;
const RankIcon = styled.img<{ $rank: number }>`
  width: ${({ $rank }) => ($rank === 1 ? '12vw' : '10vw')};
  max-width: ${({ $rank }) => ($rank === 1 ? '60px' : '50px')};
  min-width: ${({ $rank }) => ($rank === 1 ? '44px' : '36px')};
  height: ${({ $rank }) => ($rank === 1 ? '20vw' : '16vw')};
  max-height: ${({ $rank }) => ($rank === 1 ? '100px' : '80px')};
  min-height: ${({ $rank }) => ($rank === 1 ? '75px' : '60px')};
  position: absolute;
  z-index: 1;
  top: ${({ $rank }) => ($rank === 1 ? '-35px' : '-30px')};
  left: 50%;
  transform: translateX(-50%);
`;
