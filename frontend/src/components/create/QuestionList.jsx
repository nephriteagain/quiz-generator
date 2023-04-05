function QuestionList({formData}) {

  const {title, questions, createdBy} = formData

  return (
    <div className="basis-1/2 mt-16">
      <h2 className="text-2xl font-semibold mb-1 mt-12">
        {title}
      </h2>
      <h3 className="text-sm ms-1 mb-3 opacity-80">
        {createdBy}
      </h3>
      <ol 
        className="list-decimal"
      >
        {questions?.length && questions.map((question, index) => {
          const {questionText, options, correctAnswer} = question
          return (
            <li 
              key={index}
              className="mb-4 ms-4"
            >
              <h2 className="mb-2">
                {questionText}
              </h2>
              <ol>
                {options.map((item, index) => {
                  return (
                    <li 
                      key={index}
                      className="ms-5"
                    >
                      {item}
                    </li>
                  )
                  
                })}
              </ol>
              <p className="my-2">
                answer: {correctAnswer}
              </p>
            </li>
          )          
        })}
      </ol>
    </div>
  )
}

export default QuestionList