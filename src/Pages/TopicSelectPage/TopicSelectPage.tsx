import { Container } from '@/Shared/components/Container';
import Header from '@/Shared/components/Header';
import styled from '@emotion/styled';
import QuizListImg from '@/assets/QuizImg/QuizListImg.webp';
import { theme } from '@/styles/theme';
import { TopicButton } from './TopicButton';
import { useNavigate } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';

interface Topic {
  topicId: number;
  topicName: string;
  totalQuizCount: number;
  solvedQuizCount: number;
}

interface TopicResponse {
  topics: Topic[];
}

export const TopicSelectPage = () => {
  const navigate = useNavigate();
  const handleTopicButtonClick = (topicId: number, topicName: string) => {
    navigate(`/topics/${topicId}/quizzes`, { state: { topicName } });
  };

  const { data: quizListData, error } = useQueryApi<TopicResponse>(['topics'], '/topics');

  if (error) {
    return (
      <Container>
        <Header hasPrevPage={true} title="" />
        <QuizListContainer>
          <QuizListTitle>에러가 발생했습니다</QuizListTitle>
        </QuizListContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header hasPrevPage={true} title="" />
      <QuizListContainer>
        <QuizListImage src={QuizListImg} />
        <QuizListTitle>분야를 선택 해주세요</QuizListTitle>
        <QuizListButtonSection>
          {quizListData?.topics?.map((topic) => (
            <TopicButton
              key={topic.topicId}
              title={topic.topicName}
              solvedQuizCount={topic.solvedQuizCount}
              totalQuizCount={topic.totalQuizCount}
              isAble={true}
              onClick={() => handleTopicButtonClick(topic.topicId, topic.topicName)}
            />
          ))}
        </QuizListButtonSection>
      </QuizListContainer>
    </Container>
  );
};
const QuizListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 20px;
`;
const QuizListImage = styled.img`
  width: 80px;
  height: 80px;
`;
const QuizListTitle = styled.div`
  font-size: 32px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: #000000;
`;
const QuizListButtonSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;
