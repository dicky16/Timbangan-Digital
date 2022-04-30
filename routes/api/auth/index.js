const express = require('express');
const router = express.Router();
const c = require('./auth.controller')

router.post('/', c.login)

module.exports = router