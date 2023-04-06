import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'

import Home from './pages/Home'
import Create from './pages/Create'
import Quiz from './pages/Quiz'
import Version from './components/Version'

import './App.css'

function App() {
  const [quizList, setQuizList] = useState([])
  let { quizId } = useParams()
  

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home quizList={quizList} setQuizList={setQuizList}/>}/>
        <Route path='/create' element={<Create />} />
        <Route path='/quiz/:quizId' element={<Quiz quizList={quizList}/>}/>
      </Routes>
    </Router>
    <Version />
    </>
  )
}

export default App
