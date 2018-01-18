const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  slugs: String,
  upVoters: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  downVoters: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

const questionModel = mongoose.model('questions', questionSchema)
module.exports = questionModel