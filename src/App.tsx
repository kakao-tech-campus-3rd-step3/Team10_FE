import QuizSolvePage from './Pages/QuizPage/QuizSolvePage';
import data from './MockData/Quiz.json';

function App() {
  return (
    <>
      <QuizSolvePage data={data} />
    </>
  );
}

export default App;
