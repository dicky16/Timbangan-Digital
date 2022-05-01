const express = require('express');
const router = express.Router();
const c = require('./report.controller')

router.get('/',  c.report)
router.get('/today', c.today)
router.get('/date', c.byDate)
router.get('/date/get-date', c.getDate)

module.exports = router