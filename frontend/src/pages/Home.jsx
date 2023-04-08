import { useGlobalContext } from "../context/UserContext"

import QuizList from "../components/home/QuizList"
import CreateQuiz from "../components/home/CreateQuiz"
import Login from "../components/home/Login"
import Welcome from "../components/home/Welcome"

function Home({quizList, setQuizList}) {

  const { user } = useGlobalContext()

  return (
      <>
      <header className="text-5xl mb-14 mt-5 text-center font-bold">
        Quiz Generator
      </header>
      <Login/>
      { user && <CreateQuiz /> }
      <QuizList quizList={quizList} setQuizList={setQuizList}/>
      <Welcome />
      </>
  )
}

export default Home