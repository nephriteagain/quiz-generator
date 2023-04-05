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
            <div key={index} className='container'>
              <h3 className='text-xl font-semibold mb-1'>
                {title}
              </h3>
              <p className='text-sm ms-1 mb-3 opacity-80'>
                 {createdBy}
              </p>
              <Link to={`/quiz/${_id}`}>
              <p className='border w-fit px-2 py-1 rounded-md bg-green-400 hover:bg-green-700 hover:text-white transition-all duration-75'>
                Answer Quiz!
              </p>
              </Link>
              <br/>
            </div>
          )
        })
      }
    </section>
  )
}