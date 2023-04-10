import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ quizToUpdate, setQuizToUpdate] = useState({})
  
  return (
    <GlobalContext.Provider 
      value={{
        user,
        setUser,
        quizToUpdate,
        setQuizToUpdate
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}