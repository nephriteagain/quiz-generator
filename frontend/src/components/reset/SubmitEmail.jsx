import { useState, useEffect, useRef } from "react"


export default function SubmitEmail({showCodeInput, setShowCodeInput, timer, setTimer}) {
  const [ showResendTimer, setShowResendTimer ] = useState(false)
  const [ showForm, setShowForm ] = useState(true)

  const resendRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData)
    console.log(userData)
    setShowResendTimer(true)
    setShowForm(false)
    setShowCodeInput(true)
  }

  function showResetForm() {
    if (timer === 0) {
      setShowForm(true)
      setTimer(60)
      setShowResendTimer(false)
      setShowCodeInput(false)
    }
  }

  useEffect(() => {
    if (!showResendTimer) return
  
    const countDown = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)
  
    if (timer === 0) {
      resendRef.current.style.color = 'blue'
      clearInterval(countDown)
      return
    }
    
    return () => clearInterval(countDown)
  }, [showResendTimer, timer])
  

  return (
    <>
    { showForm &&
      <form className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
        >
        <label htmlFor="email"
          className="font-semibold"
          >
          email
        </label>
        <input type="email" name='email' required
          className="block mt-2 mb-4 min-w-[80%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-2 py-1 text-sm"
          />
        <input type="submit" value='send code' 
          className="bg-green-300 rounded-md px-3 py-1 text-sm shadow-md drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100"
          />
      </form>
      }
      { showResendTimer &&
      <div>
        <p className="text-sm">
          <span className="opacity-80">
            did not receive code? 
          </span>
          <span
          ref={resendRef}
            className="text-red-400 cursor-pointer"
            onClick={showResetForm}
          > resend in {timer}</span>
        </p>
      </div>
      }
      </>
  )
}
