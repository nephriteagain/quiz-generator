import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../context/UserContext'

import NewQuiz from "../components/create/NewQuiz"
import QuestionList from '../components/create/QuestionList'
import SubmitModal from '../components/create/SubmitModal'

function Create() {
  const [formData, setFormData] = useState({})
  const [ showSubmitModal, setShowSubmitModal ] = useState(false)

  const { user } = useGlobalContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      return navigate('/')
    }
  }, [])

  return (
    <div>
      { showSubmitModal &&
        <SubmitModal 
        formData={formData}
        setFormData={setFormData}
        setShowSubmitModal={setShowSubmitModal}
      />
      }
      <div className='container md:flex md:flex-row'>
        <NewQuiz 
          formData={formData} 
          setFormData={setFormData}
          setShowSubmitModal={setShowSubmitModal}
        />
        <QuestionList 
          formData={formData} 
          setFormData={setFormData}
        />
      </div>      
      <Link to="/"
        className='text-xl bg-yellow-100 px-2 py-1 border-black border-2 rounded-lg shadow-lg'
      >
        Back to Home!
      </Link>
    </div>
  )
}

export default Create