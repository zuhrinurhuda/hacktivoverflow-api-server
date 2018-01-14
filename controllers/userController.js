const User = require('../models/userModel')

class UserController {
  static create(req, res) {
    let newUser = new User({
      name: facebook.name,
      email: facebook.email,
      avatar: facebook.picture.data.url
    })

    newUser.save()
    .then(newUser => res.status(200).json({
      message: 'Success create new user',
      newUser: newUser
    }))
    .catch(err => res.status(500).send(err))
  }

  static findAll(req, res) {
    User.find()
    .then(users => res.status(200).json({
      message: 'Success find all users',
      users: users
    }))
    .catch(err => res.status(500).send(err))
  }

  static findById(req, res) {
    User.findById(req.params.id)
    .then(user => res.status(200).json({
      message: 'Success find user',
      user: user
    }))
    .catch(err => res.status(500).send(err))
  }

  static update(req, res) {
    User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name || user.name
      user.avatar = req.body.avatar || user.avatar
      user.save()
      .then(newUserData => res.status(200).json({
        message: 'Success update data user',
        updatedUser: newUserData
      }))
      .catch(err => res.status(500).send(err))
    })
  }

  static delete(req, res) {
    User.findByIdAndRemove(req.params.id)
    .then(result => res.status(200).json({
      message: 'Success delete user',
      deletedUser: result
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = UserController