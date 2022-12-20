const express = require('express');
const router = express.Router();
const c = require('./all.controller')

router.get('/jenis', c.findAllJenisRumput)
router.get('/asal', c.findAllAsalRumput)
router.get('/truk', c.findAllTruk)

module.exports = router