import {useState, useEffect} from 'react'
import {AiOutlineMinusCircle} from 'react-icons/ai'
import axios from 'axios'

function NewQuiz({formData, setFormData}) {
  const [ optionList, setOptionList ] = useState(["", "", ""])

  function handleSubmit(e) {
    e.preventDefault()
    
    const title = document.querySelector('.title')
    const createdBy = document.querySelector('.author')
    const question = document.querySelector('.question')
    const answer = document.querySelector('.answer')
    const options = document.querySelectorAll('.options')
    const optionValue = []
    options.forEach((option) => {
      optionValue.push(option.value)
    })
    setFormData({
      title: title.value,
      createdBy: createdBy.value,
      questions: formData.questions ? [
        ...formData?.questions, 
        {
        questionText: question.value,
        options: optionValue,
        correctAnswer: answer.value
        } 
      ] :
      [
        {
          questionText: question.value,
          options: optionValue,
          correctAnswer: answer.value
          } 
      ]
      
    })

    

    question.value = ''
    answer.value = ''
    options.forEach((option) => {
      option.value = ''
    })
    
  }

  function submitData() {
    axios.post('http://localhost:3000/api/v1/', formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  function addOptions(e) {
    e.preventDefault()

    setOptionList([...optionList, ""])
  }

  function removeOption(e, index) {
    e.preventDefault()
    
    let optionListCopy = [...optionList]
    optionListCopy.splice(index, 1)
    setOptionList(optionListCopy)
  }

  function trackOptionChange(e, indexRef) {
    let value = e.target.value
    let optionListCopy = optionList.map((option, index) => {
      if (indexRef === index) {
        return value
      } else {
        return option
      }
    })
    setOptionList(optionListCopy)    
  }


  useEffect(() => {
    console.log(optionList)
  }, [optionList])

  return (
    <div className='basis-1/2 mt-16'>
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className="5 text-3xl font-bold mb-5">Create a New Quiz</h3>
        <div className='mb-4'>
          <label 
            htmlFor='title'
            className='font-semibold text-xl'
          >
            Title
          </label>
          <br/>
          <input 
            type="text" 
            name='title' 
            className='title border-2 border-black rounded-md ps-2 bg-green-300 focus:bg-green-400 w-[90%]'
            required
          />
        </div>
        <div className='mb-8'>
          <label 
            htmlFor='author'
            className='font-semibold text-lg'
          >
            Author
          </label>
          <br/>
          <input 
            type="text" 
            name='author'  
            className='author border-2 border-black rounded-md ps-2 bg-green-300 focus:bg-green-400 w-[90%]'
            required
          />
        </div>
        <div>
          <h2 className='mb-2 text-lg'>
            Add a Question
          </h2>
          <label 
            htmlFor='question'
            className='text-md'
          >
            Question
          </label>
          <br/>
          <input 
            type="text" 
            name='question' 
            className='question border-2 border-black rounded-md ps-2 bg-green-300 focus:bg-green-400 w-[90%]'
            required
          />
          <br />
          <label 
            htmlFor="options"
            className='text-sm'
          >
            Options
          </label>
          <br />


          {optionList.map((option, index) => {
            return (
              <div key={index} className='mb-3'>
                <input
                type="text" 
                name='options'
                className='options border-2 border-black rounded-md ps-2 bg-green-300 focus:bg-green-400 w-[85%] me-2'
                value={option}
                onChange={(e) => trackOptionChange(e, index)}
                required
              />
                { optionList.length >= 3 && <AiOutlineMinusCircle
                  onClick={(e) => removeOption(e, index)}
                  className='inline text-2xl'
                />}
              </div>
              
            )
          })}
          <button onClick={addOptions}
            className='mb-4 text-sm bg-blue-200 px-2 py-1 rounded-md drop-shadow-md hover:bg-white hover:shadow-md transition-all duration-75'
          >
            Add More Option
          </button>
          <br/>


          <label 
            htmlFor="answer"
            className='font-semibold'
          >
            Answer
          </label>
          <br />          
          <input 
            type="text" 
            name='answer' 
            className='answer border-2 border-black rounded-md ps-2 bg-green-300 mb-4 focus:bg-green-400 w-[90%]'
          />
        </div>
        <input 
          type='submit' 
          value='Add Question'
          className='border bg-blue-300 px-2 py-1 rounded-md drop-shadow-md hover:bg-blue-800 hover:text-white transition-all duration-75 cursor-pointer'
        />
      </form>
    </div>
    <br/>
    <br/>
    <button 
      onClick={submitData}
      className='border bg-blue-500 px-2 py-1 text-xl mb-10 rounded-md text-white drop-shadow-lg hover:bg-blue-800 hover:scale-110 transition-all duration-75'
    >
      Save Quiz
    </button>
    </div>
  )
  
}

export default NewQuiz
