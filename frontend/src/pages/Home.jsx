
import QuizList from "../components/home/QuizList"
import CreateQuiz from "../components/home/CreateQuiz"
import Login from "../components/home/Login"

function Home({quizList, setQuizList}) {
  return (
      <>
      <header className="text-5xl mb-14 mt-5 text-center font-bold">
        Quiz Generator
      </header>
      <Login/>
      <CreateQuiz />
      <QuizList quizList={quizList} setQuizList={setQuizList}/>
      </>
  )
}

export default Home