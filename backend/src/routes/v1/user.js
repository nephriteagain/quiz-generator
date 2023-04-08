const { Router } = require('express')
const mongoose = require('mongoose')
const User = require('../../db/Schema/UserSchema')

const router = Router()

router.post('/signup', async (req, res) => {
  if (req.body.password !== req.body.confirmPass) {
   res.send(400) 
  }

  const {firstName, lastName, email, password} = req.body

  const user = new User(
    {firstName, lastName, email, password}
  )

  try {
    await User.create(user)
    res.send(user)  
} catch (error) {
    res.send(error)
}
})


module.exports = router