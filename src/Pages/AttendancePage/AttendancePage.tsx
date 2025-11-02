import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useQueryApi } from '@/Apis/useQueryApi';
import CheckImage from '@/assets/AttendImg/check.png';

interface AttendanceStatusResponse {
  todayCount: number;
  consecutiveAttendance: number;
}
export const AttendancePage: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: attendanceData,
    isLoading,
    isError,
  } = useQueryApi<AttendanceStatusResponse>(['attendanceStatus'], '/attendance/status');

  // 예외 처리
  if (isLoading) {
    return <PageContainer>데이터를 불러오는 중입니다...</PageContainer>;
  }

  if (isError || !attendanceData) {
    return <PageContainer>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</PageContainer>;
  }

  const solvedCount = attendanceData.todayCount;
  const consecutiveDays = attendanceData.consecutiveAttendance;
  const totalProblems = 5;
  const clampedSolvedCount = Math.min(solvedCount, totalProblems);
  const remainingProblems = totalProblems - clampedSolvedCount;

  const goToHome = () => {
    navigate('/home');
  };

  const renderStatusMessage = () => {
    if (clampedSolvedCount === totalProblems) {
      return '출석 완료!';
    }
    return `퀴즈 ${remainingProblems}문제를 풀고 출석을 완료해주세요!`;
  };

  return (
    <PageContainer>
      <Header>출석 체크</Header>

      <InfoBox>
        <InfoLabel>누적 출석 횟수</InfoLabel>
        <StreakValue>{consecutiveDays}일</StreakValue>
      </InfoBox>

      <InfoBox>
        <InfoLabel>오늘 푼 문제 수</InfoLabel>
        <ProgressContainer>
          {Array.from({ length: totalProblems }).map((_, index) =>
            index < clampedSolvedCount ? (
              <CheckedBox key={index}>
                <CheckIcon />
              </CheckedBox>
            ) : (
              <EmptyBox key={index} />
            ),
          )}
        </ProgressContainer>
      </InfoBox>

      <StatusMessage>{renderStatusMessage()}</StatusMessage>

      <HomeButton onClick={goToHome}>홈으로</HomeButton>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: ${theme.colors.background};
  font-family: ${theme.font.bold.fontFamily};
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

const Header = styled.h1`
  font-size: 24px;
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  margin: 0;
  margin-bottom: 30px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
`;

const StreakValue = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  background-color: ${theme.colors.inactive};
  padding: 8px 16px;
  border-radius: 20px;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
`;

// 박스에 대한 css
const BaseBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 빈 박스
const EmptyBox = styled(BaseBox)`
  background-color: ${theme.colors.line};
`;

// 체크된 박스
const CheckedBox = styled(BaseBox)`
  background-color: ${theme.colors.secondary};
  & svg path {
    stroke: ${theme.colors.background};
  }
`;

const StyledCheckIcon = styled.img`
  width: 48px;
  height: 48px;
`;
const CheckIcon = () => <StyledCheckIcon src={CheckImage} alt="출석 체크" />;

const StatusMessage = styled.p`
  font-size: 16px;
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const HomeButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 14px;
  font-size: 16px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${theme.colors.background};
  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;
