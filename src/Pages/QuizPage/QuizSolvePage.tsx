import styled from '@emotion/styled';
import QuestionButton from './QuestionButton';
import QuizConfirmButton from './QuizConfirmButton';
import QuizHeader from './QuizHeader';
import { Container } from '@/Shared/components/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryApi } from '@/Apis/useQueryApi';
import { usePostApi } from '@/Apis/useMutationApi';
import { useState } from 'react';
import type { QuizData, QuizSubmitRequest } from './types';
import Header from '@/Shared/components/Header';
import { useQueryClient } from '@tanstack/react-query';

export const QuizSolvePage = () => {
  const navigate = useNavigate();
  const { topicId, quizId } = useParams<{ topicId: string; quizId: string }>();
  const queryClient = useQueryClient();

  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | number | null>(null);

  const {
    data: quizData,
    error,
    isLoading,
  } = useQueryApi<QuizData>(['quiz', quizId || ''], `/quiz/${quizId || ''}`);

  const submitQuizMutation = usePostApi<void, QuizSubmitRequest>(`/quiz/${quizId}/submit`);

  const checkAnswer = (selectedAnswer: string | boolean | number, quizData: QuizData): boolean => {
    if (quizData.questionType === 'OX') {
      return selectedAnswer === quizData.questionData.correctAnswer;
    } else if (quizData.questionType === 'MULTIPLE_CHOICE') {
      const choiceIndex = selectedAnswer as number;
      return quizData.questionData.choices?.[choiceIndex]?.correctAnswer === true;
    }
    return false;
  };

  const handleConfirm = async () => {
    if (selectedAnswer === null) {
      alert('답을 선택해주세요!');
      return;
    }

    if (!quizData) {
      alert('퀴즈 데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const isCorrect = checkAnswer(selectedAnswer, quizData);

      await submitQuizMutation.mutateAsync({ isCorrect });

      navigate(`/topics/${topicId}/quizzes/${quizId}/result`, {
        state: {
          selectedAnswer,
          isCorrect,
          quizData,
        },
      });
    } catch {
      alert('답안 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAnswerSelect = (answer: string | boolean | number) => {
    setSelectedAnswer(answer);
  };

  const handleBookmarkChange = (quizId: number) => {
    queryClient.invalidateQueries({ queryKey: ['quiz', String(quizId)] });
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingMessage>퀴즈를 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  if (error || !quizData) {
    return (
      <Container>
        <ErrorMessage>퀴즈를 불러오는데 실패했습니다.</ErrorMessage>
      </Container>
    );
  }

  const { questionTitle, difficultyLevel, questionOrder, questionType, questionData } = quizData;

  const renderQuestionContent = () => {
    switch (questionType) {
      case 'OX':
        return (
          <OXButtonContainer>
            <QuestionButton
              text="O"
              isSelected={selectedAnswer === true}
              onClick={() => handleAnswerSelect(true)}
            />
            <QuestionButton
              text="X"
              isSelected={selectedAnswer === false}
              onClick={() => handleAnswerSelect(false)}
            />
          </OXButtonContainer>
        );
      case 'MULTIPLE_CHOICE':
        return (
          <QuestionButtonContainer>
            {questionData.choices?.map((choice, index) => (
              <QuestionButton
                key={index}
                text={choice.text}
                isSelected={selectedAnswer === index}
                onClick={() => handleAnswerSelect(index)}
              />
            ))}
          </QuestionButtonContainer>
        );
      default:
        return (
          <QuestionButtonContainer>
            <ErrorMessage>지원하지 않는 문제 유형입니다.</ErrorMessage>
          </QuestionButtonContainer>
        );
    }
  };

  return (
    <Container $scrollable>
      <Header title={quizData.topicName} hasPrevPage={true} />
      <Space />
      <QuizHeader
        questionOrder={questionOrder}
        questionText={questionTitle}
        difficultyLevel={difficultyLevel}
        quizId={quizData.quizId}
        isBookMarked={quizData.isBookmarked}
        onBookmarkChange={handleBookmarkChange}
      />
      {renderQuestionContent()}
      <ConfirmButtonContainer onClick={handleConfirm}>
        <QuizConfirmButton
          text={submitQuizMutation.isPending ? '제출 중...' : '제출하기'}
          disabled={submitQuizMutation.isPending}
        />
      </ConfirmButtonContainer>
    </Container>
  );
};

export default QuizSolvePage;

const Space = styled.div`
  height: 40px;
`;
const QuestionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 50px;
`;

const OXButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
`;
const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666666;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #dc3545;
`;
