import { createBrowserRouter, Navigate } from 'react-router-dom';
import NotFoundPage from '@/routes/NotFoundPage';
import SplashPage from '@/Pages/StartPage/SplashPage';
import LoginPage from '@/Pages/StartPage/LoginPage';
import CharacterCreatePage from '@/Pages/StartPage/CharacterCreatePage';
import HomePage from '@/Pages/HomePage';
import QuizSolvePage from '@/Pages/QuizPage/QuizSolvePage';
import QuizResultPage from '@/Pages/QuizPage/QuizResultPage';
import data from '@/MockData/Quiz.json';
import { RankPage } from '@/Pages/RankPage';
import ApiTestPage from '@/Pages/Dev/ApiTestPage';
import TestPage from '@/Pages/TestPage/TestPage';

export const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/character-create', element: <CharacterCreatePage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/quizSolve', element: <QuizSolvePage data={data} /> },
  { path: '/quizResult', element: <QuizResultPage data={data} /> },
  { path: '/home', element: <Navigate to="/" replace /> },
  { path: '*', element: <NotFoundPage /> },
  { path: '/rank', element: <RankPage /> },
  { path: '/dev/api-test', element: <ApiTestPage /> },
  { path: '/test', element: <TestPage /> },
]);
