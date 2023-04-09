function QuizModal({quizModalData, setQuizModalData, setShowQuizModal}) {
  console.log(quizModalData)

    const { title, questions } = quizModalData

    return (
    <div className="absolute lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] h-[80vh] z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-300 rounded-xl overflow-auto">
      <div>
        <p>
          {title}
        </p>
      </div>
      <div>
        {questions.map((q, index) => {
          return (
            <div key={index}>
              {JSON.stringify(q)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuizModal