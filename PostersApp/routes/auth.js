const router = require('express').Router()
const passport = require('passport')

const auth = require('../controllers/auth')

// run passport setup
auth.setup()

// auth login
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' })
})

router.get('/logout', (req, res, next) => {
  // handle with passport
  req.logOut()
  res.redirect('/')
})

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// callback for google redirect
router.get('/google/redirect',
  passport.authenticate('google'),
  (req, res, next) => {
    res.redirect('/profile')
  })

module.exports = router
