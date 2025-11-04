import styled from '@emotion/styled';
import NameInput from './NameInput';
import ConfirmButton from './ConfirmButton';
import CharacterImage from '@/assets/HomeImg/character.webp';
import { useState } from 'react';
import { Container } from '@/Shared/components/Container';
import { getKakaoLoginUrl } from '@/Apis/kakao/utils';
import { usePostApi } from '@/Apis/useMutationApi';

interface RegisterRequest {
  code: string;
  nickname: string;
}

interface RegisterResponse {
  accessToken: string;
}

export const CharacterCreatePage = () => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const { isPending } = usePostApi<RegisterResponse, RegisterRequest>('/user/register');

  const handleConfirm = async () => {
    try {
      sessionStorage.setItem('temp_nickname', name);
      console.log('닉네임 저장:', name);

      const loginUrl = getKakaoLoginUrl();
      window.location.href = loginUrl;
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsNameValid(isValid);
  };

  const isButtonDisabled = !isNameValid || isPending;

  return (
    <CenteredContainer>
      <Title>콩식이 생성하기</Title>
      <CharacterImg src={CharacterImage} alt="콩식이" />
      <NameInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 지어주세요."
        onValidationChange={handleValidationChange}
      />
      <ConfirmButtonContainer>
        <ConfirmButton
          text={isPending ? '처리 중...' : '완료'}
          onClick={handleConfirm}
          disabled={isButtonDisabled}
        />
      </ConfirmButtonContainer>
    </CenteredContainer>
  );
};

export default CharacterCreatePage;

const CenteredContainer = styled(Container)`
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CharacterImg = styled.img`
  width: 255px;
  height: 255px;
  object-fit: contain;
  margin: 26px 0 28px 0;
`;

const ConfirmButtonContainer = styled.div`
  margin-top: 24px;
`;
