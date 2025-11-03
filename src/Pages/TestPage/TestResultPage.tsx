import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import ConfirmButton from './ConfirmButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { DESCRIPTIONS, RESULT_IMAGES } from './constants';

interface TestResultPageProps {
  typeText?: string;
  description?: string;
}

export const TestResultPage = ({
  typeText = '안정형',
  description = '“예금이나 적금 수준의 수익률을 기대하며, 투자원금에 손실이 발생하는 것을 원하지 않는다. 원금손실의 우려가 없는 상품에 투자하는 것이 바람직하다.”',
}: TestResultPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state || {}) as {
    propensityKoreanName?: string;
    totalScore?: number;
  };

  const resolvedTypeText = state.propensityKoreanName || typeText;
  const resolvedDescription = DESCRIPTIONS[resolvedTypeText] ?? description;
  const resultImage = RESULT_IMAGES[resolvedTypeText] || RESULT_IMAGES['안정형'];

  const handleGoHome = () => {
    navigate('/home');
  };
  return (
    <Container $scrollable={true}>
      <Header title="" hasPrevPage={true} />
      <ResultCard>
        <CardHead>
          <Title>투자성향 진단 테스트</Title>
        </CardHead>
        <Divider />
        <Image src={resultImage} alt={`${resolvedTypeText} 투자자 타입 이미지`} />
        <Type>{resolvedTypeText}</Type>
        <Desc>{resolvedDescription}</Desc>
      </ResultCard>
      <ButtonContainer onClick={handleGoHome}>
        <ConfirmButton text="저장하기" />
      </ButtonContainer>
    </Container>
  );
};
export default TestResultPage;

const ResultCard = styled.section`
  width: 90%; /* 가로 폭을 90%로 줄임 */
  margin: 0 auto; /* 가운데 정렬 */
  background-color: ${theme.colors.inactive};
  border-radius: ${theme.spacing(2)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  align-items: center;
`;

const CardHead = styled.div`
  width: 100%;
  padding: ${theme.spacing(2)};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  background-color: ${({ theme }) => theme.colors.inactive};
  padding: ${theme.spacing(2)} 0;
  margin-top: 15px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  border-top: 1px solid ${theme.colors.line};
  margin: 0;
`;

const Image = styled.img`
  width: clamp(230px, 60vw, 400px);
  height: auto;
  object-fit: contain;
  margin: 0;
  border-radius: ${theme.spacing(2)};
`;

const Type = styled.h2`
  margin: 15px 0;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 31px;
  color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.p`
  margin: 0 40px 50px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  line-height: 1.25;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
`;
