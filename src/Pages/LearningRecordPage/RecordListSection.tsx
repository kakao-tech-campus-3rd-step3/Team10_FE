import { RecordList } from './RecordList';
import { useQueryApi } from '@/Apis/useQueryApi';

type ReviewResponse = {
  hasReviewQuizzes: boolean;
  reviewQuizzes: {
    quizId: number;
    topicId: number;
    questionTitle: string;
    questionType: 'OX' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
    questionData: unknown;
    difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
    explanation: string;
    correctRate: number;
    reviewStep: string;
  }[];
};

type BookmarkedResponse = {
  bookmarkedQuizzes: {
    quizId: number;
    topicId: number | string;
    questionTitle: string;
    questionTopic: string;
  }[];
};

type Topic = {
  topicId: number;
  topicName: string;
  totalQuizCount: number;
  solvedQuizCount: number;
};

type TopicResponse = {
  topics: Topic[];
};

export const RecordListSection = ({ isIncorrect }: { isIncorrect: boolean }) => {
  const { data: reviewData } = useQueryApi<ReviewResponse>(
    ['learningRecord', 'wrong'],
    '/quiz/wrong',
  );

  const { data: bookmarkData } = useQueryApi<BookmarkedResponse>(
    ['learningRecord', 'bookmark'],
    '/quiz/bookmark',
  );

  const { data: topicData } = useQueryApi<TopicResponse>(['topics'], '/topics');

  const getTopicNameById = (topicId: number): string => {
    const topic = topicData?.topics?.find((t) => t.topicId === topicId);
    return topic?.topicName || `리뷰 ${topicId}`; // topic을 찾지 못하면 기본값 반환
  };

  const mappedData = isIncorrect
    ? Array.from(new Map((reviewData?.reviewQuizzes || []).map((q) => [q.quizId, q])).values()).map(
        (q) => ({
          quizId: q.quizId,
          topicId: 'wrong',
          questionSubject: getTopicNameById(q.topicId), // topicId를 topic 이름으로 매핑
          questionText: q.questionTitle,
          isBookmark: false,
        }),
      )
    : (bookmarkData?.bookmarkedQuizzes || []).map((q) => ({
        quizId: q.quizId,
        topicId: 'bookmark',
        questionSubject: q.questionTopic,
        questionText: q.questionTitle,
        isBookmark: true,
      }));

  return <RecordList data={mappedData} />;
};

export default RecordListSection;
