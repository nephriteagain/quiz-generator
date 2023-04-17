const mongoose = require('mongoose')

const PasswordResetSchema = new mongoose.Schema({
  codeId: {
    type : String,
    unique: true,
    required: true
  },
  code: {
    type: String,
    required: true,    
  },
  email: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    default: new Date(),
    index: { expires: '5m' } // expire documents after 1 minute
  }
})

module.exports = mongoose.model('Password_Reset', PasswordResetSchema)