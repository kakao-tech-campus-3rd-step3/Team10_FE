import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import CharacterMain from '@/assets/HomeImg/character.png';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/Shared/components/Header';
import { StatusActionBar } from '@/Shared/components/StatusActionBar';
const HomePage = () => {
  const isTested = false;
  const navigate = useNavigate();
  const handleInvestmentTest = () => {
    navigate('/quizSolve');
  };
  const goToTestPage = () => {
    navigate('/test');
  };
  return (
    <Container>
      <Header title="홈 화면" hasPrevPage={false} />
      <NavigationBar />
      <StatusActionBar />
      <CharacterAndNicknameWrapper>
        <CharacterSectionWrapper>
          <Character src={CharacterMain} alt="캐릭터" />
        </CharacterSectionWrapper>
        <NicknameBox>
          <Nickname>카테캠 기요미</Nickname>
        </NicknameBox>
      </CharacterAndNicknameWrapper>
      <BottomSectionWrapper>
        <InvestmentTypeBox>
          <InvestmentText>
            {isTested ? '안정형' : '나의 투자 성향을 테스트 해보세요'}
          </InvestmentText>
          <NextPageButton onClick={goToTestPage}>
            <span role="img" aria-label="right arrow">
              ➡️
            </span>
          </NextPageButton>
        </InvestmentTypeBox>
        <TwoButtonsWrapper>
          <QuizButton onClick={handleInvestmentTest}>
            <span role="img" aria-label="quiz icon">
              ❓
            </span>
            <ButtonText>퀴즈 풀기</ButtonText>
          </QuizButton>
          <FinanceButton>
            <span role="img" aria-label="news icon">
              📰
            </span>
            <ButtonText>금융 콘텐츠</ButtonText>
          </FinanceButton>
        </TwoButtonsWrapper>
      </BottomSectionWrapper>
    </Container>
  );
};

export default HomePage;

const CharacterAndNicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing(5)};
`;

const CharacterSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const BottomSectionWrapper = styled.div`
  width: 90%; /* 가로 폭을 90%로 줄임 */
  margin: 0 auto; /* 가운데 정렬 */
  background-color: #ffffff;
  border-radius: ${theme.spacing(8)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: ${theme.spacing(5)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  margin-top: ${theme.spacing(5)};
`;

const InvestmentTypeBox = styled.div`
  width: 100%;
  padding: ${theme.spacing(5)};
  background-color: #f7f7f7;
  border-radius: ${theme.spacing(4)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InvestmentText = styled.p`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${theme.colors.text};
  margin: 0;
  flex-grow: 1;
  text-align: center;
`;

const NextPageButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 24px;
`;

const TwoButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing(4)};
`;

const QuizButton = styled.button`
  background-color: #f7f7f7;
  border: none;
  border-radius: ${theme.spacing(4)};
  padding: ${theme.spacing(8)};
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(2)};
`;

const FinanceButton = styled(QuizButton)``;

const ButtonText = styled.span`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 14px;
  color: ${theme.colors.text};
`;
