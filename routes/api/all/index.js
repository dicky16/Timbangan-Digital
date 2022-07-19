const express = require('express');
const router = express.Router();
const c = require('./all.controller')

router.get('/jenis-rumput', c.findAllJenisRumput)
router.get('/asal-rumput', c.findAllAsalRumput)
router.get('/truk', c.findAllTruk)

module.exports = router