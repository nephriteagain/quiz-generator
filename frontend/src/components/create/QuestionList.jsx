function QuestionList({formData}) {

  const {title, questions, createdBy} = formData

  return (
    <div>
      <h2>{title}</h2>
      <h3>{createdBy}</h3>
      <ol type="1">
        {questions?.length && questions.map((question, index) => {
          const {questionText, options, correctAnswer} = question
          return (
            <li key={index}>
              <h2>{questionText}</h2>
              <ol type="a">
                {options.map((item, index) => {
                  return (
                    <li key={index}>{item}</li>
                  )
                  
                })}
              </ol>
              <p>answer: {correctAnswer}</p>
            </li>
          )          
        })}
      </ol>
    </div>
  )
}

export default QuestionList