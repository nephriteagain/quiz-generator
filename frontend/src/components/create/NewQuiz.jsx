import {useState, useEffect} from 'react'
import axios from 'axios'

function NewQuiz({formData, setFormData}) {

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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create a New Quiz</h3>
        <div>
          <label htmlFor='title'>Title</label>
          <br/>
          <input 
            type="text" 
            name='title' 
            className='title'
          />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <br/>
          <input 
            type="text" 
            name='author'  
            className='author'
          />
        </div>
        <div>
          <h2>Add a Question</h2>
          <label htmlFor='question'>Question</label>
          <br/>
          <input 
            type="text" 
            name='question' 
            className='question'
          />
          <br />
          <label htmlFor="options">Options</label>
          <br />
          <input 
            type="text" 
            name='options'
            className='options'
          />
          <br />
          <input 
            type='text' 
            name='options' 
            className='options'
          />
          <br />
          <input 
            type='text' 
            name='options' 
            className='options'
          />
          <br />
          <label htmlFor="answer">Answer</label>
          <br />
          <input 
            type="text" 
            name='answer' 
            className='answer'
          />
        </div>
        <input type='submit' value='add'/>
      </form>
    </div>
    <button onClick={submitData}>Submit Question</button>
    </>
  )
  
}

export default NewQuiz
