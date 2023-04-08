import axios from "axios"
import { useGlobalContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

function SignIn() {
  const { setUser } = useGlobalContext()

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData)


    axios.post('http://localhost:3000/api/v1/user/signin',  userData, {withCredentials: true} )
      .then(res => {
        const data = res.data
        if (data.message === 'logged in' || data.message === 'already logged in') {
          setUser(data.userData)
          navigate('/')
        }
      })
      .catch(err => console.log(err.message))
  }

  return (
    <div className="mx-auto max-w-[500px]">
      <h1 className="text-4xl font-bold mt-10 mb-16">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="font-semibold text-lg">
            Email
          </label>
          <input className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[90%] max-w-[400px] focus:bg-blue-200"
            type="email" 
            name='email' 
            required
          />
        </div>
        <div>
        <label htmlFor="password" className="font-semibold text-lg">
          Password
        </label>
        <input className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[90%] max-w-[400px] focus:bg-blue-200"
          type="password" 
          name="password" 
          required 
        />
        </div>
        <div>
          <input className="px-3 py-1 bg-green-300 shadow-md drop-shadow-md rounded-md text-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-75 "
            type="submit"
            value='LOG IN'
          />

        </div>
      </form>
    </div>
  )
}

export default SignIn