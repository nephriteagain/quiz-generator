import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'



export default function QuizList({quizList, setQuizList}) {


  
  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/`)
      .then((response) => {
        setQuizList(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
      
      {
        quizList.map((quiz, index) => {
          const { title, createdBy, _id } = quiz
          return (
            <div key={index} className='container drop-shadow-xl shadow-xl bg-blue-100 px-2 py-2 rounded-xl hover:-translate-y-2 transition-all duration-100 overflow-hidden max-w-[300px] mx-auto'>
              <h3 className='text-xl font-semibold mb-1 whitespace-nowrap'>
                {title}
              </h3>
              <p className='text-sm ms-1 mb-3 opacity-80 whitespace-nowrap'>
                 {createdBy}
              </p>
              <Link to={`/quiz/${_id}`}>
              <p className='w-fit px-2 py-1 rounded-md bg-green-400 hover:bg-green-700 hover:text-white shadow-md drop-shadow-md transition-all duration-75'>
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