const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    typeof: String,
    required: true
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date()
  }

})

module.exports = mongoose.model('User', UserSchema)