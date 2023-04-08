import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [ user, setUser ] = useState(null)

  
  return (
    <GlobalContext.Provider 
      value={{
        user,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}