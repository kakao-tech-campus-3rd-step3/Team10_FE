import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import CharacterMain from '@/assets/HomeImg/character.png';
import QuizIcon from '@/assets/HomeImg/quiz.png';
import NewsIcon from '@/assets/HomeImg/news.png';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/Shared/components/Header';
import { StatusActionBar } from '@/Shared/components/StatusActionBar';
export const HomePage = () => {
  const isTested = true;
  const navigate = useNavigate();
  const handleInvestmentTest = () => {
    navigate('/quizList');
  };
  const goToTestPage = () => {
    navigate('/test');
  };
  return (
    <Container>
      <Header title="홈 화면" hasPrevPage={false} />
      <NavigationBar />
      <StatusActionBar />
      <CharacterSectionWrapper>
        <Character src={CharacterMain} alt="캐릭터" />
      </CharacterSectionWrapper>
      <BottomSectionWrapper>
        <NicknameBox>
          <Nickname>닉네임</Nickname>
        </NicknameBox>
        <InvestmentTypeBox>
          {isTested ? (
            <>
              <InvestmentText>테스트 유형</InvestmentText>
              <RetestButton type="button" onClick={goToTestPage}>
                다시 테스트 하기
              </RetestButton>
            </>
          ) : (
            <TestButton type="button" onClick={goToTestPage}>
              나의 투자 성향을 테스트 해보세요
            </TestButton>
          )}
        </InvestmentTypeBox>
        <TwoButtonsWrapper>
          <QuizButton onClick={handleInvestmentTest}>
            <IconImg src={QuizIcon} alt="퀴즈 아이콘" />
            <ButtonText>퀴즈 풀기</ButtonText>
          </QuizButton>
          <FinanceButton>
            <IconImg src={NewsIcon} alt="뉴스 아이콘" />
            <ButtonText>금융 콘텐츠</ButtonText>
          </FinanceButton>
        </TwoButtonsWrapper>
      </BottomSectionWrapper>
    </Container>
  );
};

export default HomePage;

const CharacterSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing(3)};
`;

const Character = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;
`;

const BottomSectionWrapper = styled.div`
  width: 90%; /* 가로 폭을 90%로 줄임 */
  margin: 0 auto; /* 가운데 정렬 */
  background-color: #fafafa;
  border-radius: ${theme.spacing(2)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing(5)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  margin-top: ${theme.spacing(5)};
`;

const NicknameBox = styled.div`
  background-color: transparent;
  margin-top: ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nickname = styled.p`
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 28px;
  margin: 0;
`;

const InvestmentTypeBox = styled.div`
  width: 100%;
  padding: ${theme.spacing(2)};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(2)};
`;

const InvestmentText = styled.p`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 19px;
  color: ${theme.colors.text};
  margin: 0;
  flex-grow: 1;
  text-align: center;
`;

const RetestButton = styled.button`
  background: transparent;
  border: none;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.85;
  cursor: pointer;
`;

const TestButton = styled.button`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 17px;
  color: ${theme.colors.text};
  margin: 0;
  flex-grow: 1;
  text-align: center;

  background: transparent;
  border: none;
  cursor: pointer;
`;

const TwoButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing(4)};
`;

const QuizButton = styled.button`
  background-color: ${theme.colors.background};
  border: none;
  border-radius: ${theme.spacing(2)};
  padding: ${theme.spacing(6)};
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(1)};
`;

const IconImg = styled.img`
  width: 100px;
`;

const FinanceButton = styled(QuizButton)``;

const ButtonText = styled.span`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  color: ${theme.colors.text};
`;
