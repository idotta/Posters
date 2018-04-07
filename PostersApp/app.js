const createError = require('http-errors')
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const session = require('cookie-session')
const passport = require('passport')

const config = require('./config')
const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const authRouter = require('./routes/auth') // this also sets up passport auth strategies
const setupRouter = require('./routes/setup')

const app = express()

// connect to database
mongoose.connect(config.getDbConnectionString())
  .then(con => {
    console.log('mongodb connect success')
  })
  .catch(err => {
    console.log('mongodb connect fail')
    console.log(err)
    // throw err
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// set up session handling
app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: config.keys.session.cookieKeys
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// set up routes
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/api', apiRouter)
app.use('/setup', setupRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
