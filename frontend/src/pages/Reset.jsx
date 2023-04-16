function Reset() {

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData)
    console.log(userData)
  }

  return (
    <div>
      <form className="max-w-[400px] min-w-[250px] h-[300px] bg-blue-100 mx-auto mt-20 rounded-xl px-4 py-4 shadow-md drop-shadow-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="email"
        >
          enter your email
        </label>
        <input type="email" name='email'
          className="block mt-2"
        />
        <input type="submit" value='submit' />
      </form>
    </div>
  )
}

export default Reset