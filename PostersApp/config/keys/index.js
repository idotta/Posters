const googleKeys = require('./google-keys').web
const sessionKeys = require('./session-keys.json')

module.exports = {
  google: {
    clientID: googleKeys.client_id,
    clientSecret: googleKeys.client_secret
  },

  session: {
    cookieKeys: sessionKeys.cookieKeys
  }
}
