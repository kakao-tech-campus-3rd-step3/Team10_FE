import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import NavigationBar from '@/Shared/components/NavigationBar';
import CharacterMain from '@/assets/HomeImg/character.png';
import { useQueryApi } from '@/Apis/useQueryApi';
import type { CostumeItem, CostumeListResponse, HomeResponse } from './types';
import CostumeButton from './CostumeButton';
import { toAbsoluteUrl } from '@/utils/urlUtils';
import { api } from '@/Apis/axios';
import { useQueryClient } from '@tanstack/react-query';

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
    } catch (err) {
      console.error('착용 실패: ', err);
    }
  };

  const characterSrc = homeData ? toAbsoluteUrl(homeData.characterUri) : CharacterMain;

  if (costumeIsLoading) {
    return (
      <Container $scrollable={true}>
        <Header title="꾸미기" hasPrevPage={true} />
        <NavigationBar />
        <CustomizePageContainer>
          <CharacterSectionWrapper>
            <Character src={characterSrc} alt="캐릭터" />
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
            <Character src={characterSrc} alt="캐릭터" />
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
          <Character
            key={characterSrc}
            src={characterSrc}
            alt="캐릭터"
            onError={(e) => {
              e.currentTarget.src = CharacterMain;
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
                  onSelect={setSelectedId}
                />
              );
            })}
          </CostumeGrid>
          <ConfirmButtonContainer>
            <ConfirmButton type="button" onClick={handleWearCostume} disabled={!selectedId}>
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
  padding: ${theme.spacing(5)};
`;

const Character = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;
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
