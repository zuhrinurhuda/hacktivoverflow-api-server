const Answer = require('../models/answerModel')

class AnswerController {
  static create (req, res) {
    let newAnswer = new Answer({
      author: req.decoded._id,
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

  static findByQuestionId (req, res) {
    Answer.find({ question: req.params.id })
    .populate(['author'])
    .then(answers => res.status(200).json({
      message: 'Success find all answers',
      answers: answers
    }))
    .catch(err => res.status(500).send(err))
  }

  static findAll (req, res) {
    Answer.find()
    .populate(['author'])
    .then(answers => res.status(200).json({
      message: 'Success find all answers',
      answers: answers
    }))
    .catch(err => res.status(500).send(err))
  }

  static findById (req, res) {
    Answer.findById(req.params.id)
    .populate(['author'])
    .then(answer => res.status(200).json({
      message: 'Success find answer',
      answer: answer
    }))
    .catch(err => res.status(500).send(err))
  }

  static upVote(req, res) {
    Answer.findById(req.params.id)
    .then(answer => {
      let userUpVoteIndex = answer.upVoters.findIndex(element => element == req.decoded._id)
      let userDownVoteIndex = answer.downVoters.findIndex(element => element == req.decoded._id)

      if (userUpVoteIndex === -1 && userDownVoteIndex === -1) { // false && false
        answer.upVoters.push(req.decoded._id)
      } else if (userUpVoteIndex === -1 && userDownVoteIndex !== -1) { // false && true
        answer.downVoters.splice(userDownVoteIndex, 1)
        answer.upVoters.push(req.decoded._id)
      } else if (userUpVoteIndex !== -1 && userDownVoteIndex === -1) { // true && false
        answer.upVoters.splice(userUpVoteIndex, 1)
      }

      answer.save()
      .then(newAnswerData => res.status(200).json({
        message: 'Success vote answer',
        updatedAnswer: newAnswerData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static downVote(req, res) {
    Answer.findById(req.params.id)
    .then(answer => {
      let userUpVoteIndex = answer.upVoters.findIndex(element => element == req.decoded._id)
      let userDownVoteIndex = answer.downVoters.findIndex(element => element == req.decoded._id)

      if (userDownVoteIndex === -1 && userUpVoteIndex === -1) { // false && false
        answer.downVoters.push(req.decoded._id)
      } else if (userDownVoteIndex === -1 && userUpVoteIndex !== -1) { // false && true
        answer.upVoters.splice(userUpVoteIndex, 1)
        answer.downVoters.push(req.decoded._id)
      } else if (userDownVoteIndex !== -1 && userUpVoteIndex === -1) { // true && false
        answer.downVoters.splice(userDownVoteIndex, 1)
      }

      answer.save()
        .then(newAnswerData => res.status(200).json({
          message: 'Success vote answer',
          updatedAnswer: newAnswerData
        }))
        .catch(err => res.status(500).send(err))
      })
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
    Answer.findById(req.params.id)
      .then(answer => {
        if (answer.author == req.decoded._id) {
          Answer.findByIdAndRemove(req.params.id)
          .then(result => res.status(200).json({
            message: 'Success delete answer',
            deletedAnswer: result
          }))
          .catch(err => res.status(500).send(err))
        } else {
          res.status(403).send('Forbidden')
        }
      })
      .catch(err => res.status(500).send(err))
  }
}

module.exports = AnswerController