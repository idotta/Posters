var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'PostersApp', user: req.user })
})

/// User auth tests

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect('/auth/login')
  } else {
    // if user is logged in
    next()
  }
}

router.get('/profile', authCheck, function (req, res, next) {
  res.render('profile', { user: req.user })
})

module.exports = router
