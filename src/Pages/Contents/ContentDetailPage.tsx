import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import NavigationBar from '@/Shared/components/NavigationBar';
import { Container } from '@/Shared/components/Container';
import { Header } from '@/Shared/components/Header';
import { useParams, useNavigate } from 'react-router-dom';
import { detailContents } from './constants';
import ReactMarkdown from 'react-markdown';

export const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const contentId = id ? parseInt(id, 10) : 0;
  const content = detailContents.find((item) => item.id === contentId);

  if (!content) {
    return (
      <Container $scrollable={true}>
        <Header title="컨텐츠 상세" hasPrevPage={true} backButtonTo={'/contents'} />
        <NavigationBar />
        <DetailPageContainer>
          <ErrorMessage>해당 컨텐츠를 찾을 수 없습니다.</ErrorMessage>
        </DetailPageContainer>
      </Container>
    );
  }

  return (
    <Container $scrollable={true}>
      <Header title={content.title} hasPrevPage={true} backButtonTo={'/contents'} />
      <NavigationBar />
      <DetailPageContainer>
        <ContentHeader $backgroundColor={content.backgroundColor}>
          <ContentTitle>{content.title}</ContentTitle>
          <ContentSubtitle>{content.subtitle}</ContentSubtitle>
          <ContentHashtags>
            {content.hashtag.map((hashtag) => (
              <ContentHashtag key={hashtag}>#{hashtag}</ContentHashtag>
            ))}
          </ContentHashtags>
        </ContentHeader>

        <ContentBody>
          <ContentText>
            <ReactMarkdown>{content.content}</ReactMarkdown>
          </ContentText>
        </ContentBody>

        <ActionButtonContainer>
          <ActionButton onClick={() => navigate('/contents')}>목록으로 돌아가기</ActionButton>
          {content.url && (
            <ExternalLinkButton href={content.url} target="_blank" rel="noopener noreferrer">
              공식 사이트에서 자세히 보기
            </ExternalLinkButton>
          )}
        </ActionButtonContainer>
        <BottomSpacer />
      </DetailPageContainer>
    </Container>
  );
};

export default ContentDetailPage;

const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  flex: 1;
`;

const ContentHeader = styled.div<{ $backgroundColor: string }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.$backgroundColor} 0%,
    ${(props) => props.$backgroundColor}CC 100%
  );
  padding: ${theme.spacing(6)} ${theme.spacing(4)};
  color: #ffffff;
`;

const ContentTitle = styled.h1`
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 28px;
  margin: 0 0 ${theme.spacing(2)} 0;
  line-height: 1.2;
`;

const ContentSubtitle = styled.p`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  opacity: 0.9;
`;

const ContentBody = styled.div`
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
`;

const ContentText = styled.div`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 16px;
  line-height: 1.8;
  color: ${theme.colors.text};
`;

const ActionButtonContainer = styled.div`
  padding: ${theme.spacing(4)};
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  gap: ${theme.spacing(3)};
  flex-wrap: wrap;
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

const ExternalLinkButton = styled.a`
  background-color: #11d2ab;
  border: none;
  border-radius: ${theme.spacing(2)};
  color: #ffffff;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  font-size: 16px;
  padding: ${theme.spacing(3)} ${theme.spacing(6)};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 2px 8px rgba(0, 184, 148, 0.3);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing(1)};

  &:hover {
    background-color: #00b894;
    box-shadow: 0px 4px 12px rgba(0, 184, 148, 0.4);
    transform: translateY(-1px);
  }

  &::after {
    content: '↗';
    font-size: 14px;
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

const ContentHashtags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1)};
`;

const ContentHashtag = styled.span`
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  font-size: 12px;
`;
