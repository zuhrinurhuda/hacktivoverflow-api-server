require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://zuhri:${process.env.MONGO_ATLAS_PASSWORD}@cluster0-shard-00-00-67zih.mongodb.net:27017,cluster0-shard-00-01-67zih.mongodb.net:27017,cluster0-shard-00-02-67zih.mongodb.net:27017/hacktiv?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`, { useMongoClient: true }).catch(err => console.log(err))

const index = require('./routes/index')
const users = require('./routes/users')
const questions = require('./routes/questions')
const answers = require('./routes/answers')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/', index)
app.use('/api/users', users)
app.use('/api/questions', questions)
app.use('/api/answers', answers)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
