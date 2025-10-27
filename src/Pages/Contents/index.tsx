import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { ContentSlider } from './ContentSlider.tsx';
import { ContentCard } from './ContentCard.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allContents, categoryContents } from './constants';
import {
  ContentsPageContainer,
  MoreButtonContainer,
  MoreButton,
  ButtonIcon,
  AllContentsSection,
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
  const navigate = useNavigate();

  const slideContents = allContents.filter((content) => content.id <= 4);

  const toggleAllContents = () => {
    setShowAllContents(!showAllContents);
  };

  const handleContentClick = (contentId: number) => {
    navigate(`/contents/${contentId}`);
  };

  return (
    <Container $scrollable={true}>
      <Header title="금융 콘텐츠" hasPrevPage={true} />
      <NavigationBar />
      <ContentsPageContainer>
        <ContentSlider contents={slideContents} onContentClick={handleContentClick} />

        <MoreButtonContainer>
          <MoreButton onClick={toggleAllContents}>
            {showAllContents ? '접기' : '더보기'}
            <ButtonIcon $isExpanded={showAllContents}>▼</ButtonIcon>
          </MoreButton>
        </MoreButtonContainer>

        {showAllContents && (
          <AllContentsSection>
            <AllContentsGrid>
              {allContents.map((content) => (
                <ContentCard
                  key={content.id}
                  title={content.title}
                  subtitle={content.subtitle}
                  buttonText={content.buttonText}
                  backgroundColor={content.backgroundColor}
                  hashtag={content.hashtag}
                  onClick={() => handleContentClick(content.id)}
                />
              ))}
            </AllContentsGrid>
          </AllContentsSection>
        )}

        <CategorySection>
          <CategoryTitle>꼭 알아야 할 금융 상품</CategoryTitle>
          <CategoryGrid>
            {categoryContents.map((content) => (
              <CategoryCard key={content.id}>
                <CategoryIcon>{content.icon}</CategoryIcon>
                <CategoryName>{content.title}</CategoryName>
                <CategoryDescription>{content.subtitle}</CategoryDescription>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </CategorySection>
      </ContentsPageContainer>
    </Container>
  );
};

export default ContentsPage;
