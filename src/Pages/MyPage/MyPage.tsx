import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import CharacterMain from '@/MockData/character.png'; 
import CalenderIcon from '@/MockData/calendar.png';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/Shared/components/backButton';

const Header = styled.header`
  padding: ${theme.spacing(5)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${theme.colors.background};
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
`;

const StyledHeaderBackButton = styled(BackButton)`
  position: absolute;
  left: ${theme.spacing(5)};
`;

const StatusAndCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(4)} ${theme.spacing(5)};
`;

const CharacterAndNicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${theme.spacing(5)};
`;

const Character = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;
`;

const NicknameBox = styled.div`
  border: 2px solid ${theme.colors.secondary};
  background-color: ${theme.colors.background};
  padding: ${theme.spacing(2)} ${theme.spacing(5)};
  border-radius: 999px;
  margin-top: ${theme.spacing(4)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
`;

const Nickname = styled.p`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 18px;
  margin: 0;
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

const ResultWrapper = styled.div`
  width: 90%;
  margin: ${theme.spacing(5)} auto;
  background-color: #ffffff;
  border-radius: ${theme.spacing(8)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: ${theme.spacing(5)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ResultTitle = styled.h2`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 20px;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing(2)};
`;

const ResultDescription = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 14px;
  color: ${theme.colors.text};
  line-height: 1.5;
  margin: 0;
`;

const ShareButton = styled.button`
  width: 90%;
  margin: ${theme.spacing(4)} auto;
  padding: ${theme.spacing(4)};
  background-color: ${theme.colors.secondary};
  color: #fff;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  border: none;
  border-radius: ${theme.spacing(5)};
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MyPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleShareClick = () => {
    navigate('/sharing');
  };

  return (
    <Container>
      <Header>
        <StyledHeaderBackButton onClick={handleBackClick} />
        <Title>마이 페이지</Title>
      </Header>
      <NavigationBar />
      <StatusAndCalendarWrapper>
        <StatusLabel>
          <span role="img" aria-label="growth chart">📈</span> 성장주 투자자
        </StatusLabel>
        <CalendarButton>
          <CalendarIcon src={CalenderIcon} alt="캘린더" />
        </CalendarButton>
      </StatusAndCalendarWrapper>
      <CharacterAndNicknameWrapper>
        <Character src={CharacterMain} alt="캐릭터" />
        <NicknameBox>
          <Nickname>카테캠 기요미</Nickname>
        </NicknameBox>
      </CharacterAndNicknameWrapper>
      <ResultWrapper>
        <ResultTitle>위험 중립형</ResultTitle>
        <ResultDescription>
          “투자에 그는 그에 상응하는 투자위험이 있음을 충분히 인식하고 있으며,
          예·적금보다 높은 수익을 기대할 수 있다면 일정수준의 손실위험을 감수할 수 있다.”
        </ResultDescription>
      </ResultWrapper>
      <ShareButton onClick={handleShareClick}>
        공유하기
      </ShareButton>
    </Container>
  );
};

export default MyPage;