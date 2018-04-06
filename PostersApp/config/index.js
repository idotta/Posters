const configValues = require('./config')

// configValues.endpoint_...
const mongoEndpoint = process.env.MONGODB_URI

const config = {

  getDbConnectionString: function () {
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@' + mongoEndpoint
  },

  redisStore: {
    url: process.env.REDIS_STORE_URI,
    secret: process.env.REDIS_STORE_SECRET
  }
}

module.exports = config
