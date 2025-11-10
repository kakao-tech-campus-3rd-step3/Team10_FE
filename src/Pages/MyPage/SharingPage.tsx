import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Header } from '@/Shared/components/Header';
import CharacterMain from '@/assets/HomeImg/character.webp';
import { Container } from '@/Shared/components/Container';
import { useQueryApi } from '@/Apis/useQueryApi';
import { toAbsoluteUrl } from '@/utils/urlUtils';
import { useRef, type RefObject } from 'react';
import { useCaptureImage } from './useCaptureImage';
import { DESCRIPTIONS } from '../TestPage/constants';
import type { MyPageResponse, TestResult } from './types';

export const SharingPage = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const { captureImage, copyToClipboard } = useCaptureImage(
    captureRef as RefObject<HTMLElement>,
    '마이페이지.png',
  );
  const handleSaveClick = () => {
    captureImage();
  };

  const handleCopyClick = () => {
    copyToClipboard();
  };

  const {
    data: myPageData,
    error: myPageError,
    isLoading: myPageIsLoading,
  } = useQueryApi<MyPageResponse>(['page', 'mypage'], '/page/mypage');
  const {
    data: testResultData,
    error: testResultError,
    isLoading: testResultIsLoading,
  } = useQueryApi<TestResult>(['users', 'me', 'propensity'], '/users/me/propensity');

  if (myPageIsLoading || testResultIsLoading) {
    return (
      <Container $scrollable $hasTopNav={false} $hasHeader={true}>
        <Header title="공유하기" hasPrevPage={true} backButtonTo={-1} />
        <Spacing />
        <LoadingMessage role="status" aria-live="polite" aria-label="로딩 중">
          데이터를 불러오는 중...
        </LoadingMessage>
      </Container>
    );
  }

  if (myPageError || testResultError || !myPageData || !testResultData) {
    return (
      <Container $scrollable $hasTopNav={false} $hasHeader={true}>
        <Header title="공유하기" hasPrevPage={true} backButtonTo={-1} />
        <Spacing />
        <ErrorMessage role="alert" aria-live="assertive" aria-label="오류 메시지">
          데이터를 불러오는데 실패했습니다.
        </ErrorMessage>
      </Container>
    );
  }

  const resultDescription = testResultData?.propensityKoreanName
    ? DESCRIPTIONS[testResultData.propensityKoreanName]
    : undefined;
  const characterSrc = toAbsoluteUrl(myPageData?.characterUri) || CharacterMain;

  return (
    <Container $scrollable $hasTopNav={false}>
      <Header title="공유하기" hasPrevPage={true} backButtonTo={-1} />
      <Spacing />
      <CaptureSession ref={captureRef} role="region" aria-label="공유할 콘텐츠">
        <CharacterAndNicknameWrapper role="group" aria-label="사용자 정보">
          <Space />
          <Character
            key={characterSrc}
            src={characterSrc}
            alt="사용자 캐릭터"
            onError={(e) => {
              e.currentTarget.src = CharacterMain;
            }}
          />
          <NicknameBox role="group" aria-label="닉네임">
            <Nickname aria-label={`닉네임: ${myPageData?.nickname}`}>
              {myPageData?.nickname}
            </Nickname>
          </NicknameBox>
        </CharacterAndNicknameWrapper>
        <ResultWrapper role="group" aria-label="투자 성향 결과">
          <ResultTitle>{testResultData?.propensityKoreanName}</ResultTitle>
          <ResultDescription>{resultDescription}</ResultDescription>
        </ResultWrapper>
      </CaptureSession>
      <ButtonWrapper role="group" aria-label="공유 액션 버튼">
        <SaveButton onClick={handleSaveClick} aria-label="이미지 저장하기">
          저장하기
        </SaveButton>
        <CopyButton onClick={handleCopyClick} aria-label="이미지 클립보드에 복사하기">
          복사하기
        </CopyButton>
      </ButtonWrapper>
    </Container>
  );
};

export default SharingPage;

const Spacing = styled.div`
  height: ${theme.spacing(20)};
`;
const CharacterAndNicknameWrapper = styled.div`
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
  background-color: #f7f7f7;
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

const CaptureSession = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: ${theme.spacing(8)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: ${theme.spacing(5)};
`;
const Space = styled.div`
  height: ${theme.spacing(10)};
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #dc3545;
`;
