import QuizList from "../components/QuizList"
import NewQuiz from "../components/NewQuiz"

function Home() {
  return (
      <>
      <header>Quizz Generator</header>
      <NewQuiz />
      <QuizList />
      </>
  )
}

export default Home