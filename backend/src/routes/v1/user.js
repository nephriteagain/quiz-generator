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
      email, 
      firstName: firstName.toLowerCase(), 
      lastName: lastName.toLowerCase(), 
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
    const { firstName, lastName, email, _id } = user

    if (!req.session.user) {
      req.session.user = {
        id: user._id
      }
      res.send({
        message: 'logged in',
        userData: {
          firstName,
          lastName,
          email,
          id: _id
        }
      })
    } else {
      res.send({
        message: 'already logged in',
        userData: {
          firstName,
          lastName,
          email,
          id: _id
        }
      })
    }
    
  } else {
    res.send({message: 'incorrect email or password'})
  }
})


router.get('/signout', async (req, res) => {
  const db = mongoose.connection
  const sessionDb = db.collection('sessions')
  const userSession = await sessionDb.findOneAndDelete({_id: req.sessionID})
  req.session.destroy(err => {
    if (err) {
      console.log(err)
      res.status(500).send(userSession)
    } else {
      res.clearCookie('connect.sid')
      res.send(userSession)
    }
  })


})


module.exports = router