const { Router } = require('express')
const mongoose = require('mongoose')
const User = require('../../db/Schema/UserSchema')

const router = Router()

router.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await Quiz.create(user)
    res.send(user)
} catch (error) {
    res.send(error)
}
})


module.exports = router