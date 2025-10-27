import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { ContentSlider } from './ContentSlider.tsx';
import { ContentCard } from './ContentCard.tsx';
import { useState } from 'react';
import { slideContents, allContents } from './constants';
import {
  ContentsPageContainer,
  MoreButtonContainer,
  MoreButton,
  ButtonIcon,
  AllContentsSection,
  AllContentsTitle,
  AllContentsGrid,
  CategorySection,
  CategoryTitle,
  CategoryGrid,
  CategoryCard,
  CategoryIcon,
  CategoryName,
  CategoryDescription,
} from './styles';

export const ContentsPage = () => {
  const [showAllContents, setShowAllContents] = useState(false);

  const toggleAllContents = () => {
    setShowAllContents(!showAllContents);
  };

  return (
    <Container $scrollable={true}>
      <Header title="금융 콘텐츠" hasPrevPage={true} />
      <NavigationBar />
      <ContentsPageContainer>
        <ContentSlider contents={slideContents} />

        <MoreButtonContainer>
          <MoreButton onClick={toggleAllContents}>
            {showAllContents ? '접기' : '더보기'}
            <ButtonIcon $isExpanded={showAllContents}>▼</ButtonIcon>
          </MoreButton>
        </MoreButtonContainer>

        {showAllContents && (
          <AllContentsSection>
            <AllContentsTitle>전체 금융 상품</AllContentsTitle>
            <AllContentsGrid>
              {allContents.map((content) => (
                <ContentCard
                  key={content.id}
                  title={content.title}
                  subtitle={content.subtitle}
                  buttonText={content.buttonText}
                  backgroundColor={content.backgroundColor}
                />
              ))}
            </AllContentsGrid>
          </AllContentsSection>
        )}

        <CategorySection>
          <CategoryTitle>금융 상품 둘러보기</CategoryTitle>
          <CategoryGrid>
            <CategoryCard>
              <CategoryIcon>🏦</CategoryIcon>
              <CategoryName>통장</CategoryName>
              <CategoryDescription>통장, 나눠모으기 통장, 서브 통장</CategoryDescription>
            </CategoryCard>
            <CategoryCard>
              <CategoryIcon>💰</CategoryIcon>
              <CategoryName>예금・적금</CategoryName>
              <CategoryDescription>먼저 이자 받는 정기예금, 키워봐요적금</CategoryDescription>
            </CategoryCard>
            <CategoryCard>
              <CategoryIcon>💳</CategoryIcon>
              <CategoryName>대출</CategoryName>
              <CategoryDescription>신용대출, 마이너스통장, 비상금 대출</CategoryDescription>
            </CategoryCard>
            <CategoryCard>
              <CategoryIcon>🌍</CategoryIcon>
              <CategoryName>외환</CategoryName>
              <CategoryDescription>외화 통장</CategoryDescription>
            </CategoryCard>
            <CategoryCard>
              <CategoryIcon>💎</CategoryIcon>
              <CategoryName>카드</CategoryName>
              <CategoryDescription>체크카드, 모임카드, 제휴 신용카드</CategoryDescription>
            </CategoryCard>
          </CategoryGrid>
        </CategorySection>
      </ContentsPageContainer>
    </Container>
  );
};

export default ContentsPage;
