import axios from 'axios'
import { useGlobalContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function SignOut() {

  const navigate = useNavigate()

  const { user, setUser } = useGlobalContext()

  function logOut() {  
    axios.get('http://localhost:3000/api/v1/user/signout', {withCredentials: true})
      .then(res => {
        console.log(Cookies.remove("connect.sid", {
          path: '/signin',
          domain: 'http://localhost:5173'
        }))

        const data = res.data
        if (data.value === null) {
          setUser(null)
          navigate('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <button onClick={logOut}
        className='text-md px-3 py-1 bg-blue-100  rounded-xl text-stone-500 shadow-md drop-shadow-md hover:scale-110 active:scale-90 transition-all duration-75'
      >
        Log Out
      </button>
    </div>
  )
}

export default SignOut