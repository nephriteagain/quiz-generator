const express = require('express')
const cors = require('cors')

const QuizRouter = require('./routes/v1/quiz')
const UserRouter = require('./routes/v1/user')

const app = express()
const PORT = "3000"
require('./db/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())



app.use("/api/v1", QuizRouter)
app.use("/api/v1/user", UserRouter)

app.listen(PORT, () => console.log(`connected to post ${PORT}`))
