const { Router }  = require('express')
const mongoose = require('mongoose')
const Quiz = require('../../db/Schema/QuizSchema')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allQuizzes = await Quiz.find()
        const dataToSend = allQuizzes.map((item) => {
          const {_id, title, createdBy} = item
          return {_id, title, createdBy}
        })
        res.send(dataToSend)
    } catch (error) {
        res.send(error)
    }
    
})


router.get('/quiz/:id', async (req, res) => {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const quiz = await Quiz.findOne({_id: id})
            res.send(quiz)
        } catch (error) {
            res.send(error)
        }
    } else {
        res.send({message: 'Invalid ID'})
    }
})



router.post('/', async (req, res) => {
    const quiz = new Quiz(req.body)
    try {
        await Quiz.create(quiz) 
        res.send(quiz)
    } catch (error) {
        res.send(error)
    }
    
})

// fix this
router.post('/quiz/:id', async (req, res) => {
  const id = req.params.id
  const answeredQuestions = req.body.questions

  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const quiz = await Quiz.findOne({_id: id})
      const quizQuestions = [...quiz.questions]

      let checkedQuizQuestion = []
      quizQuestions.forEach((item, index) => {
        if (item.correctAnswer === answeredQuestions[index].correctAnswer) {
          checkedQuizQuestion.push(
            {
              ...answeredQuestions[index],
              userAnswer: answeredQuestions[index].correctAnswer,
              userCorrect: true, 
              options: item.options
            }
          )
        } else {
         checkedQuizQuestion.push(
            {
              ...answeredQuestions[index],
              userAnswer: answeredQuestions[index].correctAnswer,
              userCorrect: false,            
              correctAnswer: item.correctAnswer, 
              options: item.options,
            } 
          )
        }
      })
  

      res.send(checkedQuizQuestion)
    } catch (error) {
        res.send({message: 'error'})
    }
} else {
    res.send({message: 'Invalid ID'})
}
})

router.post('/delete', async (req, res) => {
  const id = req.body.id

  // if invalid id response 400
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send(400)
  }

  const deletedQuiz = await Quiz.findByIdAndDelete(id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
  
})

// add a auth middleware here, use req.session.user.id and req.params
router.post('/update/:id', async(req, res) => {
  const quizId = req.body._id

  const updatedQuiz =  Quiz.findByIdAndUpdate(quizId, req.body)
    .then(response => {
      res.send(response)
    })
    .catch(err => res.send(err))
})

module.exports = router