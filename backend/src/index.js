const express = require('express')
const cors = require('cors')
const IndexRouter = require('./routes/v1/index')

const app = express()
const PORT = "3000"
require('./db/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())



app.use("/api/v1", IndexRouter)

app.listen(PORT, () => console.log(`connected to post ${PORT}`))
