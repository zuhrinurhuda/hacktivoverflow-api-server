const Question = require('../models/questionModel')

class QuestionController {
  static create (req, res) {
    let newQuestion = new Question({
      title: req.body.title,
      content: req.body.content,
      author: req.decoded._id,
      slugs: req.body.slugs
    })

    newQuestion.save()
    .then(newQuestion => res.status(200).json({
      message: 'Success create new question',
      newQuestion: newQuestion
    }))
    .catch(err => res.status(500).send(err))
  }

  static findAll (req, res) {
    Question.find()
    .populate(['author'])
    .sort({ createdAt: 'desc' })
    .then(questions => res.status(200).json({
      message: 'Success find all questions',
      questions: questions
    }))
    .catch(err => res.status(500).send(err))
  }

  static findById (req, res) {
    Question.findById(req.params.id)
    .populate(['author'])
    .sort({ date: 'desc' })
    .then(question => res.status(200).json({
      message: 'Success find question',
      question: question
    }))
    .catch(err => res.status(500).send(err))
  }

  static upVote (req, res) {
    Question.findById(req.params.id)
    .then(question => {
      let userUpVoteIndex = question.upVoters.findIndex(element => element == req.decoded._id)
      let userDownVoteIndex = question.downVoters.findIndex(element => element == req.decoded._id)

      if (userUpVoteIndex === -1 && userDownVoteIndex === -1) { // false && false
        question.upVoters.push(req.decoded._id)
      } else if (userUpVoteIndex === -1 && userDownVoteIndex !== -1) { // false && true
        question.downVoters.splice(userDownVoteIndex, 1)
        question.upVoters.push(req.decoded._id)
      } else if (userUpVoteIndex !== -1 && userDownVoteIndex === -1) { // true && false
        question.upVoters.splice(userUpVoteIndex, 1)
      }

      question.save()
      .then(newQuestionData => res.status(200).json({
        message: 'Success vote question',
        updatedQuestion: newQuestionData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static downVote(req, res) {
    Question.findById(req.params.id)
    .then(question => {
      let userUpVoteIndex = question.upVoters.findIndex(element => element == req.decoded._id)
      let userDownVoteIndex = question.downVoters.findIndex(element => element == req.decoded._id)

      if (userDownVoteIndex === -1 && userUpVoteIndex === -1) { // false && false
        question.downVoters.push(req.decoded._id)
      } else if (userDownVoteIndex === -1 && userUpVoteIndex !== -1) { // false && true
        question.upVoters.splice(userUpVoteIndex, 1)
        question.downVoters.push(req.decoded._id)
      } else if (userDownVoteIndex !== -1 && userUpVoteIndex === -1) { // true && false
        question.downVoters.splice(userDownVoteIndex, 1)
      }

      question.save()
      .then(newQuestionData => res.status(200).json({
        message: 'Success vote question',
        updatedQuestion: newQuestionData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    Question.findById(req.params.id)
    .then(question => {
      question.title = req.body.title || question.title
      question.content = req.body.content || question.content
      question.slugs = req.body.slugs || question.slugs
      question.save()
      .then(newQuestionData => res.status(200).json({
        message: 'Success update data question',
        updatedQuestion: newQuestionData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static delete (req, res) {
    Question.findById(req.params.id)
      .then(question => {
        if (question.author == req.decoded._id) {
          Question.findByIdAndRemove(req.params.id)
          .then(result => res.status(200).json({
            message: 'Success delete question',
            deletedQuestion: result
          }))
          .catch(err => res.status(500).send(err))
        } else {
          res.status(403).send('Forbidden')
        }
      })
      .catch(err => res.status(500).send(err))
  }
}

module.exports = QuestionController