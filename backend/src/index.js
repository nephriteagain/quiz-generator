const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

const QuizRouter = require('./routes/v1/quiz')
const UserRouter = require('./routes/v1/user')
const ProfileRouter = require('./routes/v1/profile')

const app = express()
const PORT = "3000"
require('./db/index')

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 86_400_000},
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })    
}))

app.use((req, res, next) => {
  console.log(req.session.user)
  next()
})


app.use("/api/v1", QuizRouter)
app.use("/api/v1/user", UserRouter)
app.use('/api/v1/profile', ProfileRouter)

app.listen(PORT, () => console.log(`connected to post ${PORT}`))
