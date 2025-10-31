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

export const RecordListSection = ({ isIncorrect }: { isIncorrect: boolean }) => {
  const { data: reviewData } = useQueryApi<ReviewResponse>(
    ['learningRecord', 'review'],
    '/quiz/review',
  );

  const { data: bookmarkData } = useQueryApi<BookmarkedResponse>(
    ['learningRecord', 'bookmark'],
    '/quiz/bookmark',
  );

  const mappedData = isIncorrect
    ? Array.from(new Map((reviewData?.reviewQuizzes || []).map((q) => [q.quizId, q])).values()).map(
        (q) => ({
          quizId: q.quizId,
          topicId: 'review',
          questionSubject: `리뷰 ${q.reviewStep}`,
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
