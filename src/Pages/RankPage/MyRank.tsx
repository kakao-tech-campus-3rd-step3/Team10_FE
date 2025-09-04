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
        <OtherInfoScript $isName={false}>{data.prevRank}등</OtherInfoScript>
        <OtherInfoScript $isName={true}>{data.prevName}</OtherInfoScript>
        <OtherInfoScript $isName={false}>
          {data.prevScore}
          {isScoreRank ? '점' : '일'}
        </OtherInfoScript>
      </OtherRankBox>
      <MyRankBox>
        <MyInfoScript $isName={false}>{data.myRank}등</MyInfoScript>
        <MyInfoScript $isName={true}>{data.myName}</MyInfoScript>
        <MyInfoScript $isName={false}>
          {data.myScore}
          {isScoreRank ? '점' : '일'}
        </MyInfoScript>
      </MyRankBox>
      <OtherRankBox>
        <OtherInfoScript $isName={false}>{data.nextRank}등</OtherInfoScript>
        <OtherInfoScript $isName={true}>{data.nextName}</OtherInfoScript>
        <OtherInfoScript $isName={false}>
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
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const Circle = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;
const OtherRankBox = styled.div`
  width: 280px;
  height: 40px;
  margin: 0 ${theme.spacing(32)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing(8)};
  gap: 8px;
  background-color: #d9d9d9;
  border-radius: 10px;
`;
const OtherInfoScript = styled.div<{ $isName: boolean }>`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: ${({ $isName }) => ($isName ? '20px' : '14px')};
  color: #c8c8c8;
`;

const MyRankBox = styled.div`
  width: 332px;
  height: 54px;
  margin: 0 ${theme.spacing(4)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
`;
const MyInfoScript = styled.div<{ $isName: boolean }>`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: ${({ $isName }) => ($isName ? '32px' : '24px')};
  color: #ffffff;
`;
