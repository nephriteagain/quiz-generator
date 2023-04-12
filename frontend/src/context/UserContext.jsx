import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ quizToUpdate, setQuizToUpdate] = useState({})
  const [ userQuiz, setUserQuiz ] = useState([])
  const [ quizList, setQuizList] = useState([])
  const [ quizPage, setQuizPage ] = useState(1)
  

  async function fetchUserData () {
    await axios.get(`http://localhost:3000/api/v1/profile/${user.id}`, {withCredentials: true})
      .then((res) => {
        setUserQuiz(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  async function fetchQuizList(page) {
    
    await axios.get(`http://localhost:3000/api/v1/?page=${page}`, {withCredentials: true})
      .then((response) => {
        setQuizList(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    fetchQuizList(1)
  }, [])


  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/user/session', {withCredentials: true})
      .then((res) => {
        if (res.data.session) {
          setUser(res.data.user)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  

  useEffect(() => {
    if (user !== null) {
      fetchUserData()
    }

  }, [user])


  return (
    <GlobalContext.Provider 
      value={{
        user,
        setUser,
        quizToUpdate,
        setQuizToUpdate,
        userQuiz,
        setUserQuiz,
        fetchUserData,
        quizList,
        setQuizList,
        fetchQuizList,
        quizPage,
        setQuizPage
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}