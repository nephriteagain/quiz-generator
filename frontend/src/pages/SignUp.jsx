function SignUp() {

  function handleSubmit(e) {
    e.preventDefault()

    let formData = new FormData(e.currentTarget)
    formData = Object.fromEntries(formData)

    console.log(formData)
  }

  return (
    <div>
        <h1>
          Create a New Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input type="email" name="email" required/>
          </div>
          <div>
            <label htmlFor="firstName">
              First Name
            </label>
            <input type="text" name="firstName" required/>
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name
            </label>
            <input type="text" name="lastName" required/>
          </div>
          <div>
            <label htmlFor="password">
              Password
            </label>
            <input type="password" name="password" required/>
          </div>
          <div>
            <label htmlFor="confirmPass">
              Confirm Password
            </label>
            <input type="password" name="confirmPass" required/>
          </div>
          <div>
            <input type="submit" value='create' />
          </div>
        </form>
      <form>
      </form>
    </div>
  )
}

export default SignUp