import { useGlobalContext } from "../../context/UserContext"

function Welcome() {
  const { user } = useGlobalContext()

  const firstNameCamel = user?.firstName.split('').map((char, index) => {
    if (index === 0 ) {
      return char.toUpperCase()
    }
    return char
  }).join('')

  const lastNameCamel = user?.lastName.split('').map((char, index) => {
    if (index === 0 ) {
      return char.toUpperCase()
    }
    return char
  }).join('')

  if (user) return (
    
    <div className="absolute top-4 left-4">
      {`Welcome!, ${firstNameCamel} ${lastNameCamel}`}
    </div>
  )
}

export default Welcome