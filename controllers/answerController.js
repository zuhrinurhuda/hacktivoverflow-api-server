const Answer = require('../models/answerModel')

class AnswerController {
  static create (req, res) {
    let newAnswer = new Answer({
      author: req.body.author, // req.decoded._id,
      question: req.body.question,
      content: req.body.content
    })

    newAnswer.save()
    .then(newAnswer => res.status(200).json({
      message: 'Success create new answer',
      newAnswer: newAnswer
    }))
    .catch(err => res.status(500).send(err))
  }

  static findAll (req, res) {
    Answer.find()
    .populate(['author', 'question'])
    .then(answers => res.status(200).json({
      message: 'Success find all answers',
      answers: answers
    }))
    .catch(err => res.status(500).send(err))
  }

  static findById (req, res) {
    Answer.findById(req.params.id)
    .then(answer => res.status(200).json({
      message: 'Success find answer',
      answer: answer
    }))
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    Answer.findById(req.params.id)
    .then(answer => {
      answer.content = req.body.content || answer.content
      answer.save()
      .then(newAnswerData => res.status(200).json({
        message: 'Success update data answer',
        updatedAnswer: newAnswerData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static delete (req, res) {
    Answer.findByIdAndRemove(req.params.id)
    .then(result => res.status(200).json({
      message: 'Success delete answer',
      deletedAnswer: result
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = AnswerController