import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'

import Version from './components/Version'
import Home from './pages/Home'
import Create from './pages/Create'
import Quiz from './pages/Quiz'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'


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
        <Route path='/user/signin' element={<SignIn />} />
        <Route path='/user/signup' element={<SignUp />} />
      </Routes>
    </Router>
    <Version />
    </>
  )
}

export default App
