const jwt = require('jsonwebtoken')

const generateJwtToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, function (err, token) {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = generateJwtToken