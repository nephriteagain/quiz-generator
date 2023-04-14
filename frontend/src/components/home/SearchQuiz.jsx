import { useState, useEffect } from 'react'
import axios from 'axios'

import { useGlobalContext } from '../../context/UserContext'

import { FiSearch } from 'react-icons/fi'

function SearchQuiz() {

  const [ searchCriteria, setSearchCriteria ] = useState('title')

  const { quizPage, fetchQuizList, searchText, setSearchText } = useGlobalContext()

  function switchSearchCriteria(e) {
    const criteria = e.currentTarget.value
    setSearchCriteria(criteria)
  }

  useEffect(() => {
    if (searchCriteria === 'title') {
      fetchQuizList(quizPage, null, searchText)
    }
    if (searchCriteria === 'author') {
      fetchQuizList(quizPage, null, null, searchText)
    }

  }, [searchText, searchCriteria])


  return (
    <section className='mt-6 mb-12 text-sm'>
      <p>sorted by:</p>
      <select onChange={(e) => switchSearchCriteria(e)}>
        <option value='title'>
          title
        </option>
        <option value='author'>
          author
        </option>
      </select>

      <label htmlFor='search'
      >
        <FiSearch className='inline me-3 text-xl hover:scale-110 transition-all duration-100'/>
      </label>
      <input className='rounded-md px-2 py-1 text-sm shadow-inner shadow-stone-400 drop-shadow-md focus:bg-blue-100 search-input'
        name='search'
        value={searchText}
        onChange={(e) => setSearchText(e.currentTarget.value)}
      />
    </section>
  )
}

export default SearchQuiz
