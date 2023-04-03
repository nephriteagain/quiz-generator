const { Router }  = require('express')
const mongoose = require('mongoose')
const Quiz = require('../../db/Schema/QuizSchema')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allQuizzes = await Quiz.find()
        res.send(allQuizzes)
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

module.exports = router