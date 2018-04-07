const express = require('express')

const setup = require('../controllers/setup')

const router = express.Router()

// Init for testing
router.post('/dontusemeunlessyouknowwhatyouredoing/init', setup.init)

module.exports = router
