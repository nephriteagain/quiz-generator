
import QuizList from "../components/index/QuizList"
import CreateQuiz from "../components/index/CreateQuiz"

function Home({quizList, setQuizList}) {
  return (
      <>
      <header className="text-5xl mb-14 mt-5 text-center font-bold">
        Quiz Generator
      </header>
      <CreateQuiz />
      <QuizList quizList={quizList} setQuizList={setQuizList}/>
      </>
  )
}

export default Home