import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

import { useGlobalContext } from "../context/UserContext"

import UserQuizList from "../components/profile/UserQuizList"



function Profile() {

  const [ userQuiz, setUserQuiz ] = useState([])

  const { user } = useGlobalContext()

  const navigate = useNavigate()

  async function fetchData () {
    await axios.get(`http://localhost:3000/api/v1/profile/${user.id}`)
      .then((res) => {
        setUserQuiz(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (user === null ) {
      return navigate('/')
    }
    
    fetchData()
  
  }, [user])



  return (  
    <div className="mt-[15%]">      
      <UserQuizList userQuiz={userQuiz} setUserQuiz={setUserQuiz} fetchData={fetchData}/>

      <div className='text-xl bg-yellow-100 px-2 py-1 rounded-lg shadow-md drop-shadow-md w-fit absolute bottom-4 left-[50%] translate-x-[-50%] hover:scale-110 active:scale-95 transition-all duration-100'>
        <Link to="/"
          className="px-8"
        >
          Back To Home
        </Link>
      </div>
    </div>

  )
}

export default Profile