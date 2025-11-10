import styled from '@emotion/styled';
import NameInput from './NameInput';
import ConfirmButton from './ConfirmButton';
import CharacterImage from '@/assets/HomeImg/character.webp';
import { useState, useEffect } from 'react';
import { Container } from '@/Shared/components/Container';
import { getKakaoLoginUrl } from '@/Apis/kakao/utils';
import { usePostApi } from '@/Apis/useMutationApi';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { HomeResponse } from '@/Pages/HomePage/types';
import type { AxiosError } from 'axios';

interface RegisterRequest {
  code: string;
  nickname: string;
}

interface RegisterResponse {
  accessToken: string;
}

interface NicknameUpdateRequest {
  nickname: string;
}

interface NicknameUpdateResponse {}

type PageMode = 'create' | 'edit';

interface CharacterCreatePageProps {
  mode?: PageMode;
  initialNickname?: string;
}

export const CharacterCreatePage = ({
  mode = 'create',
  initialNickname = '',
}: CharacterCreatePageProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: homeData } = useQueryApi<HomeResponse>(['page', 'home'], '/page/home', {
    enabled: mode === 'edit',
  });

  const [name, setName] = useState(initialNickname);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && homeData?.nickname) {
      setName(homeData.nickname);
    } else if (mode === 'create') {
      const savedNickname = sessionStorage.getItem('temp_nickname');
      if (savedNickname) {
        setName(savedNickname);
      }
    }
  }, [mode, homeData]);

  const { mutate: updateNickname, isPending: isUpdatingNickname } = usePostApi<
    NicknameUpdateResponse,
    NicknameUpdateRequest
  >('/users/me/nickname', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', 'home'] });
      queryClient.invalidateQueries({ queryKey: ['page', 'mypage'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'ranking'] });
      navigate('/home');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        alert('이미 사용중인 닉네임 입니다. 다른 닉네임으로 시도해주세요.');
      } else {
        alert('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const { isPending: isRegistering } = usePostApi<RegisterResponse, RegisterRequest>(
    '/user/register',
  );

  const handleConfirm = async () => {
    if (mode === 'edit') {
      updateNickname({ nickname: name });
    } else {
      try {
        sessionStorage.setItem('temp_nickname', name);
        console.log('닉네임 저장:', name);

        const loginUrl = getKakaoLoginUrl();
        window.location.href = loginUrl;
      } catch {}
    }
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsNameValid(isValid);
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const isPending = mode === 'edit' ? isUpdatingNickname : isRegistering;
  const isButtonDisabled = !isNameValid || isPending;
  const title = mode === 'edit' ? '닉네임 변경하기' : '콩식이 생성하기';
  const placeholder = mode === 'edit' ? '변경할 이름을 입력하세요.' : '이름을 지어주세요.';
  const buttonText = isPending ? '처리 중...' : '완료';

  return (
    <CenteredContainer
      role="main"
      aria-label={mode === 'edit' ? '닉네임 변경 페이지' : '캐릭터 생성 페이지'}
    >
      <Title>{title}</Title>
      <CharacterImg src={CharacterImage} alt="콩식이 캐릭터" />
      <NameInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        onValidationChange={handleValidationChange}
      />
      <ConfirmButtonContainer role="group" aria-label="액션 버튼">
        <ConfirmButton
          text={buttonText}
          onClick={handleConfirm}
          disabled={isButtonDisabled}
          aria-label={mode === 'edit' ? '닉네임 변경 완료' : '캐릭터 생성 완료'}
        />
        {mode === 'edit' && (
          <CancelButton
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            aria-label="닉네임 변경 취소"
          >
            취소
          </CancelButton>
        )}
      </ConfirmButtonContainer>
    </CenteredContainer>
  );
};

export default CharacterCreatePage;

const CenteredContainer = styled(Container)`
  > * {
    align-items: center;
    justify-content: center;
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const CancelButton = styled.button`
  width: 155px;
  height: 50px;
  flex-shrink: 0;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.6 : 0.9)};
  }
`;
