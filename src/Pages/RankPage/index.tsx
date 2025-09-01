import { Container } from '@/Shared/components/Container';
import NavigationBar from '@/Shared/components/NavigationBar';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import CalenderIcon from '@/MockData/calendar.png';
import { RankButton } from './RankButton';
import { useState } from 'react';

export const RankPage = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Container>
      <Header>
        <Title>랭크</Title>
      </Header>
      <NavigationBar />
      <StatusAndCalendarWrapper>
        <StatusLabel>
          <span role="img" aria-label="growth chart">
            📈
          </span>{' '}
          성장주 투자자
        </StatusLabel>
        <CalendarButton>
          <CalendarIcon src={CalenderIcon} alt="캘린더" />
        </CalendarButton>
      </StatusAndCalendarWrapper>
      <RankPageContainer>
        <RankButtonWrapper>
          <RankButton
            $isActive={isActive}
            buttonText="점수 랭킹"
            onClick={() => setIsActive(true)}
          />
          <RankButton
            $isActive={!isActive}
            buttonText="성실 랭킹"
            onClick={() => setIsActive(false)}
          />
        </RankButtonWrapper>
      </RankPageContainer>
    </Container>
  );
};
const Header = styled.header`
  padding: ${theme.spacing(5)};
  text-align: center;
  background-color: ${theme.colors.background};
  border-bottom-left-radius: ${theme.spacing(5)};
  border-bottom-right-radius: ${theme.spacing(5)};
`;
const Title = styled.h1`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
`;
const StatusAndCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing(5)};
  margin-top: ${theme.spacing(4)};
`;
const StatusLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
`;
const CalendarButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;
const CalendarIcon = styled.img`
  width: ${theme.spacing(12)};
  height: ${theme.spacing(12)};
`;
const RankPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.spacing(2)};
  margin: ${theme.spacing(2)} ${theme.spacing(3)};

  background-color: #ffffff;
  border-radius: ${theme.spacing(5)};
`;
const RankButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  /* Overlap the second button by ~10px horizontally */
  button + button {
    margin-left: -32px;
  }
`;
