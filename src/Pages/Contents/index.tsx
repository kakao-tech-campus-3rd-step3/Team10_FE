import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { ContentSlider } from './ContentSlider.tsx';
import { ContentCard } from './ContentCard.tsx';
import { CategorySection } from './CategorySection';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allContents } from './constants';
import {
  ContentsPageContainer,
  MoreButtonContainer,
  MoreButton,
  ButtonIcon,
  AllContentsSection,
  AllContentsGrid,
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
      <ContentsPageContainer role="main" aria-label="금융 콘텐츠 페이지">
        <ContentSlider contents={slideContents} onContentClick={handleContentClick} />

        <MoreButtonContainer>
          <MoreButton
            onClick={toggleAllContents}
            aria-label={showAllContents ? '콘텐츠 목록 접기' : '전체 콘텐츠 더보기'}
            aria-expanded={showAllContents}
          >
            {showAllContents ? '접기' : '더보기'}
            <ButtonIcon $isExpanded={showAllContents} aria-hidden="true">
              ▼
            </ButtonIcon>
          </MoreButton>
        </MoreButtonContainer>

        {showAllContents && (
          <AllContentsSection role="region" aria-label="전체 콘텐츠 목록">
            <AllContentsGrid role="list" aria-label="콘텐츠 카드 목록">
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

        <CategorySection />
      </ContentsPageContainer>
    </Container>
  );
};

export default ContentsPage;
