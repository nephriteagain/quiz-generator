import { useState, useEffect } from "react"
import axios from "axios"
import { AiOutlineCheck } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'


import {
  matchPasswordChecker,
  passwordLengthChecker,
  passwordCharacterChecker,
  specialSymbolChecker
} from '../lib/helper/signUpFormChecker'

function SignUp() {
  const [ password, setPassword ] = useState('')
  const [ confirmPass, setConfirmPass ] = useState('')

  const [ samePassword, setSamePassword ] = useState(false)
  const [ digitBool, setDigitBool ] = useState(false)
  const [ symbolBool, setSymbolBool ] = useState(false)
  const [ hasNoSpecialSymbolBool, sethasNoSpecialSymbolBool ] = useState(false)


  function handleSubmit(e) {
    e.preventDefault()

    if ( !samePassword || !digitBool || !symbolBool || !hasNoSpecialSymbolBool) {
      return
    }


    let formData = new FormData(e.currentTarget)
    formData = Object.fromEntries(formData)    


    axios.post('http://localhost:3000/api/v1/user/signup', formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {

    matchPasswordChecker(password, confirmPass, setSamePassword)
    passwordLengthChecker(password, setDigitBool)
    passwordCharacterChecker(password, setSymbolBool)
    specialSymbolChecker(password, sethasNoSpecialSymbolBool)

  }, [password, confirmPass])

  return (
    <div className="mx-auto max-w-[500px]">
        <h1 className="text-4xl font-bold mt-10 mb-16">
          Create a New Account
        </h1>
        <form onSubmit={handleSubmit}           
        >
          <div>
            <label htmlFor="email" className="font-semibold text-lg">
              Email
            </label>
            <input type="email" name="email" required 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[90%] max-w-[400px] focus:bg-blue-200"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="font-semibold text-lg">
              First Name
            </label>
            <input type="text" name="firstName" required 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[90%] max-w-[400px] focus:bg-blue-200"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="font-semibold text-lg">
              Last Name
            </label>
            <input type="text" name="lastName" required 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[90%] max-w-[400px] focus:bg-blue-200"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="font-semibold text-lg">
              Password
            </label>
            <input 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[90%] max-w-[400px] focus:bg-blue-200 relative"
              type="password" 
              name="password" 
              required
              onChange={(e) => setPassword(e.currentTarget.value)}          
            />
          </div>
          <div className="relative">
            <label htmlFor="confirmPass" className="font-semibold text-lg">
              Confirm Password
            </label>
            <input 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[90%] max-w-[400px] focus:bg-blue-200"
              type="password" 
              name="confirmPass" 
              required
              onChange={(e) => setConfirmPass(e.currentTarget.value)}
      
            />
          </div>
            {
            samePassword ?
            <div className="text-green-600">
              <AiOutlineCheck className="inline me-4"/>
              Pasword Matched
            </div> :
            <div 
              className="text-red-600"
            >
              <RxCross2 className="inline me-4"/>
              Password Don't Matched
            </div>
          }
          {
            digitBool ?
            <div className="text-green-600">
              <AiOutlineCheck className="inline me-4"/>
              Pasword Must Be At Least 6 Characters
            </div> :
            <div 
              className="text-red-600"
            >
              <RxCross2 className="inline me-4"/>
              Pasword Must Be At Least 6 Characters
              
            </div>
          }
          {
            symbolBool ?
            <div className="text-green-600">
              <AiOutlineCheck className="inline me-4"/>
              Pasword Must Contain Characters A-Z a-z 0-9
            </div> :
            <div 
              className="text-red-600"
            >
              <RxCross2 className="inline me-4"/>
              Pasword Must Contain Characters A-Z a-z 0-9              
            </div>
          }
          {
            !hasNoSpecialSymbolBool &&
            <div 
              className="text-red-600"
            >
              <RxCross2 className="inline me-4"/>
              Pasword Must Not Contain a Special Symbol or Whitespace
            </div>
          }
          <div>
            <input type="submit" value='Submit'
              className="px-2 py-1 bg-green-300 rounded-lg drop-shadow-md hover:scale-110 mt-4"
            />
          </div>
        </form>
        
    </div>
  )
}

export default SignUp