const express = require('express');
const router = express.Router();
const c = require('./home.controller')

router.get('/', c.home)
router.get('/last-seven-days', c.lastSevenDays)

module.exports = router