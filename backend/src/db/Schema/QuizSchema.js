const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true
            },
            options: [
                {
                    type: String,
                    required: true
                }
            ],
            correctAnswer: {
                type: String,
                required: true
            }
        }
    ]
})


module.exports = mongoose.model('Quiz', QuizSchema)