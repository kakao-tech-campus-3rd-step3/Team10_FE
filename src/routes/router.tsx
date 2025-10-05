import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import MyPage from '@/Pages/MyPage';
import SharingPage from '@/Pages/MyPage/SharingPage';
import SplashPage from '@/Pages/StartPage/SplashPage';
import LoginPage from '@/Pages/StartPage/LoginPage';
import CharacterCreatePage from '@/Pages/StartPage/CharacterCreatePage';
import { KakaoCallbackPage } from '@/Pages/StartPage/KakaoCallbackPage';
import HomePage from '@/Pages/HomePage';
import QuizSolvePage from '@/Pages/QuizPage/QuizSolvePage';
import QuizResultPage from '@/Pages/QuizPage/QuizResultPage';
import { RankPage } from '@/Pages/RankPage';
import ApiTestPage from '@/Pages/Dev/ApiTestPage';
import TestPage from '@/Pages/TestPage/TestPage';
import TestResultPage from '@/Pages/TestPage/TestResultPage';
import { LearningRecordPage } from '@/Pages/LearningRecordPage';
import { TierPage } from '@/Pages/TierPage';
import { TopicSelectPage } from '@/Pages/TopicSelectPage/TopicSelectPage';
import { QuizListPage } from '@/Pages/TopicSelectPage/QuizListPage';
import { ProtectedRoute } from '@/Shared/components/ProtectedRoute';

export const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/character-create', element: <CharacterCreatePage /> },
  { path: '/auth/kakao/callback', element: <KakaoCallbackPage /> },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/quizList',
    element: (
      <ProtectedRoute>
        <TopicSelectPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/quizList/:topicId',
    element: (
      <ProtectedRoute>
        <QuizListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/quizSolve/:quizId',
    element: (
      <ProtectedRoute>
        <QuizSolvePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/quizResult/:quizId',
    element: (
      <ProtectedRoute>
        <QuizResultPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/mypage',
    element: (
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/sharing',
    element: (
      <ProtectedRoute>
        <SharingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/rank',
    element: (
      <ProtectedRoute>
        <RankPage />
      </ProtectedRoute>
    ),
  },
  { path: '/dev/api-test', element: <ApiTestPage /> },
  {
    path: '/test',
    element: (
      <ProtectedRoute>
        <TestPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/test/result',
    element: (
      <ProtectedRoute>
        <TestResultPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/record',
    element: (
      <ProtectedRoute>
        <LearningRecordPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tier',
    element: (
      <ProtectedRoute>
        <TierPage />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <NotFoundPage /> },
]);
