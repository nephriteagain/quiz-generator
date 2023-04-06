import lowerRoman from "../../lib/data/lowerRoman"
import {RiDeleteBin6Fill} from 'react-icons/ri'

function QuestionList({formData, setFormData}) {

  const {title, questions, createdBy} = formData
  
  function handleDelete(refIndex) {

    const questionsCopy = [...formData.questions]
      .filter((item, index) => {
        return index !== refIndex
      })

    setFormData({
      ...formData,
      questions: questionsCopy
    })
  }


  return (
    <div className="basis-1/2 mt-16">
      <h2 className="text-2xl font-semibold mb-1 mt-12">
        {title}
      </h2>
      <h3 className="text-sm ms-1 mb-3 opacity-80">
        {createdBy}
      </h3>
      <ol 
        className="list-decimal [&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-indigo-100"        
      >
        {questions?.length && questions.map((question, index) => {
          const {questionText, options, correctAnswer} = question
          return (
            <li 
              key={index}
              className="mb-4 ms-4 px-4 py-2 rounded-xl relative drop-shadow-lg shadow-lg"
            >
              <h2 className="mb-2 font-semibold">
                {questionText}
              </h2>
              <ol>
                {options.map((item, index) => {
                  return (
                    <li 
                      key={index}
                      className="ms-5"
                    >
                      <span className="opacity-75">{lowerRoman[index]}. </span>
                      {item}
                    </li>
                  )
                  
                })}
              </ol>
              <p className="my-2">
                <span className="font-semibold">answer : </span>
                {correctAnswer}
              </p>
              <RiDeleteBin6Fill onClick={() => handleDelete(index)}
                className="absolute top-3 right-3 text-xl"
              />
            </li>
          )          
        })}
        
      </ol>
    </div>
  )
}

export default QuestionList