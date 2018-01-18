const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'questions',
    required: true
  },
  content: {
    type: String,
    required: true
  },
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

const answerModel = mongoose.model('answers', answerSchema)
module.exports = answerModel