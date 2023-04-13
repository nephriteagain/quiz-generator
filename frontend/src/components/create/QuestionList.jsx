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
    <div className="md:basis-1/2 mt-16 bg-stone-200 rounded-xl drop-shadow-xl shadow-lg px-4 py-2 overflow-x-hidden">
      <h1 className="font-bold mb-8 mt-2 text-3xl text-center">
        Preview
      </h1>
      <h2 className="text-2xl font-semibold mb-1 mt-4">
        {title}
      </h2>
      <h3 className="text-sm ms-1 mb-3 opacity-80">
        {createdBy}
      </h3>
      <ol 
        className="list-decimal list-inside [&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-indigo-100 mt-10 h-[600px] overflow-y-auto"        
      >
        {questions?.length && questions.map((question, index) => {
          const {questionText, options, correctAnswer} = question
          return (
            <li 
              key={index}
              className="mb-4 ms-1 px-4 py-2 rounded-xl relative drop-shadow-lg shadow-lg group"
            >
              <h2 className="mb-2 font-semibold inline">
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
              <span className="text-2xl">
              <RiDeleteBin6Fill onClick={() => handleDelete(index)}
                className="absolute top-3 right-3 text-xl: invisible group-hover:visible cursor-pointer transition-all duration-75"
              />
              </span>
              
            </li>
          )          
        })}
        
      </ol>
    </div>
  )
}

export default QuestionList