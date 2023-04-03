
function Answer({data, setData}) {
  const { title, createdBy: author, questions } = data


  return (
    <div>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <ol type="1">
        {questions?.length && questions.map((question, index) => {
          const {questionText, options} = question
          return (
            <>
            <li key={index}>
              {questionText}
              <ol type="a">
                <br />
                {options?.length && options.map((option, index) => {
                  return (
                    <li key={index}>
                    {option}
                  </li>
                  )
                  
                })}
              </ol>
            </li>
            <br />
            <br />
            </>
          )
        })}
      </ol>
      <br/>
    </div>
  )
}

export default Answer