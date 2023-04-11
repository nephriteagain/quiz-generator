const { Router } = require('express')
const mongoose = require('mongoose')
const User = require('../../db/Schema/UserSchema')
const { hashPassword, comparePassword } = require('../../../lib/utils/helper')

const router = Router()

router.post('/signup', async (req, res) => {
  if (req.body.password !== req.body.confirmPass) {
   res.status(401).send({message: 'password does not match'})
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
    res.status(201).send(user)  
} catch (error) {
    res.status(500).send(error)
}
})


router.post('/signin', async (req, res) => {
  if (!req.body.password || !req.body.email) {
    res.status(400).send({message: 'missing credentials'})
  }
  const user = await User.findOne({email: req.body.email})
  const passwordMatched = comparePassword(req.body.password, user.password)
  if (passwordMatched) {
    const { firstName, lastName, email, _id } = user

    if (!req.session.user) {
      req.session.user = {
        id: _id,
        email: email
      }
      res.status(200).send({
        message: 'logged in',
        userData: {
          firstName,
          lastName,
          email,
          id: _id
        }
      })
    } else {
      res.status(200).send({
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
    res.status(400).send({message: 'incorrect email or password'})
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
      res.status(200).send(userSession)
    }
  })


})


module.exports = router