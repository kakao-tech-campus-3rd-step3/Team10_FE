import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { DESCRIPTIONS, RESULT_IMAGES } from './constants';
import { useRef, type RefObject } from 'react';
import { useCaptureImage } from '../MyPage/useCaptureImage';

interface TestResultPageProps {
  typeText?: string;
  description?: string;
}

export const TestResultPage = ({
  typeText = '안정형',
  description = '"예금이나 적금 수준의 수익률을 기대하며, 투자원금에 손실이 발생하는 것을 원하지 않는다. 원금손실의 우려가 없는 상품에 투자하는 것이 바람직하다."',
}: TestResultPageProps) => {
  const location = useLocation();
  const captureRef = useRef<HTMLDivElement>(null);
  const { captureImage, copyToClipboard } = useCaptureImage(
    captureRef as RefObject<HTMLElement>,
    '투자성향_진단결과.png',
  );
  const navigate = useNavigate();
  const handleSaveClick = () => {
    captureImage();
  };

  const handleCopyClick = () => {
    copyToClipboard();
  };
  const handleHomeClick = () => {
    navigate('/home');
  };

  const state = (location.state || {}) as {
    propensityKoreanName?: string;
    totalScore?: number;
  };

  const resolvedTypeText = state.propensityKoreanName || typeText;
  const resolvedDescription = DESCRIPTIONS[resolvedTypeText] ?? description;
  const resultImage = RESULT_IMAGES[resolvedTypeText] || RESULT_IMAGES['안정형'];

  return (
    <Container $scrollable={true} $hasTopNav={false} $hasHeader={true}>
      <Header title="" hasPrevPage={true} />
      <ResultCard ref={captureRef}>
        <CardHead>
          <Title>투자성향 진단 테스트</Title>
        </CardHead>
        <Divider />
        <Image src={resultImage} alt={`${resolvedTypeText} 투자자 타입 이미지`} />
        <Type>{resolvedTypeText}</Type>
        <Desc>{resolvedDescription}</Desc>
      </ResultCard>
      <ButtonWrapper>
        <SaveButton onClick={handleSaveClick}>저장하기</SaveButton>
        <CopyButton onClick={handleCopyClick}>복사하기</CopyButton>
        <HomeButton onClick={handleHomeClick}>홈으로 가기</HomeButton>
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  width: 90%;
  margin: ${theme.spacing(4)} auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`;

const SaveButton = styled.button`
  width: 100%;
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

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CopyButton = styled.button`
  width: 100%;
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
  color: ${theme.colors.secondary};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${theme.spacing(5)};
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f7f7f7;
  }

  &:active {
    transform: scale(0.98);
  }
`;
const HomeButton = styled.button`
  width: 100%;
  padding: ${theme.spacing(4)};
  background-color: #6d9873;
  color: #fff;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  border: none;
  border-radius: ${theme.spacing(5)};
  cursor: pointer;
`;
