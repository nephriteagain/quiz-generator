import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
        console.log(res.data)
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
    <div>
      <UserQuizList userQuiz={userQuiz} setUserQuiz={setUserQuiz}/>
    </div>
  )
}

export default Profile