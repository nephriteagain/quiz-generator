import { useState } from "react"
import { useGlobalContext } from "../context/UserContext"

export default function UpdateQuiz() {
  const { quizToUpdate, setQuizToUpdate } = useGlobalContext()

  const [ title, setTitle ] = useState(quizToUpdate.title)
  const [ questions, setQuestions] = useState(quizToUpdate.questions)

  function submitUpdate() {
    const toSubmit = {...quizToUpdate, title: title, questions: questions}
    console.log(toSubmit)
  }

  return (
    <div className="mt-16">
      <form>
        <div>       
          <input className="block"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div>
          {questions.map((q, index) => {
            const {questionText, options, correctAnswer } = q
            return (
              <div key={index}>
                <div>
                <textarea 
                  type="text"
                  value={questionText}
                  onChange={(e) => {
                    const newQuestions = questions.map((q, i) => {
                      if (i === index) {
                        return {...q, questionText: e.currentTarget.value}
                      }
                      return q
                    })
                    setQuestions(newQuestions)
                  }}
                />                
                </div>
                <div>
                  {options.map((op, ind) => {
                    return (
                      <textarea key={ind}
                        type='text'
                        value={op}
                        onChange={(e) => {
                          const newOp = options.map((o, i) => {
                            if (i === ind) {
                              return e.currentTarget.value
                            }
                            return o
                          })
                          const newQ = questions.map((q, i ) => {
                            if (i === index) {
                              return {...q, options: newOp}
                            }
                            return q
                          })
                          setQuestions(newQ)
                        }}
                      />
                    )
                  })}
                </div>
                <div>
                  <textarea 
                    type='text'
                    value={correctAnswer}
                    onChange={(e) => {
                      const newQ = questions.map((q, i ) => {
                        if (i === index) {
                          return {...q, correctAnswer: e.currentTarget.value}
                        }
                        return q
                      })
                      setQuestions(newQ)
                    }}
                  />
                </div>
              </div>
              
            )
          })}
        </div>    
      </form>
      <button
        onClick={submitUpdate}
      >
        Save Edit
      </button>
      <button
      >
        Cancel
      </button>
    </div>
    
  )
}