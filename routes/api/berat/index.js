const express = require('express');
const router = express.Router();
const c = require('./berat.controller')

router.post('/', c.store)

module.exports = router