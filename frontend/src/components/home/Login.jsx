import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  function handleSignIn() {
    return navigate('/user/signin')
  }

  function handleSignUp() {
    return navigate('/user/signup')
  }

  return (
    <section className="absolute top-4 right-4"> 
      <button onClick={handleSignIn}
        className="me-4 px-2 py-1  bg-blue-200 shadow-md rounded-md text-lg drop-shadow-md hover:scale-110 hover:bg-blue-300 active:scale-95 transition-all duration-75"
      >

        Sign In
      </button>
      <button onClick={handleSignUp}
        className="me-4 px-2 py-1  bg-indigo-200 shadow-md rounded-md text-lg drop-shadow-md hover:scale-110 hover:bg-indigo-300 active:scale-95 transition-all duration-75"
      >
        Sign Up
      </button>
      {/* <button>
        Logout
      </button> */}
    </section>
  )
}

export default Login