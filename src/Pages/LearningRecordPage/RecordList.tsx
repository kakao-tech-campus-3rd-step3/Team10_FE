import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { BookmarkIcon } from '@/Shared/components/BookmarkIcon';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type RecordListData = {
  quizId: number;
  topicId: number | string;
  questionSubject: string;
  questionText: string;
  isBookmark?: boolean;
};

export const RecordList = ({ data }: { data: RecordListData[] }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log(data);

  const handleBookmarkChange = () => {
    queryClient.invalidateQueries({ queryKey: ['learningRecord', 'bookmark'] });
  };

  const handleItemClick = (topicId: string | number, quizId: number, isBookmark: boolean) => {
    const routeTopicId = typeof topicId === 'string' ? topicId : isBookmark ? 'bookmark' : 'review';
    navigate(`/topics/${routeTopicId}/quizzes/${quizId}`);
  };

  return (
    <Container>
      {data.map((item) => (
        <QuestionContainer
          key={item.quizId}
          onClick={() => handleItemClick(item.topicId, item.quizId, item.isBookmark || false)}
        >
          <QuestionContent>
            <QuestionSubject>{item.questionSubject}</QuestionSubject>
            <QuestionText>{item.questionText}</QuestionText>
          </QuestionContent>
          {item.isBookmark && (
            <BookmarkWrapper>
              <BookmarkIcon
                quizId={item.quizId}
                isBookMarked={true}
                onBookmarkChange={handleBookmarkChange}
                size={30}
              />
            </BookmarkWrapper>
          )}
        </QuestionContainer>
      ))}
    </Container>
  );
};

export default RecordList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5%;
  width: 98%;
  height: 100%;
  background-color: #ffffff;
  padding: ${theme.spacing(4)};
  position: relative;
  border: 1px solid #c1c1c1;
  border-radius: ${theme.spacing(4)};
  margin: ${theme.spacing(2)} ${theme.spacing(2)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    border-color: ${theme.colors.primary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const QuestionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const QuestionSubject = styled.span`
  width: 30%;
  font-size: 16px;
  font-weight: ${theme.font.bold.fontWeight};
  color: #000000;
`;

const QuestionText = styled.span`
  width: 65%;
  font-size: 16px;
  font-weight: ${theme.font.regular.fontWeight};
  color: #000000;
`;

const BookmarkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
