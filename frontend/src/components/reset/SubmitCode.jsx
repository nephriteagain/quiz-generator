export default function SubmitCode({showCodeInput, setShowCodeInput}) {

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData)
    console.log(userData)
  }

  return (
    <div>
      <form className="mt-8"
        onSubmit={handleSubmit}
      >
        <label htmlFor="code"
          className="text-sm font-semibold"
        >
          code
        </label>
        <input type="text" name="code" required
          className='block mt-2 mb-4 min-w-[50%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-4 py-1 text-sm'
        />
        <input type="submit" value='submit' 
          className="bg-green-300 rounded-md px-3 py-1 text-sm shadow-md drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100"
        />
      </form>
    </div>
  )
}