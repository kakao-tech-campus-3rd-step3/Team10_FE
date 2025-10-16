import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Header } from '@/Shared/components/Header';
import CharacterMain from '@/assets/HomeImg/character.png';
import { Container } from '@/Shared/components/Container';
import { useQueryApi } from '@/Apis/useQueryApi';

interface SharingResponse {
  characterUri: string;
  nickname: string;
  tierName: string;
  ratingPoint: number;
  testResult: string;
  testResultDescription: string;
}

export const SharingPage = () => {
  const handleSaveClick = () => {
    alert('결과 이미지 저장하기 버튼 클릭!');
  };

  const { data: myPageData } = useQueryApi<SharingResponse>(['usernickname'], '/page/mypage');
  console.log(myPageData);
  return (
    <Container>
      <Header title="공유하기" hasPrevPage={true} />
      <Spacing />
      <CharacterAndNicknameWrapper>
        <Character src={CharacterMain} alt="캐릭터" />
        <NicknameBox>
          <Nickname>{myPageData?.nickname}</Nickname>
        </NicknameBox>
      </CharacterAndNicknameWrapper>
      <ResultWrapper>
        <ResultTitle>위험 중립형</ResultTitle>
        <ResultDescription>
          “투자에 그는 그에 상응하는 투자위험이 있음을 충분히 인식하고 있으며, 예·적금보다 높은
          수익을 기대할 수 있다면 일정수준의 손실위험을 감수할 수 있다.”
        </ResultDescription>
      </ResultWrapper>
      <SaveButton onClick={handleSaveClick}>저장하기</SaveButton>
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

const SaveButton = styled.button`
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
