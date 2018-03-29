const express = require('express')
const bodyParser = require('body-parser')

const setup = require('../controllers/setupController')

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Init for testing
router.post('/dontusemeunlessyouknowwhatyouredoing/init', setup.init)

module.exports = router
