import axios from "axios"



function SubmitModal({formData, setFormData ,setShowSubmitModal}) {


  function submitData() {
    axios.post(`http://localhost:3000/api/v1/`, formData)
      .then((res) => {
        console.log(res.data)
        const title = document.querySelector('.title')

        title.value = ''

        setFormData({})
      })
      .catch((err) => console.log(err))
      setShowSubmitModal(false)
  }

  function cancelSubmit() {
    setShowSubmitModal(false)
  }

  return (
    <div className="absolute top-0 left-0 z-[2] w-[100vw] h-[100vh]">
      <div className="absolute bg-black opacity-70 z-[3] w-[100vw] h-[100vh]">

      </div>
      <div className="min-w-[350px] min-h-[250px] absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 px-4 py-4 bg-slate-200 z-[4] rounded-xl">
        <h1 className="text-5xl text-center font-bold mt-6">
          Save Quiz
        </h1>
        <div className="w-full flex mt-[80px]">
        <button onClick={submitData}
          className="bg-blue-200 text-3xl px-2 py-1 rounded-md ms-auto me-4 shadow-md drop-shadow-md hover:text-white hover:bg-blue-600 transition-all duration-100"
        >
          Confirm
        </button>
        <button onClick={cancelSubmit}
          className="bg-orange-200 text-3xl px-2 py-1 rounded-md me-auto ms-4 shadow-md drop-shadow-md hover:text-white hover:bg-orange-400 transition-all duration-100"

        >
          Cancel
        </button>
        </div>
        
      </div> 
    </div>
  )
}

export default SubmitModal