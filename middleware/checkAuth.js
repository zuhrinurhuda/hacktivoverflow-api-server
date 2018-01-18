const jwt = require('jsonwebtoken')

class CheckAuth {
  static isLogin(req, res, next) {
    jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(403).send(err)
      } else {
        req.decoded = decoded
        next()
      }
    })
  }

  static isVerifyUser(req, res, next) {
    if (req.decoded._id === req.params.id) {
      next()
    } else {
      res.status(403).send(err)
    }
  }
}

module.exports = CheckAuth