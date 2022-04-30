const express = require('express');
const router = express.Router();
const c = require('./report.controller')
const m = require('../../../middleware/cek.login')
const mRole = require('../../../middleware/cek.role')

router.get('/',  c.report)

module.exports = router