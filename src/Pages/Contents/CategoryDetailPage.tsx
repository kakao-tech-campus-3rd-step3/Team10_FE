import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { useParams, useNavigate } from 'react-router-dom';
import { categoryContentsDetail } from './constants';
import ReactMarkdown from 'react-markdown';

export const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const categoryId = id ? parseInt(id, 10) : 0;
  const category = categoryContentsDetail.find((item) => item.id === categoryId);

  if (!category) {
    return (
      <Container $scrollable={true}>
        <Header title="카테고리 상세" hasPrevPage={true} backButtonTo={'/contents'} />
        <NavigationBar />
        <DetailPageContainer>
          <ErrorMessage>해당 카테고리를 찾을 수 없습니다.</ErrorMessage>
        </DetailPageContainer>
      </Container>
    );
  }

  return (
    <Container $scrollable={true}>
      <Header title={category.title} hasPrevPage={true} backButtonTo={'/contents'} />
      <NavigationBar />
      <DetailPageContainer>
        <CategoryHeader>
          <CategoryTitle>{category.title}</CategoryTitle>
          <CategorySubtitle>{category.subtitle}</CategorySubtitle>
        </CategoryHeader>

        <CategoryBody>
          <CategoryContent>
            <ReactMarkdown>{category.content}</ReactMarkdown>
          </CategoryContent>
        </CategoryBody>

        <ActionButtonContainer>
          <ActionButton onClick={() => navigate('/contents')}>목록으로 돌아가기</ActionButton>
        </ActionButtonContainer>
        <BottomSpacer />
      </DetailPageContainer>
    </Container>
  );
};

export default CategoryDetailPage;

const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  flex: 1;
`;

const CategoryHeader = styled.div`
  background: linear-gradient(135deg, #6c5ce7 0%, #6c5ce7cc 100%);
  padding: ${theme.spacing(6)} ${theme.spacing(4)};
  color: #ffffff;
`;

const CategoryTitle = styled.h1`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 28px;
  margin: 0 0 ${theme.spacing(2)} 0;
  line-height: 1.2;
`;

const CategorySubtitle = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  opacity: 0.9;
`;

const CategoryBody = styled.div`
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
`;

const CategoryContent = styled.div`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 16px;
  line-height: 1.8;
  color: ${theme.colors.text};

  h3 {
    font-family: ${theme.font.bold.fontFamily};
    font-weight: ${theme.font.bold.fontWeight};
    font-size: 20px;
    margin: ${theme.spacing(4)} 0 ${theme.spacing(2)} 0;
    color: ${theme.colors.text};
  }

  h4 {
    font-family: ${theme.font.bold.fontFamily};
    font-weight: ${theme.font.bold.fontWeight};
    font-size: 18px;
    margin: ${theme.spacing(3)} 0 ${theme.spacing(1)} 0;
    color: ${theme.colors.text};
  }

  p {
    margin: ${theme.spacing(2)} 0;
  }

  ul,
  ol {
    margin: ${theme.spacing(2)} 0;
    padding-left: ${theme.spacing(4)};
  }

  li {
    margin: ${theme.spacing(1)} 0;
  }

  strong {
    font-weight: ${theme.font.bold.fontWeight};
    color: ${theme.colors.primary};
  }
`;

const ActionButtonContainer = styled.div`
  padding: ${theme.spacing(4)};
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
`;

const BottomSpacer = styled.div`
  width: 100%;
  height: ${theme.spacing(15)};
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  background-color: ${theme.colors.primary}cc;
  border: none;
  border-radius: ${theme.spacing(2)};
  color: #ffffff;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  padding: ${theme.spacing(3)} ${theme.spacing(6)};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 2px 8px rgba(108, 92, 231, 0.3);

  &:hover {
    background-color: ${theme.colors.primary};
    box-shadow: 0px 4px 12px rgba(108, 92, 231, 0.4);
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #dc3545;
  font-family: ${theme.font.regular.fontFamily};
`;
