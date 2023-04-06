import { useState } from "react"
import axios from "axios"
import {AiOutlineCheck} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
import {GrRadialSelected, GrRadial} from 'react-icons/gr'

import lowerRoman from "../../lib/data/lowerRoman"

function Answer({data, setData}) {
  const { title, createdBy: author, questions, _id } = data
  const [ showResult, setShowResult ] = useState(false)
  const [ result, setResult ] = useState({})
  const [ score, setScore ] = useState({score: 0, total: 0})
  
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const answers = Object.fromEntries(formData)
    const questions = Object.entries(answers)
    const newAnswers = {
      _id: _id,
      questions: []
    }
    questions.forEach((item) => {
      newAnswers.questions.push(
        {
          questionText: item[0],
          correctAnswer: item[1]
        }
      )
    })

    axios.post(`http://localhost:3000/api/v1/quiz/${_id}`, newAnswers)
      .then((response) => {
        console.log(response.data)
        let score = 0
        let total = 0
        response.data.forEach(item => {
          total++
          item.userCorrect && score++
        })

        setScore({
          score,
          total
        })
        setResult(response.data)
        setShowResult(true)
      })
      .catch((err) => console.log(err, 'error'))
      
    
    e.currentTarget.reset()
  }

  function handleRetry() {
    setShowResult(false)
    setResult({})
    setScore({score: 0, total: 0})
  }

  if (!showResult) return (
    <form onSubmit={handleSubmit} className="container mt-10 mb-5">
      <h2 className="text-2xl font-semibold mb-1">
        {title}
      </h2>
      <h3 className="text-md ms-1 mb-3 opacity-80">
        {author}
      </h3>
      <ol className="list-decimal">
        {questions?.length && questions.map((question, index) => {
          const {questionText, options, _id} = question
          return (
            <div key={index}>
            <li>
              {questionText}
              <ol type>
                <br />
                {options?.length && options.map((option, index) => {
                  return (
                    <li key={index}>
                    <input 
                      type="radio" 
                      name={questionText} 
                      value={option} 
                      required
                      className="me-3"
                    />
                    <label 
                    htmlFor={questionText}
                    className="text-md"
                    >
                      <span>{lowerRoman[index]}. </span>
                      {option}
                    </label><br/>
                  </li>
                  )
                  
                })}
              </ol>
            </li>
            <br />
            <br />
            </div>
          )
        })}
      </ol>
      <br/>
      <input 
        type="submit" 
        className="bg-green-300 px-2 py-1 rounded-md mb-5 drop-shadow-md hover:bg-green-600 hover:text-white transtion-all duration-100"
      />
    </form>
  )

  if (showResult) return (
    <div className="container mt-10 mb-5">
      <h2  className="text-2xl font-semibold mb-1">
        {title}
      </h2>
      <h3 className="text-md ms-1 mb-3 opacity-80">
        {author}
      </h3>
      <ol>
        {result.map((item, index) => {
          return (
            <li key={index}>
              <div>
              {item.userCorrect? 
              <span><AiOutlineCheck className="inline text-green-600 text-xl me-2"/> {item.questionText}</span> : 
              <span><RxCross2 className="inline text-red-600 text-xl me-2"/> {item.questionText}</span>}              
              </div>
              
            <ol>
              {item.options.map((option, index) => {
                return (   
                  <li key={index}>
                  <div className="relative">
                  {
                  item.userAnswer === option ?
                  <span><GrRadialSelected className="inline absolute left-10 bottom-1/2 translate-y-1/2"/> 
                    <span className="ms-16">
                      <span>{lowerRoman[index]}. </span>
                      {option}
                    </span>
                  </span> :
                  <span><GrRadial className="inline absolute left-10 bottom-1/2 translate-y-1/2"/> 
                  <span className="ms-16">
                  <span>{lowerRoman[index]}. </span>
                    {option}
                  </span>
                </span>
                  }
                  </div>
                  
                </li>
                )                
              })}

            </ol>            
              {!item.userCorrect && 
              <p 
                style={!item.userCorrect ? {color: 'blue'}: {}}
                className="text-sm mt-2"
              >
                your answer: {item.userAnswer}
              </p>
              }          
            <p 
              style={item.userCorrect? {color: 'green'} : {color: 'red'}}
              className="italic text-sm mt-2 mb-6"
            >
              correct answer: {item.correctAnswer}
            </p>
            </li> 
          )         
        })}
      </ol>
      <br/>
      <h4 className="font-bold text-xl mb-3">
        Score: {`${score.score} / ${score.total}`}
      </h4>
      <button 
        onClick={handleRetry}
        className="bg-red-300 px-2 py-1 rounded-lg shadow-md mb-4 hover:bg-red-600 hover:text-white hover:border-black hover:drop-shadow-md hover:scale-105 transition-all duration-100"
      >
        Retry Quiz
      </button><br/>
    </div>
  )
}

export default Answer