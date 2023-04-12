import { useGlobalContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

import { paginationButtonStyle } from '../../lib/helper/paginationStyle'
import { useEffect } from 'react'


export default function QuizList({quizList, setQuizList}) {

  const { fetchQuizList, quizPage, setQuizPage } = useGlobalContext()

  async function quizPagination(e) {
    const page = parseInt(e.currentTarget.innerText)
    
    await fetchQuizList(page)
      .then((res) => {
        paginationButtonStyle(page)
        setQuizPage(page)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    paginationButtonStyle(1)
  }, [])



  return (
    <>
    <div>
      <button className='w-8 h-8 bg-green-400 mx-2 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 pagination-button'
        onClick={(e) => quizPagination(e)}
      >
        1
      </button>

      <button className='w-8 h-8 bg-green-400 mx-2 rounded-lg shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 pagination-button'
        onClick={(e) => quizPagination(e)}
      >
        2
      </button>

      <button className='w-8 h-8 bg-green-400 mx-2 rounded-lg shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 pagination-button'
        onClick={(e) => quizPagination(e)}
      >
        3
      </button>

      <button className='w-8 h-8 bg-green-400 mx-2 rounded-lg shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 pagination-button'
        onClick={(e) => quizPagination(e)}
      >
        4
      </button>
      
      <button className='w-8 h-8 bg-green-400 mx-2 rounded-lg shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 pagination-button'
        onClick={(e) => quizPagination(e)}
      >
        5
      </button>
    </div>
    

    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-6'>
      
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
    </>
  )
}