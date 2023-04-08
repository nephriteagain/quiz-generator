import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'
import { useState } from 'react'
import { useGlobalContext } from './context/UserContext'

import Version from './components/Version'
import Home from './pages/Home'
import Create from './pages/Create'
import Quiz from './pages/Quiz'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Error from './pages/Error'

import './App.css'

function App() {
  const [quizList, setQuizList] = useState([])

  const { user } = useGlobalContext()
  let { quizId } = useParams()
  

  return (
    <>

    <Router>
      <Routes>
        <Route exact path='/' element={<Home quizList={quizList} setQuizList={setQuizList}/>}/>
        { user && <Route path='/create' element={<Create />} /> }
        <Route path='/quiz/:quizId' element={<Quiz quizList={quizList}/>}/>
        <Route path='/user/signin' element={<SignIn />} />
        <Route path='/user/signup' element={<SignUp />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
    <Version />
    </>
  )
}

export default App
