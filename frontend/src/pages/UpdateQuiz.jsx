import { useState } from "react"
import { useGlobalContext } from "../context/UserContext"
import {AiOutlineMinusCircle } from 'react-icons/ai'
import { MdDelete} from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { BsCheckCircleFill} from 'react-icons/bs'

export default function UpdateQuiz() {
  const { quizToUpdate, setQuizToUpdate } = useGlobalContext()

  const [ title, setTitle ] = useState(quizToUpdate.title)
  const [ questions, setQuestions] = useState(quizToUpdate.questions)
  const [ showConfirmDeleteButtons, setShowConfirmDeleteButtons ] = useState(false)
  const [ hideDeleteButton, setHideDeleteButton ] = useState(false)

  function submitUpdate(e) {    
    e.preventDefault()
    const toSubmit = {...quizToUpdate, title: title, questions: questions}
  
    // guard clauses  
    console.log(toSubmit)
    // guard clauses
  }



  function removeOption(questionIndex, optionIndex) {
    const transformedOptions = questions[questionIndex].options.filter((option, index) => {
      return index !== optionIndex
    })
    const transformedQuestions = questions.map((question, index) => {
      if (questionIndex === index) {
        return {...question, options: transformedOptions}
      }
      return question
    })
    setQuestions(transformedQuestions)
  }



  function removeQuestion(questionIndex) {
    const newQuestions = questions.filter((q, index) => {
      return index !== questionIndex
    })

    console.log(newQuestions)
    setShowConfirmDeleteButtons(false)
    setHideDeleteButton(false)
    return 
  }

  function showConfirmation() {
    setHideDeleteButton(true)
    setShowConfirmDeleteButtons(true)
  }

  function cancelDelete() {
    setHideDeleteButton(false)
    setShowConfirmDeleteButtons(false)
  }
  


  return (
    <div className="mt-16 w-[90%] max-w-[600px] mx-auto">
      <form onSubmit={submitUpdate}>
        <div className=" mb-6">
          <label htmlFor="title" className="font-semibold text-lg">
            Title  
          </label>      
          <input className="block w-[80%] px-2 text-xl font-bold mt-2 rounded-md shadow-md bg-blue-100"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <p className="font-semibold mb-2">
          Questions:
        </p>
        <div>
          {questions.map((q, index) => {
            const {questionText, options, correctAnswer } = q
            return (
              <div key={index} className="mb-12 bg-orange-100 px-4 py-4 rounded-xl shadow-xl relative group">                
                <div>                
                <textarea className="w-[80%] px-2 rounded-md mb-4 shadow-md bg-blue-100"
                  type="text"
                  value={questionText}
                  rows='2'
                  onChange={(e) => {
                    const newQuestions = questions.map((q, i) => {
                      if (i === index) {
                        return {...q, questionText: e.currentTarget.value}
                      }
                      return q
                    })
                    setQuestions(newQuestions)
                  }}
                />                
                </div>
                <div>
                  {options.map((op, ind) => {
                    return (
                      <div  key={ind} className="relative">
                        <textarea className="w-[80%] px-2 py-1 rounded-md mb-2 me-2 text-sm shadow-md bg-blue-100"
                        type='text'
                        value={op}
                        rows='1'
                        onChange={(e) => {
                          const newOp = options.map((o, i) => {
                            if (i === ind) {
                              return e.currentTarget.value
                            }
                            return o
                          })
                          const newQ = questions.map((q, i ) => {
                            if (i === index) {
                              return {...q, options: newOp}
                            }
                            return q
                          })
                          setQuestions(newQ)
                        }}
                      />
                       <AiOutlineMinusCircle className='inline text-xl cursor-pointer absolute translate-y-2'
                        onClick={() => removeOption(index, ind)}
                       />
                      </div>
                      
                    )
                  })}
                </div>
                <div>
                  <textarea className="w-[80%] px-2 rounded-md mt-8 shadow-md bg-blue-100"
                    type='text'
                    value={correctAnswer}
                    rows='1'
                    onChange={(e) => {
                      const newQ = questions.map((q, i ) => {
                        if (i === index) {
                          return {...q, correctAnswer: e.currentTarget.value}
                        }
                        return q
                      })
                      setQuestions(newQ)
                    }}
                  />
                </div>
                { !hideDeleteButton &&
                  <MdDelete className="absolute text-3xl top-4 right-4 text-red-700 z-10 hover:scale-110 active:scale-90 transition-all duration-100 invisible group-hover:visible"
                  onClick={showConfirmation}
                />
                }
                { showConfirmDeleteButtons &&
                  <div className="absolute z-10 top-4 right-4 invisible group-hover:visible">
                  <TiDelete className="text-blue-500 text-3xl drop-shadow-sm cursor-pointer hover:scale-110 active:scale-90 transition-all duration-100"
                    onClick={cancelDelete}
                  />
                  <BsCheckCircleFill className="text-red-700 text-xl ms-1 mt-2 drop-shadow-sm cursor-pointer hover:scale-110 active:scale-90 transition-all duration-100"
                    onClick={() => removeQuestion(index)}
                  />
                </div>
                }
                
              </div>
              
            )
          })}
        </div>
        <div>
          <input 
            type="submit" 
            value='Submit Edit'
          />
          <button
          >
            Cancel
          </button>
        </div>
      </form>
      
    </div>
    
  )
}