import { Container } from '@/Shared/components/Container';
import Header from '@/Shared/components/Header';
import { BookmarkIcon } from '@/Shared/components/BookmarkIcon';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import { useState } from 'react';
import type { QuizListResponse } from '@/Pages/QuizPage/types';

const PAGE_SIZE = 10;

export const QuizListPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();

  const topicName = location.state?.topicName;
  const totalQuizCount = location.state?.totalQuizCount || 0;
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: quizListData,
    error,
    isLoading,
  } = useQueryApi<QuizListResponse>(
    ['topics', topicId || '', currentPage],
    `/topics/${topicId || ''}?page=${currentPage}&size=${PAGE_SIZE}`,
  );

  const quizzes = quizListData?.quizzes || [];
  const totalPages = Math.ceil(totalQuizCount / PAGE_SIZE);

  const handleQuizClick = (quizId: number) => {
    navigate(`/topics/${topicId}/quizzes/${quizId}`);
  };

  if (isLoading) {
    return (
      <Container $hasBottomNav={false}>
        <Header hasPrevPage={true} title={topicName || '퀴즈 목록'} />
        <QuizListContainer>
          <LoadingText>퀴즈 목록을 불러오는 중...</LoadingText>
        </QuizListContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container $hasBottomNav={false}>
        <Header hasPrevPage={true} title={topicName || '퀴즈 목록'} backButtonTo={'/topics'} />
        <QuizListContainer>
          <ErrorText>퀴즈 목록을 불러오는데 실패했습니다.</ErrorText>
        </QuizListContainer>
      </Container>
    );
  }

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const blockStart = Math.floor(currentPage / maxVisiblePages) * maxVisiblePages;
    let startPage = blockStart;
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Container $hasBottomNav={false}>
      <Header hasPrevPage={true} title={topicName || '퀴즈 목록'} backButtonTo={'/topics'} />
      <QuizListContainer>
        <QuizListTitle>{topicName} 퀴즈</QuizListTitle>
        <QuizListDescription>총 {totalQuizCount}개의 문제가 있습니다.</QuizListDescription>

        <QuizList>
          {quizzes.map((quiz) => (
            <QuizItem
              key={quiz.quizId}
              onClick={() => handleQuizClick(quiz.quizId)}
              isSolved={quiz.isSolved}
            >
              <QuizItemContainer isSolved={quiz.isSolved}>
                <QuizItemHeader>
                  <QuizOrder>Q{quiz.questionOrder}</QuizOrder>
                  <BadgeContainer>
                    <DifficultyBadge difficulty={quiz.difficultyLevel}>
                      {quiz.difficultyLevel === 'EASY'
                        ? '쉬움'
                        : quiz.difficultyLevel === 'MEDIUM'
                          ? '보통'
                          : '어려움'}
                    </DifficultyBadge>
                    {quiz.isSolved && <SolvedBadge>완료</SolvedBadge>}
                  </BadgeContainer>
                </QuizItemHeader>
                <QuizTitle>{quiz.questionTitle}</QuizTitle>
              </QuizItemContainer>
              <BookmarkIconContainer>
                <BookmarkIcon quizId={quiz.quizId} isBookMarked={quiz.isBookMarked} />
              </BookmarkIconContainer>
            </QuizItem>
          ))}
        </QuizList>

        {quizzes.length === 0 && <EmptyMessage>아직 퀴즈가 없습니다.</EmptyMessage>}

        {totalPages > 0 && (
          <PaginationContainer>
            <PaginationButton onClick={handlePrevPage} disabled={!hasPrevPage}>
              이전
            </PaginationButton>
            <PageNumberContainer>
              {getPageNumbers().map((page) => (
                <PageNumberButton
                  key={page}
                  onClick={() => handlePageClick(page)}
                  $isActive={page === currentPage}
                >
                  {page + 1}
                </PageNumberButton>
              ))}
            </PageNumberContainer>
            <PaginationButton onClick={handleNextPage} disabled={!hasNextPage}>
              다음
            </PaginationButton>
          </PaginationContainer>
        )}
      </QuizListContainer>
    </Container>
  );
};

const QuizListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 0;
  flex: 1;
  padding: 20px;
  padding-bottom: 20px;
`;

const QuizListTitle = styled.h1`
  font-size: 20px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: #000000;
  margin: 0 0 8px 0;
`;

const QuizListDescription = styled.p`
  font-size: 14px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  color: #666666;
  margin: 0 0 20px 0;
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 20px;
`;

const QuizItem = styled.div<{ isSolved: boolean }>`
  background: #ffffff;
  border: 1px solid ${theme.colors.line};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f8f9fa;
    border-color: ${theme.colors.primary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const QuizItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const QuizOrder = styled.span`
  font-size: 16px;
  font-family: ${theme.font.bold.fontFamily};
  font-weight: ${theme.font.bold.fontWeight};
  color: ${theme.colors.primary};
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  font-size: 12px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  padding: 4px 8px;
  border-radius: 12px;
  background: ${(props) =>
    props.difficulty === 'EASY'
      ? '#e8f5e8'
      : props.difficulty === 'MEDIUM'
        ? '#fff3cd'
        : '#f8d7da'};
  color: ${(props) =>
    props.difficulty === 'EASY'
      ? '#28a745'
      : props.difficulty === 'MEDIUM'
        ? '#856404'
        : '#721c24'};
`;

const SolvedBadge = styled.span`
  font-size: 12px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  padding: 4px 8px;
  border-radius: 12px;
  background: #d9d9d996;
  color: #000000;
`;

const QuizTitle = styled.h3`
  font-size: 16px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  color: #000000;
  margin: 0;
  line-height: 1.4;
`;

const LoadingText = styled.div`
  font-size: 16px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  color: #666666;
  text-align: center;
  margin-top: 50px;
`;

const ErrorText = styled.div`
  font-size: 16px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  color: #dc3545;
  text-align: center;
  margin-top: 50px;
`;

const EmptyMessage = styled.div`
  font-size: 16px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  color: #666666;
  text-align: center;
  margin-top: 50px;
  padding-bottom: 20px;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const QuizItemContainer = styled.div<{ isSolved: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.isSolved ? 0.3 : 1)};
`;
const BookmarkIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -16px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 10px 0;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.disabled ? '#e0e0e0' : theme.colors.primary)};
  border-radius: 8px;
  background: ${(props) => (props.disabled ? '#f5f5f5' : '#ffffff')};
  color: ${(props) => (props.disabled ? '#999999' : theme.colors.primary)};
  font-size: 12px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.primary};
    color: #ffffff;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const PageNumberContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const PageNumberButton = styled.button<{ $isActive: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border: 1px solid ${(props) => (props.$isActive ? theme.colors.primary : '#e0e0e0')};
  border-radius: 8px;
  background: ${(props) => (props.$isActive ? theme.colors.primary : '#ffffff')};
  color: ${(props) => (props.$isActive ? '#ffffff' : '#666666')};
  font-size: 14px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${(props) =>
    props.$isActive ? theme.font.bold.fontWeight : theme.font.regular.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${(props) => (props.$isActive ? theme.colors.primary : '#f8f9fa')};
  }

  &:active {
    transform: scale(0.98);
  }
`;
