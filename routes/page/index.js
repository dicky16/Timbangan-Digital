const router = require('express').Router()
const c = require('./page.controller')

router.get('/', c.landing)

module.exports = router