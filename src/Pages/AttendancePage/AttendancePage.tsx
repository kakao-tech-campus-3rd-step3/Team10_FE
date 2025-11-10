import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useQueryApi } from '@/Apis/useQueryApi';
import CheckImage from '@/assets/AttendImg/check.webp';
import { Container } from '@/Shared/components/Container';

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
  } = useQueryApi<AttendanceStatusResponse>(['attendanceStatus'], '/attendance/status', {
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <PageContainer role="status" aria-live="polite" aria-label="로딩 중">
        데이터를 불러오는 중입니다...
      </PageContainer>
    );
  }

  if (isError || !attendanceData) {
    return (
      <PageContainer role="alert" aria-live="assertive" aria-label="오류 메시지">
        오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </PageContainer>
    );
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
    <Container $scrollable $hasTopNav={false}>
      <PageContainer role="main" aria-label="출석 체크 페이지">
        <Header>출석 체크</Header>

        <InfoBox role="group" aria-label="누적 출석 정보">
          <InfoLabel>누적 출석 횟수</InfoLabel>
          <StreakValue aria-label={`누적 출석 ${consecutiveDays}일`}>
            {consecutiveDays}일
          </StreakValue>
        </InfoBox>

        <InfoBox role="group" aria-label="오늘 푼 문제 수">
          <InfoLabel>오늘 푼 문제 수</InfoLabel>
          <ProgressContainer
            role="list"
            aria-label={`오늘 푼 문제 ${clampedSolvedCount}개 중 ${totalProblems}개`}
          >
            {Array.from({ length: totalProblems }).map((_, index) =>
              index < clampedSolvedCount ? (
                <CheckedBox key={index} role="listitem" aria-label={`문제 ${index + 1} 완료`}>
                  <CheckIcon />
                </CheckedBox>
              ) : (
                <EmptyBox key={index} role="listitem" aria-label={`문제 ${index + 1} 미완료`} />
              ),
            )}
          </ProgressContainer>
        </InfoBox>

        <StatusMessage role="status" aria-live="polite">
          {renderStatusMessage()}
        </StatusMessage>

        <HomeButton onClick={goToHome} aria-label="홈으로 이동">
          홈으로
        </HomeButton>
      </PageContainer>
    </Container>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 40px 20px;
  margin: 50px auto;
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

const BaseBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyBox = styled(BaseBox)`
  background-color: ${theme.colors.line};
`;

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
