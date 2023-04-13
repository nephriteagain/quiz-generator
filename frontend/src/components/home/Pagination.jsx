import { useRef, useState } from 'react'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

import { useGlobalContext } from '../../context/UserContext'
import { paginationButtonStyle } from '../../lib/helper/paginationStyle'


function Pagination() {
  const [ pageNums, setPageNums ] = useState([1,2,3,4,5])


  const { fetchQuizList, quizPage, setQuizPage } = useGlobalContext()

  const dateRef = useRef(null)

  async function quizPagination(pageIndex, e) {

    const page = pageNums.find((page, index) => {
      return index === pageIndex
    })
    

    // make sort

    await fetchQuizList(page)
      .then((res) => {
        paginationButtonStyle(page)
        setQuizPage(page)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function incrementPageFinder(increment) {


    let newPageNums = [1,2,3,4,5]
    if (increment) {
      newPageNums = pageNums.map(page => page + 5)
    } else {
      if (pageNums[0] === 1) return // prevents unnecessary rerender

      newPageNums = pageNums.map(page => {
        if (page >= 6) {
          return page - 5
        }
        return page
      })
    }
    setPageNums(newPageNums)
  }


  return (
    <div className='flex'>
    <div className='me-auto'>
    {
      pageNums.map((page,index) => {
        return (
          <button className='w-8 h-8 bg-green-400 mx-2 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 pagination-button'
            key={page}
            onClick={() => quizPagination(index)}
          >
            {page}
          </button>
        )
      })
    }

   
    
    <button className='w-8 h-8 bg-green-400 mx-2 rounded-lg shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 translate-y-[2px] ml-8'
      onClick={() => incrementPageFinder(false)}
    >
      <IoIosArrowBack className='mx-auto' />
    </button>    
    <button className='w-8 h-8 bg-green-400 mx-2 rounded-lg shadow-md drop-shadow-md hover:scale-105 hover:bg-green-500 active:scale-95 transition-all duration-100 translate-y-[2px]'
      onClick={() => incrementPageFinder(true)}
    >
      <IoIosArrowForward className='mx-auto'/>
    </button>    
  </div>
    </div>
  )
}

export default Pagination