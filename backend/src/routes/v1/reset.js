const { Router } = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')


const User = require('../../db/Schema/UserSchema')
const Password_Reset = require('../../db/Schema/PasswordResetSchema')

const { hashPassword, comparePassword } = require('../../../lib/utils/loginHelper')
const { generateCode, generateRandomString } = require('../../../lib/utils/codeGenerator')
require('dotenv').config()

const router = Router()

router.post('/', async (req, res) => {
  if (!req.body?.email) {
    return res.status(400).send({message: 'provide email address'})
  }
  
  const { email } = req.body  
  
    
  const newCode = generateCode()
  const codeId = generateRandomString()

  try {
    const isEmailExist = await User.findOne({email: email})
    
    if (!isEmailExist) {
      return res.status(400).send({message: 'incorrect email'})
    }
  } catch (error) {
    return res.status(500).send({error})
  }
  
  
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
  

    const newPassCodeReset = new Password_Reset({
      code: hashPassword(newCode), 
      codeId: codeId, 
      email: email
    })      

    if (!req.cookies?.codeId) {
      await Promise.all([
        transporter.sendMail(message),
        Password_Reset.create(newPassCodeReset)
      ])
        .then(() => {
          res.cookie('codeId', codeId, {maxAge: 300_000, httpOnly: true})
          res.status(201).send({message: 'reset code sent to email'})
          return
        })
        .catch((err) => {
          res.status(500).send({err})
        })
    } else {
      const cookieCodeId = req.cookies.codeId

      await Promise.all([
        transporter.sendMail(message),
        Password_Reset.findOneAndUpdate(
          {codeId: cookieCodeId}, 
          {code: hashPassword(newCode)}
        )
      ])
      .then((response) => {          
        console.log(response)
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

router.post('/verify', async (req, res) => {
  
  if (!req.body?.code || !req.cookies?.codeId) {
    res.status(400).send({message: 'missing credentials'})
  }

  const { code } = req.body
  const { codeId } = req.cookies
  
  try {

    const requestTicket = await Password_Reset.findOne({codeId: codeId})

    if (!requestTicket) {
      res.status(400).send('incorrect credentials')
    } else {
      const codeMatched = comparePassword(code, requestTicket.code)
      if (codeMatched) {
        res.status(200).send({message: 'code matched'})
      } else {
        res.status(400).send({message: 'code not matched'})
      }
    }

  } catch (error) {
    res.status(500).send(error)
  }
  

})

module.exports = router