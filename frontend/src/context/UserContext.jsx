import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ quizToUpdate, setQuizToUpdate] = useState({})
  const [ userQuiz, setUserQuiz ] = useState([])
  const [quizList, setQuizList] = useState([])
  

  async function fetchData () {
    await axios.get(`http://localhost:3000/api/v1/profile/${user.id}`, {withCredentials: true})
      .then((res) => {
        setUserQuiz(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  async function fetchQuizList() {
    await axios.get(`http://localhost:3000/api/v1/`, {withCredentials: true})
      .then((response) => {
        setQuizList(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    fetchQuizList()
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
      fetchData()
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
        fetchData,
        quizList,
        setQuizList,
        fetchQuizList
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}