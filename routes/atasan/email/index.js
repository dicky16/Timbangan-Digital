const express = require('express');
const router = express.Router();
const c = require('./email.controller')
const m = require('../../../middleware/cek.login')
const mRole = require('../../../middleware/cek.role')

router.get('/', [m.cekLogin],  c.email)

module.exports = router