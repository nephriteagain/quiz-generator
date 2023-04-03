
import QuizList from "../components/index/QuizList"
import CreateQuiz from "../components/index/CreateQuiz"

function Home({quizList, setQuizList}) {
  return (
      <>
      <header>Quizz Generator</header>
      <CreateQuiz />
      <QuizList quizList={quizList} setQuizList={setQuizList}/>
      </>
  )
}

export default Home