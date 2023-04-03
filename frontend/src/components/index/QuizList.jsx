import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

export default function QuizList({quizList, setQuizList}) {

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/')
      .then((response) => {
        setQuizList(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <section>
      <br/>
      {
        quizList.map((quiz, index) => {
          const { title, createdBy, _id } = quiz
          return (
            <div key={index}>
              <h3>{title}</h3>
              <p>{createdBy}</p>
              <Link to={`/quiz/${_id}`}>
              <p>Answer It!</p>
              </Link>
              <br/>
            </div>
          )
        })
      }
    </section>
  )
}