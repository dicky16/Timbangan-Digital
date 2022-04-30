const express = require('express');
const router = express.Router();
const c = require('./driver.controller')

router.post('/', c.store)

module.exports = router