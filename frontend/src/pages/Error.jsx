import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Error() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  },[])

  return (
    <div>
      Go Back!!!
    </div>
  )
}

export default Error