import { useState, useEffect } from 'react'

import axios from 'axios'

export default function QuizList() {
  const [quizList, setQuizList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/')
      .then((response) => {
        setQuizList(response.data)
        setLoading(false)
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <section>
      {
        quizList.map((quiz, index) => {
          const { title, createdBy, questions, _id } = quiz
          return (
            <div key={index}>
            <h2>{title}</h2>
            <h3>{createdBy}</h3>
            <ol type='1'>
              {questions.map((item, index) => {
                const { questionText, options } = item
                return (
                  <li key={index}>
                    <h2>{questionText}</h2>
                    <hr/>
                    <ol type='a'>

                    {options.map((item, index) => {
                      return (
                        <li key={index}>{item}</li>
                        )
                      })}
                      </ol>
                  </li>
                )
              })}
            </ol>
            </div>
          )
        })
      }
    </section>
  )
}