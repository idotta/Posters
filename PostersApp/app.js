var createError = require('http-errors')
var express = require('express')
var helmet = require('helmet')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongoose = require('mongoose')

var config = require('./config')
var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api')
var setupRouter = require('./routes/setup')

var app = express()

// connect to database
mongoose.connect(config.getDbConnectionString())
  .then(con => {
    console.log('mongodb connect success')
  })
  .catch(err => {
    console.log(err)
    throw err
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

app.use('/', indexRouter)
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
