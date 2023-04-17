import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from "../../context/UserContext"

export default function SubmitNewPass({_id, email, setShowCodeInput, set_Id, setEmail}) {
  const [ password, setPassword ] = useState('')
  const [ confirmPass, setConfirmPass ] = useState('')

  const { setShowPassResetForm } = useGlobalContext()
  
  let navigate = useNavigate()



  async function handleSubmit(e) {
    e.preventDefault()
    console.log({_id, email, password})
    axios.post(
      'http://localhost:3000/api/v1/reset/confirm',
      { _id, email, password },
      {withCredentials: true}
    )
      .then(res => {
        if (res.status === 201) {
          setShowPassResetForm(false)
          setShowCodeInput(false)          
          set_Id(null)
          setEmail(null)
          navigate('/user/signin')
        }
      })
      .catch(err => {
        console.log(err)
      })
    
      
    
  }


  return (
    <div onSubmit={handleSubmit}>
      <form className="mb-8">
        <label htmlFor="password"
          className="text-sm font-semibold"
        >
          new password
        </label>
        <input type="password" name="password" value={password} required
          className="block mt-2 mb-4 min-w-[80%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-2 py-1 text-sm"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="newPassword"
          className="text-sm font-semibold"
        >
          confirm new password
        </label>
        <input type="password" name="newPassword" value={confirmPass} required
          className="block mt-2 mb-4 min-w-[80%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-2 py-1 text-sm"          
          onChange={(e) => setConfirmPass(e.currentTarget.value)}
        />
        <input type="submit" value='change password' 
          className="bg-green-300 rounded-md px-3 py-1 text-sm shadow-md drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100"
          />
      </form>
    </div>
  )
}