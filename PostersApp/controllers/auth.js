const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const keys = require('../config/keys')
const User = require('../models/user')

passport.serializeUser((user, done) => {
  if (user) {
    done(null, user.id)
  } else {
    done(new Error('invalid user'), null)
  }
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (user) {
        done(null, user)
      } else {
        done(new Error('invalid id'), null)
      }
    })
    .catch(err => done(err, null))
})

function setup () {
  passport.use(new GoogleStrategy({
    // options for the strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    User.findOne({ googleId: profile.id })
      .then(user => {
        if (user) {
          // already have the user
          console.log('User is: ' + user)
          done(null, user)
        } else {
          // if not, create a new user
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.image.url
          })
            .save().then(newUser => {
              console.log(newUser)
              done(null, newUser)
            })
        }
      })
  }))
}

module.exports = {
  setup
}
