import axios from "axios"

function Answer({data, setData}) {
  const { title, createdBy: author, questions, _id } = data

  console.log(data)
  
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const answers = Object.fromEntries(formData)
    console.log(answers)
    const questions = Object.entries(answers)
    const newAnswers = {
      _id: _id,
      questions: []
    }
    questions.forEach((item) => {
      newAnswers.questions.push(
        {
          questionText: item[0],
          correctAnswer: item[1]
        }
      )
    })
    console.log(newAnswers)
    axios.post(`http://localhost:3000/api/v1/quiz/${_id}`, newAnswers)
      .then((response) => console.log(response.data), 'response')      
      .catch((err) => console.log(err, 'error'))
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <ol type="1">
        {questions?.length && questions.map((question, index) => {
          const {questionText, options, _id} = question
          return (
            <div key={index}>
            <li >
              {questionText}
              <ol type="a">
                <br />
                {options?.length && options.map((option, index) => {
                  return (
                    <li key={index}>
                    <input type="radio" name={questionText} value={option} required/>
                    <label htmlFor={questionText}>{option}</label><br/>
                  </li>
                  )
                  
                })}
              </ol>
            </li>
            <br />
            <br />
            </div>
          )
        })}
      </ol>
      <br/>
      <input type="submit" />
    </form>
  )
}

export default Answer