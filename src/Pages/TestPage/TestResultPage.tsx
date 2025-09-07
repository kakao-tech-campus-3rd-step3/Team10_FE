import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import ConfirmButton from './confirmButton';
import TestResultImage from './assets/kongsik_sleep.png';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/Shared/components/Container';

interface TestResultPageProps {
  typeText?: string;
  description?: string;
}

export const TestResultPage = ({
  typeText = '안정형',
  description = '“예금이나 적금 수준의 수익률을 기대하며, 투자원금에 손실이 발생하는 것을 원하지 않는다. 원금손실의 우려가 없는 상품에 투자하는 것이 바람직하다.”',
}: TestResultPageProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };
  return (
    <CenteredContainer>
      <ResultCard>
        <Title>테스트 결과</Title>
        <Image src={TestResultImage} alt="테스트 결과 이미지" />
        <Type>{typeText}</Type>
        <Desc>{description}</Desc>
      </ResultCard>
      <ButtonContainer onClick={handleGoHome}>
        <ConfirmButton text="홈으로" />
      </ButtonContainer>
    </CenteredContainer>
  );
};
export default TestResultPage;

const CenteredContainer = styled(Container)`
  align-items: center;
  justify-content: center;
  background-color: #dbc399ff;
`;

const Title = styled.h1`
  margin: 0 0 5px 0;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 40px;
  color: ${({ theme }) => theme.colors.text};
`;

const ResultCard = styled.section`
  background-color: #fff;
  border-radius: 32px;
  padding: 47px 20px;
  margin: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 260px;
  height: 300px;
  object-fit: contain;
  margin: 0;
`;

const Type = styled.h2`
  margin: 0 0 35px 0;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 31px;
  color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.p`
  margin: 0;
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
  margin: 0;
`;
