const { Router } = require('express')
const mongoose = require('mongoose')
const Quiz = require('../../db/Schema/QuizSchema')

const router = Router()

router.use( '/:id', (req, res, next) => {
  if (!req.params?.id) {
    res.send(400)
  }
  
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send({message: 'invalid id'})
  }
  next()
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const allUserQuiz = await Quiz.find({authorId: id})
    res.send(allUserQuiz)

  } catch (error) {
    res.send(error)
  }
   
})

module.exports = router