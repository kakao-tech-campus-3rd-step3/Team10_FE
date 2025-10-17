import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

type RankNeighborData = {
  prevRank: number;
  prevName: string;
  prevScore: number;
  myRank: number;
  myName: string;
  myScore: number;
  nextRank: number;
  nextName: string;
  nextScore: number;
};

export const MyRank = ({ data, isScoreRank }: { data: RankNeighborData; isScoreRank: boolean }) => {
  return (
    <Container>
      <Circle />
      <Circle />
      <Circle />
      <OtherRankBox>
        <OtherInfoScript>{data.prevRank}등</OtherInfoScript>
        <OtherInfoScript>{data.prevName}</OtherInfoScript>
        <OtherInfoScript>
          {data.prevScore}
          {isScoreRank ? '점' : '일'}
        </OtherInfoScript>
      </OtherRankBox>
      <MyRankBox>
        <MyInfoScript>{data.myRank}등</MyInfoScript>
        <MyInfoScript>{data.myName}</MyInfoScript>
        <MyInfoScript>
          {data.myScore}
          {isScoreRank ? '점' : '일'}
        </MyInfoScript>
      </MyRankBox>
      <OtherRankBox>
        <OtherInfoScript>{data.nextRank}등</OtherInfoScript>
        <OtherInfoScript>{data.nextName}</OtherInfoScript>
        <OtherInfoScript>
          {data.nextScore}
          {isScoreRank ? '점' : '일'}
        </OtherInfoScript>
      </OtherRankBox>
      <Circle />
      <Circle />
      <Circle />
    </Container>
  );
};

export default MyRank;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
const Circle = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;
const OtherRankBox = styled.div`
  width: 80%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 ${theme.spacing(8)};
  background-color: #d9d9d9;
  border-radius: 10px;
`;
const OtherInfoScript = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  color: #c8c8c8;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 720px) {
    font-size: clamp(16px, 5vw, 24px);
  }
`;

const MyRankBox = styled.div`
  width: 90%;
  height: 54px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 ${theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
`;
const MyInfoScript = styled.div`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 28px;
  color: #ffffff;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 720px) {
    font-size: clamp(18px, 5vw, 28px);
  }
`;
