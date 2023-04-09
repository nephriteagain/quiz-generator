import { useState } from "react";

import QuizModal from "./QuizModal";

function UserQuizList({userQuiz, setUserQuiz}) {
  const [ showQuizModal, setShowQuizModal] = useState(false)
  const [ quizModalData, setQuizModalData ] = useState([])

  function displayModal(id) {
    const dataToDisplay = userQuiz.find((quiz) => {
      return quiz._id === id
    })

    setQuizModalData(dataToDisplay)
    setShowQuizModal(true)
  }


  if (userQuiz.length) return (
    <>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-10">
      {userQuiz.map((quiz, index) => {
        const { title, createdAt, _id } = quiz
        const dateObj = new Date(createdAt);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'UTC'
        };

        const readableDate = dateObj.toLocaleDateString('en-US', options)

        const numOfQuestions = quiz.questions.length
      
        return (

          <div key={index} className="container drop-shadow-xl shadow-xl bg-blue-100 px-2 py-2 rounded-xl hover:-translate-y-2 transition-all duration-100 overflow-hidden max-w-[300px] mx-auto">
            <div className="text-lg font-semibold mb-4">
              <p className="text-center">
                {title}
              </p>
            </div>
            <div>
              <p className="opacity-75 text-sm">
                date created:
              </p>
              <p className="text-sm">
                {readableDate}
              </p>
              <p className="text-sm">
                {`${numOfQuestions} question${numOfQuestions > 1 ? 's' : ''}`}
              </p>
              <div className="text-center">
                <button className="bg-orange-300 px-3 py-1 rounded-md drop-shadow-md shadow-md my-2 hover:scale-110 hover:bg-yellow-300 transition-all duration-100"
                  onClick={() => displayModal(_id)}
                >
                  Show Quiz
                </button>
              </div>
            </div>  
          </div>

          
    
        )

      })}
    </div>
    { showQuizModal && 
    <QuizModal 
      quizModalData={quizModalData} 
      setQuizModalData={setQuizModalData}
      setShowQuizModal={setShowQuizModal}
    />}
    </>
  )

  else return (
    <br/>
  )
}

export default UserQuizList