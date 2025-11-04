import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

import type { RankingUser } from './types';

type RankNeighborData = {
  above1: RankingUser | null;
  above2: RankingUser | null;
  myRank: number;
  myName: string;
  myScore: number;
  below1: RankingUser | null;
  below2: RankingUser | null;
};

export const MyRank = ({ data, isScoreRank }: { data: RankNeighborData; isScoreRank: boolean }) => {
  const hasAboveUsers = data.above1 || data.above2;
  const hasBelowUsers = data.below1 || data.below2;

  return (
    <Container>
      {hasAboveUsers ? (
        <>
          <Circle />
          <Circle />
          <Circle />
        </>
      ) : (
        <Spacer />
      )}
      {data.above2 && (
        <OtherRankBox>
          <OtherInfoScript>{data.above2.rank}등</OtherInfoScript>
          <OtherInfoScript>{data.above2.nickname}</OtherInfoScript>
          <OtherInfoScript>
            {data.above2.point}
            {isScoreRank ? '점' : '일'}
          </OtherInfoScript>
        </OtherRankBox>
      )}
      {data.above1 && (
        <OtherRankBox>
          <OtherInfoScript>{data.above1.rank}등</OtherInfoScript>
          <OtherInfoScript>{data.above1.nickname}</OtherInfoScript>
          <OtherInfoScript>
            {data.above1.point}
            {isScoreRank ? '점' : '일'}
          </OtherInfoScript>
        </OtherRankBox>
      )}
      <MyRankBox>
        <MyInfoScript>{data.myRank}등</MyInfoScript>
        <MyInfoScript>{data.myName}</MyInfoScript>
        <MyInfoScript>
          {data.myScore}
          {isScoreRank ? '점' : '일'}
        </MyInfoScript>
      </MyRankBox>
      {data.below1 && (
        <OtherRankBox>
          <OtherInfoScript>{data.below1.rank}등</OtherInfoScript>
          <OtherInfoScript>{data.below1.nickname}</OtherInfoScript>
          <OtherInfoScript>
            {data.below1.point}
            {isScoreRank ? '점' : '일'}
          </OtherInfoScript>
        </OtherRankBox>
      )}
      {data.below2 && (
        <OtherRankBox>
          <OtherInfoScript>{data.below2.rank}등</OtherInfoScript>
          <OtherInfoScript>{data.below2.nickname}</OtherInfoScript>
          <OtherInfoScript>
            {data.below2.point}
            {isScoreRank ? '점' : '일'}
          </OtherInfoScript>
        </OtherRankBox>
      )}
      {hasBelowUsers ? (
        <>
          <Circle />
          <Circle />
          <Circle />
        </>
      ) : (
        <Spacer />
      )}
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

const Spacer = styled.div`
  height: 44px;
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
  font-size: clamp(12px, 5vw, 24px);
  color: #c8c8c8;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  padding: 0 ${theme.spacing(1)};
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
  font-size: clamp(14px, 5vw, 28px);
  color: #ffffff;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  padding: 0 ${theme.spacing(1)};
`;
