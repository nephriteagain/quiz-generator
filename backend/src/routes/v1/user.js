const { Router } = require('express')
const mongoose = require('mongoose')
const User = require('../../db/Schema/UserSchema')
const { hashPassword, comparePassword } = require('../../../lib/utils/helper')

const router = Router()

router.post('/signup', async (req, res) => {
  if (req.body.password !== req.body.confirmPass) {
   res.send(400) 
  }

  const {firstName, lastName, email, password} = req.body

  const user = new User(
    {
      firstName, 
      lastName, 
      email, 
      password: hashPassword(password)
    }
  )

  try {
    await User.create(user)
    res.send(user)  
} catch (error) {
    res.send(error)
}
})

router.post('/signin', async (req, res) => {
  if (!req.body.password || !req.body.email) {
    res.send(400)    
  }
  const user = await User.findOne({email: req.body.email})
  const passwordMatched = comparePassword(req.body.password, user.password)
  if (passwordMatched) {
    res.send({message: 'you are logged in'})
  } else {
    res.send({message: 'incorrect email or password'})
  }


})


module.exports = router