const { Router } = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')


const User = require('../../db/Schema/UserSchema')
const Password_Reset = require('../../db/Schema/PasswordResetSchema')

const { hashPassword, comparePassword } = require('../../../lib/utils/helper')
const { generateCode, generateRandomString } = require('../../../lib/utils/codeGenerator')
require('dotenv').config()

const router = Router()

router.get('/session', async (req, res) => {
  try {
    if (req.session.user) {
      const userId = req.session.user.id
      const user = await User.findById(userId, {firstName: 1, lastName: 1, email: 1, _id: 1})
      const { firstName, lastName, email, _id } = user
      res.status(200).send({
        session: true,
        user: {
          firstName,
          lastName,
          email,
          id: _id
        }
      })

    } else {
      res.status(200).send({session: false})
    }
  } catch (error) {
    res.status(500).send(error)
  }
  
})


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

  // incorrect email
  if (!user) {
    res.status(400).send({message: 'incorrect password'})
    return
  }

  const passwordMatched = comparePassword(req.body.password, user.password)
  if (passwordMatched) {
    const { _id, firstName, lastName, email } = user

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
    res.status(400).send({message: 'incorrect password'})
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

router.post('/reset', async (req, res) => {
  if (!req.body?.email) {
    return res.status(400).send({message: 'provide email address'})
  }
  
  const { email } = req.body  
  
    
    const newCode = generateCode()
    const codeId = generateRandomString()

    try {
      


      let config = {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      }
    
      let transporter = nodemailer.createTransport(config)
    
      let message = {
        from: process.env.EMAIL,
        to: email,
        subject: "quiz generator password reset",
        html: `<p>password rest code: ${newCode}</p>`
      }
    

      const newPassCodeReset = new Password_Reset({code: newCode, codeId: codeId})      
      // const codeId = await Password_Reset.create(newPassCodeReset)

      if (!req.cookies?.code) {
        await Promise.all([
          transporter.sendMail(message),
          Password_Reset.create(newPassCodeReset)
        ])
          .then(() => {
            res.cookie('code', codeId, {maxAge: 300_000, httpOnly: true})
            res.status(201).send({message: 'reset code sent to email'})
            return
          })
          .catch((err) => {
            res.status(500).send({err})
          })
      } else {
        const cookieCodeId = req.cookies.code

        await Promise.all([
          transporter.sendMail(message),
          Password_Reset.findOneAndUpdate({codeId: cookieCodeId}, {code: newCode})
        ])
        .then(() => {          
          res.status(201).send({message: 'reset code sent to email'})
          return
        })
        .catch((err) => {
          res.status(500).send({err})
        })

      }
      


    } catch (error) {
      res.status(500).send({error})
    }
    
  


    
})




module.exports = router