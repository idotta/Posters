const mongoUname = process.env.MONGODB_UNAME
const mongoPwd = process.env.MONGODB_PWD
const mongoEndpoint = process.env.MONGODB_URI

const config = {

  getDbConnectionString: function () {
    return 'mongodb://' + mongoUname + ':' + mongoPwd + '@' + mongoEndpoint
  },

  redisStore: {
    url: process.env.REDIS_STORE_URI,
    secret: process.env.REDIS_STORE_SECRET
  },

  keys: require('./keys')
}

module.exports = config
