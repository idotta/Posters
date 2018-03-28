const configValues = require('./config')

module.exports = {
  getDbConnectionString: function () {
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + configValues.endpoint
  }
}
