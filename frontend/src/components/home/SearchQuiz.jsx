import { useState, useEffect } from 'react'
import axios from 'axios'

import { useGlobalContext } from '../../context/UserContext'

import { FiSearch } from 'react-icons/fi'

function SearchQuiz() {


  const [cancelTokenSource, setCancelTokenSource] = useState(null)


  const { quizPage, fetchQuizList, searchText, setSearchText } = useGlobalContext()


  useEffect(() => {

    fetchQuizList(quizPage, null, searchText)

  }, [searchText])

  useEffect(() => {
    return () => {
      // Cancel request on unmount
      if (cancelTokenSource) {
        cancelTokenSource.cancel()
      }
    }
  }, [cancelTokenSource])

  return (
    <section className='mt-6 mb-12 text-sm'>
      <label htmlFor='search'
      >
        <FiSearch className='inline me-3 text-xl hover:scale-110 transition-all duration-100'/>
      </label>
      <input className='rounded-md px-2 py-1 text-sm shadow-inner shadow-stone-400 drop-shadow-md focus:bg-blue-100'
        name='search'
        onChange={(e) => setSearchText(e.currentTarget.value)}
      />
    </section>
  )
}

export default SearchQuiz
