import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import MyPage from '@/Pages/MyPage/MyPage';
import SharingPage from '@/Pages/MyPage/SharingPage';
import SplashPage from '@/Pages/StartPage/SplashPage';
import LoginPage from '@/Pages/StartPage/LoginPage';
import CharacterCreatePage from '@/Pages/StartPage/CharacterCreatePage';
import HomePage from '@/Pages/HomePage';
import QuizSolvePage from '@/Pages/QuizPage/QuizSolvePage';
import QuizResultPage from '@/Pages/QuizPage/QuizResultPage';
import data from '@/MockData/Quiz.json';

export const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/character-create', element: <CharacterCreatePage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/quizSolve', element: <QuizSolvePage data={data} /> },
  { path: '/quizResult', element: <QuizResultPage data={data} /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/sharing', element: <SharingPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
