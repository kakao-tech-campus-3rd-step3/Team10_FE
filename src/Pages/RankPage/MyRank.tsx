import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

type RankNeighborData = {
  above1Rank: number;
  above1Name: string;
  above1Score: number;
  above2Rank: number;
  above2Name: string;
  above2Score: number;
  myRank: number;
  myName: string;
  myScore: number;
  below1Rank: number;
  below1Name: string;
  below1Score: number;
  below2Rank: number;
  below2Name: string;
  below2Score: number;
};

export const MyRank = ({ data, isScoreRank }: { data: RankNeighborData; isScoreRank: boolean }) => {
  return (
    <Container>
      <Circle />
      <Circle />
      <Circle />
      <OtherRankBox>
        <OtherInfoScript>{data.above1Rank}등</OtherInfoScript>
        <OtherInfoScript>{data.above1Name}</OtherInfoScript>
        <OtherInfoScript>
          {data.above1Score}
          {isScoreRank ? '점' : '일'}
        </OtherInfoScript>
      </OtherRankBox>
      <OtherRankBox>
        <OtherInfoScript>{data.above2Rank}등</OtherInfoScript>
        <OtherInfoScript>{data.above2Name}</OtherInfoScript>
        <OtherInfoScript>
          {data.above2Score}
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
        <OtherInfoScript>{data.below1Rank}등</OtherInfoScript>
        <OtherInfoScript>{data.below1Name}</OtherInfoScript>
        <OtherInfoScript>
          {data.below1Score}
          {isScoreRank ? '점' : '일'}
        </OtherInfoScript>
      </OtherRankBox>
      <OtherRankBox>
        <OtherInfoScript>{data.below2Rank}등</OtherInfoScript>
        <OtherInfoScript>{data.below2Name}</OtherInfoScript>
        <OtherInfoScript>
          {data.below2Score}
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
