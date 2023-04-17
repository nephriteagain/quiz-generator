import { useState } from 'react'

import SubmitCode from '../components/reset/SubmitCode'
import SubmitEmail from '../components/reset/SubmitEmail'

import { useGlobalContext } from '../context/UserContext'

function Reset() {

  const [ showCodeInput, setShowCodeInput ] = useState(false)

  const { timer, setTimer, showPassResetForm, setShowPassResetForm } = useGlobalContext()

  return (
    <div className="max-w-[400px] min-w-[250px] h-[300px] bg-stone-50 mx-auto mt-20 rounded-xl px-8 py-8 shadow-md drop-shadow-lg">
    { !showPassResetForm &&
      <>
      <SubmitEmail showCodeInput={showCodeInput} setShowCodeInput={setShowCodeInput} timer={timer} setTimer={setTimer}/>
      { showCodeInput && <SubmitCode showCodeInput={showCodeInput} setShowCodeInput={setShowCodeInput} />}
      </>
    }
    </div>
  )
}

export default Reset