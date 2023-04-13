import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/UserContext'


import { paginationButtonStyle } from '../../lib/helper/paginationStyle'


export default function QuizList({quizList,}) {

  const { fetchQuizList, setQuizPage } = useGlobalContext()

  async function backToPageOne() {
    await fetchQuizList(1)
      .then(res => {
        paginationButtonStyle(1)
        setQuizPage(1)

        // const searchInput = document.querySelector('.search-input')
        // searchInput.value = ''
      })
      .catch(err => {
        console.log(err)
      })
  }



  useEffect(() => {
    paginationButtonStyle(1)
  }, [])



  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-6'>
    
    { quizList.length > 0 ?

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
      }) :

      <div className='mt-4'>
        <p className='text-xl font-bold mb-2'>
          No More Results...  
        </p>
        <button className='bg-orange-200 rounded-md px-2 py-1 drop-shadow-md shadow-md hover:scale-105 active:scale-95 transition-all duration-100'
          onClick={backToPageOne}
        >
          Back to Page 1
        </button>
      </div>
    }
  </section>

  )
}