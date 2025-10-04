import { Container } from '@/Shared/components/Container';
import Header from '@/Shared/components/Header';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import { useState, useMemo } from 'react';

interface Quiz {
  quizId: number;
  questionOrder: number;
  questionTitle: string;
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  isSolved: boolean;
}

interface QuizListResponse {
  quizzes: Quiz[];
}

type FilterType = 'ALL' | 'UNSOLVED' | 'SOLVED';

export const QuizListPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();

  const topicName = location.state?.topicName;
  const [filterType, setFilterType] = useState<FilterType>('ALL');

  const {
    data: quizListData,
    error,
    isLoading,
  } = useQueryApi<QuizListResponse>(['topic', topicId || ''], `/topic/${topicId || ''}`);

  const filteredQuizzes = useMemo(() => {
    const allQuizzes = quizListData?.quizzes || [];
    switch (filterType) {
      case 'SOLVED':
        return allQuizzes.filter((quiz) => quiz.isSolved);
      case 'UNSOLVED':
        return allQuizzes.filter((quiz) => !quiz.isSolved);
      case 'ALL':
      default:
        return allQuizzes;
    }
  }, [quizListData?.quizzes, filterType]);

  const allQuizzes = quizListData?.quizzes || [];

  const handleQuizClick = (quizId: number) => {
    navigate(`/quizSolve/${quizId}`);
  };

  if (isLoading) {
    return (
      <Container>
        <Header hasPrevPage={true} title={topicName || '퀴즈 목록'} />
        <QuizListContainer>
          <LoadingText>퀴즈 목록을 불러오는 중...</LoadingText>
        </QuizListContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header hasPrevPage={true} title={topicName || '퀴즈 목록'} />
        <QuizListContainer>
          <ErrorText>퀴즈 목록을 불러오는데 실패했습니다.</ErrorText>
        </QuizListContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header hasPrevPage={true} title={topicName || '퀴즈 목록'} />
      <QuizListContainer>
        <QuizListTitle>{topicName} 퀴즈</QuizListTitle>
        <QuizListDescription>총 {allQuizzes.length}개의 퀴즈가 있습니다.</QuizListDescription>

        <FilterButtonContainer>
          <FilterButton isActive={filterType === 'ALL'} onClick={() => setFilterType('ALL')}>
            전체
          </FilterButton>
          <FilterButton
            isActive={filterType === 'UNSOLVED'}
            onClick={() => setFilterType('UNSOLVED')}
          >
            안 푼 문제
          </FilterButton>
          <FilterButton isActive={filterType === 'SOLVED'} onClick={() => setFilterType('SOLVED')}>
            푼 문제
          </FilterButton>
        </FilterButtonContainer>

        <QuizList>
          {filteredQuizzes.map((quiz) => (
            <QuizItem
              key={quiz.quizId}
              onClick={() => handleQuizClick(quiz.quizId)}
              isSolved={quiz.isSolved}
            >
              <QuizItemHeader>
                <QuizOrder>Q{quiz.questionOrder}</QuizOrder>
                <DifficultyBadge difficulty={quiz.difficultyLevel}>
                  {quiz.difficultyLevel === 'EASY'
                    ? '쉬움'
                    : quiz.difficultyLevel === 'MEDIUM'
                      ? '보통'
                      : '어려움'}
                </DifficultyBadge>
                {quiz.isSolved && <SolvedBadge>완료</SolvedBadge>}
              </QuizItemHeader>
              <QuizTitle>{quiz.questionTitle}</QuizTitle>
            </QuizItem>
          ))}
        </QuizList>
        {filteredQuizzes.length === 0 && allQuizzes.length > 0 && (
          <EmptyMessage>
            {filterType === 'SOLVED'
              ? '푼 문제가 없습니다.'
              : filterType === 'UNSOLVED'
                ? '안 푼 문제가 없습니다.'
                : '아직 퀴즈가 없습니다.'}
          </EmptyMessage>
        )}
        {allQuizzes.length === 0 && <EmptyMessage>아직 퀴즈가 없습니다.</EmptyMessage>}
      </QuizListContainer>
    </Container>
  );
};

const QuizListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
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

const FilterButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.isActive ? theme.colors.primary : '#e0e0e0')};
  border-radius: 20px;
  background: ${(props) => (props.isActive ? theme.colors.primary : '#ffffff')};
  color: ${(props) => (props.isActive ? '#ffffff' : '#666666')};
  font-size: 12px;
  font-family: ${theme.font.regular.fontFamily};
  font-weight: ${theme.font.regular.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${(props) => (props.isActive ? theme.colors.primary : '#f8f9fa')};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const QuizItem = styled.div<{ isSolved: boolean }>`
  background: #ffffff;
  border: 1px solid ${theme.colors.line};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isSolved ? 0.5 : 1)};

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
  justify-content: space-between;
  align-items: center;
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
  background: #e8f5e8;
  color: #28a745;
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
`;
