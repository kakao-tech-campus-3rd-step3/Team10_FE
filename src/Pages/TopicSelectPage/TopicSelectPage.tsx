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
  const handleTopicButtonClick = (topicId: number, topicName: string, totalQuizCount: number) => {
    navigate(`/topics/${topicId}/quizzes`, {
      state: { topicName, totalQuizCount },
    });
  };

  const { data: quizListData, error } = useQueryApi<TopicResponse>(['topics'], '/topics');

  if (error) {
    return (
      <Container>
        <Header hasPrevPage={true} title="" />
        <QuizListContainer>
          <QuizListTitle role="alert" aria-live="assertive">
            에러가 발생했습니다
          </QuizListTitle>
        </QuizListContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header hasPrevPage={true} title="" />
      <QuizListContainer role="main" aria-label="퀴즈 토픽 선택 페이지">
        <QuizListImage src={QuizListImg} alt="퀴즈 목록 아이콘" />
        <QuizListTitle>분야를 선택 해주세요</QuizListTitle>
        <QuizListButtonSection role="list" aria-label="토픽 목록">
          {quizListData?.topics?.map((topic) => (
            <TopicButton
              key={topic.topicId}
              title={topic.topicName}
              solvedQuizCount={topic.solvedQuizCount}
              totalQuizCount={topic.totalQuizCount}
              isAble={true}
              onClick={() =>
                handleTopicButtonClick(topic.topicId, topic.topicName, topic.totalQuizCount)
              }
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
