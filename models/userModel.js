const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  }
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel