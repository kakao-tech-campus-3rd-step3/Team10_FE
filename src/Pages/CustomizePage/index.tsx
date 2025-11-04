import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import NavigationBar from '@/Shared/components/NavigationBar';
import CharacterMain from '@/assets/HomeImg/character.webp';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { CostumeItem, CostumeListResponse, HomeResponse } from './types';
import CostumeButton from './CostumeButton';
import { toAbsoluteUrl } from '@/utils/urlUtils';
import { api } from '@/Apis/axios';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '@/Shared/components/LoadingSpinner';
// 코스튬 미리보기 이미지들
import Costume0 from '@/assets/CustomizeImg/0.webp';
import Costume1 from '@/assets/CustomizeImg/1.webp';
import Costume2 from '@/assets/CustomizeImg/2.webp';
import Costume3 from '@/assets/CustomizeImg/3.webp';
import Costume4 from '@/assets/CustomizeImg/4.webp';
import Costume5 from '@/assets/CustomizeImg/5.webp';
import Costume6 from '@/assets/CustomizeImg/6.webp';
import Costume7 from '@/assets/CustomizeImg/7.webp';

// 코스튬 id -> 미리보기 이미지 매핑
const costumePreviewMap: Record<number, string> = {
  0: Costume0,
  1: Costume1,
  2: Costume2,
  3: Costume3,
  4: Costume4,
  5: Costume5,
  6: Costume6,
  7: Costume7,
};

export const CustomizePage = () => {
  const {
    data: costumeData,
    error: costumeError,
    isLoading: costumeIsLoading,
    refetch: refetchCostume,
  } = useQueryApi<CostumeListResponse>(['costume'], '/costume');

  const { data: homeData, refetch: refetchHome } = useQueryApi<HomeResponse>(
    ['page', 'home'],
    '/page/home',
  );

  const costumeList: CostumeItem[] = costumeData?.costumeItems ?? [];
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (costumeList.length > 0) {
      const worn = costumeList.find((c) => c.isWorn);
      if (worn) {
        setSelectedId(worn.id);
      } else {
        setSelectedId(costumeList[0].id);
      }
    }
  }, [costumeList]);

  const queryClient = useQueryClient();

  // 코스튬 선택 시 미리보기만 업데이트 (API 호출 없음)
  const handleCostumeSelect = (costumeId: number) => {
    setSelectedId(costumeId);
    setIsImageLoading(true); // 이미지 변경 시 로딩 상태로 설정
  };

  // 제출하기 버튼 클릭 시 API 호출 후 alert 표시
  const handleWearCostume = async () => {
    if (selectedId == null) return;

    try {
      await api.post(`/costume/${selectedId}`);
      await Promise.all([
        refetchCostume(),
        refetchHome(),
        queryClient.invalidateQueries({ queryKey: ['page', 'home'] }),
        queryClient.invalidateQueries({ queryKey: ['usernickname'] }),
      ]);
      // 성공 시 alert 표시
      alert('착용하기 완료');
    } catch (err) {
      console.error('착용 실패: ', err);
    }
  };

  const getPreviewCharacterSrc = (): string => {
    if (selectedId !== null && costumePreviewMap[selectedId]) {
      return costumePreviewMap[selectedId];
    }
    if (homeData) {
      return toAbsoluteUrl(homeData.characterUri) || CharacterMain;
    }
    return CharacterMain;
  };

  const previewCharacterSrc = getPreviewCharacterSrc();

  // 이미지 변경 시 로딩 상태로 설정
  useEffect(() => {
    setIsImageLoading(true);
  }, [previewCharacterSrc]);

  if (costumeIsLoading) {
    return (
      <Container $scrollable={true}>
        <Header title="꾸미기" hasPrevPage={true} />
        <NavigationBar />
        <CustomizePageContainer>
          <CharacterSectionWrapper>
            <Character src={previewCharacterSrc} alt="캐릭터" />
          </CharacterSectionWrapper>
          <ShopCard>
            <ShopHeaderRow>
              <ShopTitle>옷 가게</ShopTitle>
            </ShopHeaderRow>
            <LoadingMessage>로딩 중...</LoadingMessage>
          </ShopCard>
        </CustomizePageContainer>
      </Container>
    );
  }

  if (costumeError || !costumeList) {
    return (
      <Container $scrollable={true}>
        <Header title="꾸미기" hasPrevPage={true} />
        <NavigationBar />
        <CustomizePageContainer>
          <CharacterSectionWrapper>
            <Character src={previewCharacterSrc} alt="캐릭터" />
          </CharacterSectionWrapper>
          <ShopCard>
            <ShopHeaderRow>
              <ShopTitle>옷 가게</ShopTitle>
            </ShopHeaderRow>
            <ErrorMessage>데이터를 불러오는데 실패했습니다.</ErrorMessage>
          </ShopCard>
        </CustomizePageContainer>
      </Container>
    );
  }

  return (
    <Container $scrollable={true}>
      <Header title="꾸미기" hasPrevPage={true} />
      <NavigationBar />
      <CustomizePageContainer>
        <CharacterSectionWrapper>
          {isImageLoading && (
            <CharacterPlaceholder>
              <LoadingSpinner size="medium" color={theme.colors.primary} message="" />
            </CharacterPlaceholder>
          )}
          <Character
            key={previewCharacterSrc}
            src={previewCharacterSrc}
            alt="캐릭터"
            draggable={false}
            style={{ display: isImageLoading ? 'none' : 'block' }}
            onLoad={() => setIsImageLoading(false)}
            onError={(e) => {
              e.currentTarget.src = CharacterMain;
              setIsImageLoading(false);
            }}
          />
        </CharacterSectionWrapper>
        <ShopCard>
          <ShopHeaderRow>
            <ShopTitle>옷 가게</ShopTitle>
          </ShopHeaderRow>
          <CostumeGrid>
            {costumeList.map((item) => {
              const isActive = item.id === selectedId;
              return (
                <CostumeButton
                  key={item.id}
                  id={item.id}
                  img={toAbsoluteUrl(item.costumeItemImageUrl)}
                  active={isActive}
                  onSelect={handleCostumeSelect}
                />
              );
            })}
          </CostumeGrid>
          <ConfirmButtonContainer>
            <ConfirmButton type="button" onClick={handleWearCostume}>
              착용하기
            </ConfirmButton>
          </ConfirmButtonContainer>
        </ShopCard>
      </CustomizePageContainer>
    </Container>
  );
};

export default CustomizePage;

const CustomizePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const CharacterSectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(5)};
  min-height: 300px;
`;

const CharacterPlaceholder = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Character = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  pointer-events: none;
`;

const ShopCard = styled.section`
  width: 90%; /* 가로 폭을 90%로 줄임 */
  margin: 0 auto; /* 가운데 정렬 */
  background-color: #fafafa;
  border-radius: ${theme.spacing(2)};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing(5)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
`;

const ShopHeaderRow = styled.div`
  background-color: transparent;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: ${theme.spacing(6)};
`;

const ShopTitle = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.colors.text};
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 24px;
  margin: 0;
`;

const CostumeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${theme.spacing(5)};
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 340px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 220px) {
    grid-template-columns: 1fr;
  }
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

const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing(3)};
`;

const ConfirmButton = styled.button`
  width: 155px;
  height: 50px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 52px;
  border: 2px solid #d3e0b4;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
