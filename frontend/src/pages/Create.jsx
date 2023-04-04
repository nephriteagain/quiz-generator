import {useState} from 'react'
import { Link } from 'react-router-dom'

import NewQuiz from "../components/create/NewQuiz"
import QuestionList from '../components/create/QuestionList'

function Create() {
  const [formData, setFormData] = useState({})


  return (
    <div>
      <NewQuiz formData={formData} setFormData={setFormData}/>
      <QuestionList formData={formData}/>
      <Link to="/">Back to Home!</Link>
    </div>
  )
}

export default Create