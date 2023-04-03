import { useEffect, useState } from 'react'
import { Link  } from "react-router-dom"
import axios from 'axios'

import Answer from "../components/quiz/Answer"


function Quiz({quizList}) {
  const [data, setData] = useState({})

  useEffect(() => {
    const url = document.URL;
    const regex = /quiz\/(.+)/;
    const match = url.match(regex);
    const captureString = match[1];

    axios.get(`http://localhost:3000/api/v1/quiz/${captureString}`)
      .then(response => {
        let data = response.data
        console.log(data, 'data')
        let questions = data.questions
        questions = questions.map((item) => {
          const {questionText, options, _id} = item
          return {questionText, options}
        })
        data.questions = questions
        setData(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
    <Answer data={data} setData={setData}/>
    <Link to="/">Back To Home</Link>
    </>
  )
}

export default Quiz